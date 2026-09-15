# sissify-me — framework repo

This repo is a **train-me framework**: it supplies the app's agent prompts and sandbox content. The full spec — app model, framework layout, feature-file grammar (routines, habits, tasks, store), onboarding schema, TTS scripts — lives in the `framework-dev` skill (`.agents/skills/framework-dev/SKILL.md`). This file covers what's specific to *this* repo.

## Layout

```
manifest.json       id, name, description, version + update-merge globs
config.json         two "single" option groups → part folders: "role" + "personality"
base/               always installed (prompts + agent_files)
role_trainer/       part: role choice "trainer" (default) — authority: decides for the user
role_schemer/       part: role choice "schemer" — starts as coach, schemes its way toward trainer
role_coach/         part: role choice "coach" — authority: proposes only, user decides
role_guide/         part: role choice "guide" — authority: owns the mental (conditioning) side
personality_adaptive/  part: personality choice "adaptive" (default) — no fixed persona
personality_degrader/  part: personality choice "degrader" — five dominance personas, same shape:
personality_caregiver/  part:   prompts/personality.md (persona) + agent_files/PERSONALITY.md
personality_trainer/    part:   (voice seed) + agent_files/intensity.md (3-stage ladder)
personality_buddy/      part:
personality_superior/   part:
```

`<part>/prompts/` → the app's prompt store; `<part>/agent_files/` → the agent's sandbox root (`agent_data/`). `base/` first, then the selected role part, then the selected personality part; later parts win on overlap. The role part overrides `prompts/role.md` (authority); the personality part overrides `prompts/personality.md` (persona style) and its `PERSONALITY.md` seed — role sets how much power the agent holds, personality sets how it shows.

**Personality vs role**: never mix them. Persona files describe voice, tone, and focus — never who decides. Intensity lives per persona in `<personality part>/agent_files/intensity.md`: three stages (no real power yet / emerging influence / full submission) gated by the authority the role actually holds (schemer: the PERSONALITY.md ledger); the current stage is tracked in `PERSONALITY.md`. Persona onboarding questions live in `onboarding/personality_*.json`, wired via `showIf: {part: ...}`.

## Things that are easy to break

- **Single agent**: the app has one agent (`prompts/main_agent.md` is its system prompt). It can spawn a fresh copy of itself via the `spawn_agent` tool for big self-contained authoring jobs — there is no separate planner/conditioning agent.
- **Prompt directives**: `{{embed './x.md'}}` resolves in the *prompt store* (use for sibling prompts, e.g. `role.md`); `{{include './x.md'}}` resolves in the *sandbox* (`agent_data/`, use for fixed files like `USER.md`); `{{docs}}` renders the docs index (every `docs/**/*.md` listed by its `description` frontmatter; `inline: true` inlines a body). `{{docs}}` is app-provided — don't shadow it.
- **Docs**: every markdown file under `base/agent_files/docs/` needs `description` frontmatter (lint error otherwise; the linter also warns when an `inline: true` body exceeds ~500 words). `docs/internal/` is app-owned and seeded at startup — never ship files there.
- **Fixed files** (`USER.md`, `PLAN.md`, `PROGRESS.md`, `PERSONALITY.md`, `CONDITIONING.md`) are `preserve`d — user/agent edits survive updates. Ship only placeholders for them; real content is written in-app. `USER.md` is (re)written by app onboarding from `onboarding.json`.
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

Note: the linter resolves `{{embed}}` against the same part's `prompts/` folder, so a base prompt may only embed prompts that also exist in `base/` — that's why `base/prompts/role.md` and `base/prompts/personality.md` ship as defaults that the selected role/personality part overrides.

## Conventions

- Version bumps: bump `version` in `manifest.json` for every shipped change (the app's update badge compares versions).
- `min_app_version` gates install; this framework needs an app with the `{{docs}}` directive and `spawn_agent` (raise `min_app_version` when the reworked app ships).
- Keep prompts under the ~24k-token lint warning; prefer many small routines/habits over few large ones.
- Content is 18+; keep the safety model in `base/agent_files/SafetyInstructions.md` intact when editing prompts.
