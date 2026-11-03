---
name: framework-dev
description: Everything needed to develop train-me frameworks — how the app works, the framework layout (manifest, config, parts, onboarding), the feature-file grammar (routines, tasks incl. goal templates, programs, screens, store, TTS scripts) and the `tm:` module API bodies program against, and the lint/package tooling incl. CI. Use whenever the user asks to create, edit, validate, or release a framework for train-me, or questions come up about how the app consumes framework content.
---

# train-me Framework Development

A **framework** is a ZIP that supplies everything user-facing in train-me: the agent's prompts and its sandbox content. The app ships none of that — this project is what makes it work. This skill covers the app model, the framework layout, the feature-file grammar, and the lint/package/release tooling.

## How the app works (what your framework feeds into)

- train-me is a Tauri app (mobile-first) with a built-in LLM agent. The agent runs from **prompts** your framework installs; it has full bash/read/write access to a **sandbox** (`agent_data/`) your framework populates.
- Everything interactive is expressed as **feature files** the agent authors and the **engine** runs: routines (scheduled or on-demand sessions), task templates (assignable sessions, or **goal templates** — a `goal:` block makes one a daily goal; the old `habits/` type no longer exists), **programs** (`js/` — general-purpose background scripts, agent-only), **screens** (`screens/` — stay-mounted UI surfaces), and store entries (point-priced rewards). A routine/task run is a **session**; every body is an **ES module** (`.js`, or `.ts` typechecked and type-stripped by the app) executed on its own thread inside the app's Rust script runtime (boa — no iframe, no webview involvement in execution), talking to the app through the sandboxed **`tm:` module imports** (widgets on a flow stage, prerendered audio, file/SQLite access, engine reads, agent ops).
- The engine owns correctness: an append-only **points ledger**, scheduled **occurrences** reconciled lazily (missed windows fire failure actions; goal days resolve `exempt` under an active exemption), **exemptions** that suspend failures and protect streaks, and **idempotent actions** (`points`, `task`, `script`, `notification`, `exemption`, `roulette`, `agent`, `js`).
- **Onboarding flow**: your framework may ship `onboarding.json`; the user answers it right after install (deterministic, conditional questions). Answers land in `agent_data/USER.md` — or the sandbox-relative `output` path your flow declares — plain data the framework consumes via `{{include}}` in its own prompts. Nothing is auto-added to any system prompt.
- **Audio**: TTS XML scripts (spoken word, `<clip>` sound effects, tones, loops, layered mixes) render to audio and play in a full player. Scripts are pure audio — there are no interactive tags; `<zone>`/`<mark>` markers are the named timeline seams bodies sync to through the `AudioHandle`. Every script in the sandbox pre-renders in the background after startup (toggleable in Settings; referenced scripts render first); `<include>` targets render as linked sub-manifests — a shared subscript is synthesized once — and a glob include (`dir/*.xml`) picks a random match per playback. Playback without a mounted audio surface (headless runs, attached-but-unviewed runs) plays **prerendered manifests only** on a silent nominal clock; a stale manifest fails with a clear error. Playbacks log under feature `script`.
- The agent inspects state through bash builtins — `points`, `chastity`, `inventory`, `redgifs`, `sqlite` (read-only queries of the `activity.db` event stream), and `js` (run a `js/` program headless and wait for it; programs are invisible to the user).

## Framework layout

```
my-framework/
├─ manifest.json      ← required: id, name, description, version
│                       (+ min_app_version, owned_files, preserve, remove globs)
├─ config.json        ← optional: install-time option groups → part folders
├─ onboarding.json    ← optional: deterministic first-run questions
├─ base/              ← always installed
│   ├─ prompts/       ← → the app's prompt store (main_agent.md is the entry point)
│   └─ agent_files/   ← → the agent's sandbox root (docs/, routines/, tasks/,
│                         js/, screens/, store/, hypnos/ … plus USER.md)
└─ my_part/           ← optional parts, selected via config.json choices
    ├─ prompts/
    └─ agent_files/
```

Rules: `base/` first, then each selected part; later parts win on overlap. On a same-id update, `owned_files` globs prune files the new version dropped (unless `preserve`d); `remove` globs always apply. `{{include './FILE.md'}}` in a prompt inlines sandbox files; `{{embed ...}}` inlines sibling prompts; `{{docs}}` renders the reference-docs surface.

**Docs**: every markdown file under the sandbox's `docs/` is surfaced to the agent by `{{docs}}` — a tree-structured index (path + `description` frontmatter) with bodies read on demand via `read_file`. Required frontmatter: `description` (one line, shown in the index). Optional: `inline: true` inlines the body into the system prompt (for short always-needed maps; keep under ~500 words — the linter warns above that). `docs/internal/` is app-owned — seeded at startup with the feature grammar, the typed `tm:` API contract (`tm.d.ts`), the runtime/data/TTS/voice/chastity references — frameworks must not ship there (lint error). The app also seeds `examples/` with worked feature files (routine, on-demand routine, task, goal tasks, program, screen, store, TTS scripts).

## The feature-file grammar (FORMAT.md, abridged)

Full spec: FORMAT.md in the train-me repo. Worked examples: `examples/` seeded in every sandbox. There are no version labels — compatibility is mechanical via the manifest's `min_app_version`.

**Shape**: every feature file is a script — the first line is exactly `/*---`, the block ends with the first line that is exactly `---*/`, the interior is `key: value` front-matter (scalars, inline JSON, dotted keys into nested maps, `#` comments), and everything after it is the raw body (executed verbatim as an ES module). The extension (`.js` or `.ts`) marks the file type — there is no `format:` key (a leftover one warns). Nested subdirectories are fine.

| Container | Front-matter keys | Notes |
| --- | --- | --- |
| `routines/*.js\|.ts` | `title` (req), `schedule` (cron; absent = on-demand), `timeframe`, `success`/`failure`, `cooldown` + `limit` (on-demand) | Scheduled: must start in its window and resolve within `timeframe`. On-demand: every limit-less one is `limit: {daily: 1}` (warned when it awards positive points); `cooldown` = min time between starts |
| `tasks/*.js\|.ts` | `title` (req), `description`, `timeframe`, ordered `timeouts: [{after, action}]` (ascending; warns), `max_timeout`, `goal`, `success`/`failure` | A `goal:` block (below) makes it a goal template |
| `js/*.js\|.ts` — programs | `title` only — a scheduling key is an **error** | No scheduling, no actions. Started fire-and-forget by the `js` action or the agent's `js` bash builtin; settles log-only (feature `program`); **agent-only** — the user never sees programs |
| `screens/*.js\|.ts` | `title` and NOTHING else (any other key is an error) | Stay-mounted UI: body shows blocks and loops on widget events, never resolves, torn down on navigation; records nothing engine-side |
| `store/*.json` | `title`, `price` (req, ≥0), `stock` + `restock` cron, `action` | Users buy with points; stock restocks lazily |

**Goal templates** (the habits replacement): `goal: { every: day, type: min|max, count|minutes }` (`count`/`minutes` mutually exclusive). Goal + no body → the zero-friction do-surface (Today renders a log button / minutes prompt; no session). Goal + body → completing the session marks progress (+1 count; +elapsed minutes). `min` fires success the moment the target is reached; an unreached day resolves failure at day-end reconcile. `max` fails immediately on any log past the target (a prohibition is `type: max, count: 0`); staying under until day-end fires success. An active exemption resolves the day `exempt` (streak-neutral). A `task` action may **not** reference a goal template — a file wears one hat (validator error). History reaches bodies via `tm:data.goalProgress(template)`.

**Bodies** — plain ES modules, strict mode (implicit globals throw), top-level `await` and `import`/`export` real, errors reported with file-absolute lines. Everything is an **import** from the six `tm:` modules; any other specifier resolves as a sandbox file (relative against the importer, bare against the sandbox root; extension optional; every import re-evaluates per run). Outcome contract: the body resolving → `success` actions; a throw or `fail(reason)` → `failure` actions (first `fail` wins, even if caught); give-up tears the run down and fails honestly; a torn-down run resumes from the top of the body. Headless runs degrade deterministically (stub widget handles, silent nominal-clock audio) — branch on `tm:ui.attached`. A `.ts` body is TypeScript: **typechecked (strict) by the app** against `docs/internal/tm.d.ts` and sibling sandbox files, then annotations are stripped — erasable syntax only (no enums/namespaces/parameter properties; types are deleted, never lowered; no DOM types).

**The `tm:` modules** (the typed contract is `docs/internal/tm.d.ts`, seeded into every sandbox):

| Module | Exports |
| --- | --- |
| `tm:ui` | `wait(seconds)`, `show(id, props)`, `hide(target)`, `notify(text)`, `fail(reason)`, `log(feature, action, details?)`, `attached` |
| `tm:audio` | `prepare(src)`, `play(src)` → `AudioHandle` |
| `tm:fs` | `readText`, `writeText`, `appendText`, `readBytes`, `writeBytes`, `list`, `mkdir`, `remove`, `move`, `copy`, `exists` — mutations refuse app-managed paths (`activity.db`, `docs/internal/**`) |
| `tm:db` | `open(path, { readonly? })` → `Database` (`query`/`exec`/`close`) — pins `journal_mode = DELETE`, connections die with the run; `activity.db` opens readonly-only |
| `tm:data` | `vars`, `runId`, `points(days?)`, `occurrences(container, {limit?})`, `goalProgress(template, {days?})`, `chastity()`, `today()` — the only channel engine state crosses to a body; engine DB schemas stay private |
| `tm:agent` | `wake(message)` (the `agent` action's FIFO), `decide(req)` — `classify`/`route`/`yesno`/`probability` over the configured model, degrading to a deterministic local fallback marked `source: "local", confidence: 0` |

`vars` is a frozen run-start snapshot: `weekday`, `is_weekend`, `hour`, `date`, `month`, `points`, `locked`, plus the target's history stats (`streak`, `best_streak`, `done`, `fails`, `days_since_last`). Write session state in ordinary JS variables, never in files. One SQLite engine per file: the bash `sqlite` builtin snapshots whole files and will eat a concurrent engine's transactions — never query a file with it while a `tm:db` connection is open (rules: `docs/internal/data.md`).

**The stage and widgets** — `show` mounts on a **vertical flow of full-width, self-sizing blocks** in creation order; there are no `area`/`z` placement props (overlay composition is the `stack` widget). It resolves to a handle `w`: `w.id`, `await w.done` (per-type result; `null` once removed — gone is an answer, not a hang), `w.state`, `w.set(patch)`, `w.on(event, fn)` / `await w.once(event)`, `w.remove()`, `w.save(name)` (voice: writes `recordings/<name>.wav`, resolves with the path). Catalog (`type`; full props in `tm.d.ts`): `text` (markdown), `checklist`, `buttons`, `slider`, `input`, `tierlist` (drag-to-rank → `{tier: [items]}`), `timer` (`down`/`up`), `media` (slideshow: `file`/`url` or the live-source form, explicit `h`; full-bleed via a `stack` with a `fill` media child), `beatmeter` (`bpm`, `pattern`, `sync` AudioHandle), `voice` (mic exercise — six trackers, `requiredScore`/`holdRatio`/`duration`, result `{score, passed, metrics, lines}`), `lock` (chastity gate; locking is user-only, the code never crosses to the script), `stack` (`children: [{place, widget}]`, `minH`, `gap` — children are visual-only, no script addresses), `progress` (`w.set({value})` re-renders), `stat` (rows), `chart` (`sparkline`/`bars`, `w.set({data})`).

**Audio handles** — `play(src)` returns `s`: `pause`/`resume`/`stop`, `setVolume` (0..1), `setSpeed` (0.5..1.5), `position`/`duration`/`playing` (nominal seconds), `await s.end`, `await s.mark(name)` / `await s.zone(name)` (resolve at the TTS `<mark>`/`<zone>` seam, immediately if crossed, `null` if playback ends first), `s.timeUntil(name)`, `s.seek(name)`, `s.loopZone(name, n?)` (restart at a zone, play it `n` times, continue). Unknown names reject; handles are independent (concurrent playback is fine).

**Actions** (in `success`/`failure`/`timeouts`/store): `points {delta}`, `task {template}` (never a goal template), `script {src}`, `notification {text}`, `exemption {duration, scope: routines|tasks|all}` (`habits` is gone — goal templates are tasks), `roulette {outcomes: [{weight, action}]}` (weight 0 disables; ≥2 outcomes; nests ≤3 deep), `agent {message}` — wakes the agent with `message` as its instruction (fires at the resolving reconcile, exactly once per occurrence; FIFO + single-flight — the only way an engine failure reaches the agent), `js {src: js/<name>.js|.ts}` — start a program fire-and-forget.

**TTS XML scripts** — the full tag reference (all tags, attributes, tone/effect values, the `@` expression language, and a worked example) lives in [tts-tags.md](tts-tags.md) next to this file. Read it when authoring or editing `.xml` audio scripts — the grammar is audio-only (`voice`, `pause`, `clip`, `tone`, `effect`, `overlay`/`loop`/`background`, `random`/`scramble`, `include`, `zone`/`mark`).

**onboarding.json** — a bare item array, or `{output, items}` (`output` = sandbox-relative answer-file path, default `USER.md`). Items: `{kind: "text", text, showIf?}`, `{kind: "question", id, answer: open|choice|rating|ranking|tierlist, prompt, choices?, tiers?, multiple?, min?/max?, hint?, optional?, showIf?}`, and `{kind: "include", src, showIf?}` — includes splice a subfile's item array (framework-root-relative `src`, must not escape; cycles rejected; the include's `showIf` is ANDed onto each spliced item). `showIf` conditions reference answers of questions *above* (`{id, equals/notEquals/includes/min/max/answered}` — for tierlist answers, scope placements with `tier` (exact) or `tierAtLeast` (that tier or any above; `includes` tests an item's placement, `answered`/`min`/`max` its scoped item count)) and installed parts (`{part, installed?}` — part names validated against config.json choices), plus `all`/`any`/`not`. Tierlist questions define `tiers` (≥2 unique labels, top→bottom) and rate their `choices` (≥2 unique items) — the UI is the classic tierlist (tiers left, unsorted pool at the bottom, drag or tap to place, left→right order within a tier is the ranking); the answer stores `{tier: [items]}` and renders `(tierlist) S: a, b | B: c`. The questionnaire runs once, as the final wizard step after install (never re-asked later); `optional: true` questions may be skipped (skips render nothing). The generated answer file is one bold-prompt line per answered question; multi-select choice answers are flagged. The app offers the answers store (`onboarding_answers.json`) as an export at the end of the flow and accepts it back via an import at the start — an import replaces the answers and re-renders the file, so a partial import leaves the remaining questions to answer. Non-`open` questions offer an optional free-text clarification, stored under the reserved `note:<id>` answer key and appended to the answer's line (`— note: "…"`, dropped when the question is skipped/hidden) — question ids must not start with `note:`.

Always run the linter after editing. It catches malformed/unclosed front-matter blocks, JS syntax errors (`.js` bodies are parsed module-goal — compiled, never executed; the app's boa parser is authoritative and reports exact file lines), invalid durations/cron/actions, dangling `.xml` references (both `script` actions and quoted `.xml` strings in bodies), removed/unknown TTS tags, missing `<clip>` sources, broken `<include>` trees, missing task/program references (`task` actions may not point at goal templates; `js` actions must name an existing `js/` file), and showIf forward references. Two gaps to know: the app's own validator does **not** check quoted-`.xml` strings in bodies (an unknown import or missing script fails at run time instead) and cannot run in CI — the CLI's checks are the stricter net. `.ts` bodies are only grammar-parsed here; the typecheck lives in the app.

## Tooling: the framework CLI

The CLI lives in the train-me repo at `tools/framework-cli/` (Bun + TypeScript; mirrors the app's Rust validators). It is published as the **`framework-cli` branch** of the repo — a root-level copy of the folder, kept in sync by CI — because no package manager supports subpath git dependencies. Install the branch as a dev dependency with whichever package manager the project uses (the CLI itself runs on [Bun](https://bun.sh)):

```
npm i -D github:sylm54/train-me#framework-cli      # or pnpm/bun add -d
```

(Offline fallback: copy the `tools/framework-cli/` folder into the project and run `bun tools/framework-cli/src/cli.ts …`.)

Commands (run from the framework root, or pass a directory):

```
bunx tm-framework lint        # validate everything; exit 1 on errors
bunx tm-framework package     # build dist/<id>.zip + dist/index.json (version/url/sha256)
```

`lint` checks: manifest + config + onboarding schemas, every feature file under `routines/`, `tasks/`, `js/` (programs), `screens/`, and `store/` in base + parts (recursive; comment front-matter, keys per container — including the `goal:` grammar and the programs/screens `title`-only contracts — actions, and `.js` body syntax via Bun's transpiler; `.ts` files get grammar only, the app typechecks them), every `.xml` script (audio-only tag syntax + semantics, ported from the app's Rust parser; removed tags — `until`, `choice`, `rating`, `react`, `<if>`/`else`, `intro`/`main`/`outro`, `sound`, `beatmeter`, `visual`, `caption` — are errors), referenced scripts exist with resolvable, acyclic `<include>` trees (globs expand to their match list; quoted `.xml` strings in JS bodies are discovered with the same regex the app's prerenderer uses), `<clip>` sources exist, `task` templates exist and are **not goal templates**, `js` action programs exist, prompt directive resolution (mirroring the app: `{{embed}}`/`{{{embed}}}` resolve against the prompt store, `{{include './x.md'}}` against `agent_files/` — `USER.md` is app-generated by onboarding, so it may be absent), in-app links, and a token-size estimate per prompt. A `js/` file without front-matter is not flagged — it may be a helper module imported by bodies (the module loader needs no front-matter). `package` excludes repo tooling (`.git`, `.github`, `.dev`, `.agents`, `tools/`, lockfiles, root `package.json`, `README.md`, `AGENTS.md`, `skills-lock.json`, `dist/`) from the ZIP.

`package` zips everything except `dist/ .git/ .dev/ .github/ node_modules/ README.md AGENTS.md` into `dist/<id>.zip` and writes `dist/index.json` for the app's update channel. Ship both files together (the `url` is relative to the index).

## CI / releasing

`.github/workflows/package.yml` template — lints on every push, packages to a rolling `stable` release the app's update channel points at:

```yaml
name: Package

on:
  push:
    branches: [main, master]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with: { bun-version: latest }
      - run: npm ci || npm i
      - run: bunx tm-framework lint

  package:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with: { bun-version: latest }
      - run: npm ci || npm i
      - run: bunx tm-framework package
      - name: Rolling stable release
        env:
          GH_TOKEN: ${{ github.token }}
        run: |
          gh release delete stable --yes --cleanup-tag 2>/dev/null || true
          gh release create stable \
            --title "Stable Release" \
            --notes "Latest packaged release" \
            dist/*.zip \
            dist/index.json
```

For versioned releases instead of a rolling `stable`, tag first (`v*`) and create the release from the tag; point the app's gallery entry at that release's `index.json` asset URL.

## Practical notes

- The agent inside the app validates with the `validate_files` tool — the CLI mirrors those checks so CI catches the same issues. When the grammar evolves, update the CLI in the train-me repo (single source of truth is its Rust parser).
- Prefer many small routines/goal templates over few large ones; keep bodies short and restartable — an interrupted session resumes from the top of the body. Programs run detached (their widgets render only if a run view opens); screens stay mounted until navigation.
- Seed points/stakes through store entries and action deltas; the ledger is append-only and every entry is visible to the user.
- Never store stats in feature files (streaks, counts, last-done) — the engine derives them from the activity log; read them via `tm:data` (`vars`, `occurrences`, `goalProgress`).
- Never touch a DB file with two engines: `tm:db` for bodies' own SQLite, the bash `sqlite` builtin read-only for `activity.db`, raw `writeBytes` never into a live DB.
