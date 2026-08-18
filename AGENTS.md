# sissify-me — framework repo

This repo is a **train-me framework**: it supplies the app's agent prompts and sandbox content. The full spec — app model, framework layout, feature-file grammar (routines, habits, tasks, store), onboarding schema, TTS scripts — lives in the `framework-dev` skill (`.agents/skills/framework-dev/SKILL.md`). This file covers what's specific to *this* repo.

## Layout

```
manifest.json       id, name, description, version + update-merge globs
config.json         one "role" option group → part folders
base/               always installed (prompts + agent_files)
role_trainer/       part: selected via config choice "trainer" (default)
role_assistant/     part: choice "assistant"
role_roleplay/      part: choice "roleplay"
```

`<part>/prompts/` → the app's prompt store; `<part>/agent_files/` → the agent's sandbox root (`agent_data/`). `base/` first, then the selected role part; the part wins on overlap (it overrides `prompts/role.md`).

## Things that are easy to break

- **`prompts/hypno_planner.md` is hard-coded by the app** as the conditioning subagent's system prompt. Never rename it.
- **Prompt directives**: `{{embed './x.md'}}` resolves in the *prompt store* (use for sibling prompts, e.g. `role.md`); `{{include './x.md'}}` resolves in the *sandbox* (`agent_data/`, use for fixed files like `USER.md`). `{{special}}` (scans `special/*.md` front-matter), `{{features}}`, and `{{ttsTags}}` are app-provided — don't shadow them.
- **Fixed files** (`USER.md`, `PLAN.md`, `PROGRESS.md`, `PERSONALITY.md`, `CONDITIONING.md`) are `preserve`d — user/agent edits survive updates. Ship only placeholders for them; real content is written in-app.
- **Audio scripts** live under `hypnos/` (e.g. `hypnos/hypno/compositions/*.xml`). A script only reaches the user when referenced from a feature file (audio block, `[x](hypnos/….xml)` link, or `script` action).
- Retiring an installed file: delete it here **and** list its path under `owned_files` (or `remove`) in the manifest, or it lingers in user sandboxes forever.

## Tooling

The framework CLI is the `train-me-framework` dev dependency (from the `framework-cli` branch of the train-me repo; it mirrors the app's Rust validators). Run from the repo root:

```
bunx tm-framework lint      # validate manifest/config/onboarding, prompts, includes/embeds/links
bunx tm-framework package   # build dist/sissify-me.zip + dist/index.json (update channel)
```

(`bun run lint` / `bun run package` wrap the same commands.)

Always lint after editing. CI (`.github/workflows/package.yml`) lints on every push and repackages the rolling `stable` release from `dist/`.

Note: the linter resolves `{{embed}}` against the same part's `prompts/` folder, so a base prompt may only embed prompts that also exist in `base/` — that's why `base/prompts/role.md` ships as a default that the selected role part overrides.

## Conventions

- Version bumps: bump `version` in `manifest.json` for every shipped change (the app's update badge compares versions).
- `min_app_version` gates install; this framework needs `0.12.0`+ (onboarding flow).
- Keep prompts under the ~24k-token lint warning; prefer many small routines/habits over few large ones.
- Content is 18+; keep the safety model in `base/agent_files/SafetyInstructions.md` intact when editing prompts.
