---
description: Read before building or restructuring any session — modular architecture, wiring into feature files, and validation.
---

# Authoring Audio Sessions

Read this before building or substantially editing any session, together with the type guideline (`docs/conditioning/hypno.md` or `docs/conditioning/active.md`). The TTS syntax reference is `docs/internal/tts-tags.md`.

## Modular Architecture
Never write a session as one big monolithic script. Architect every session as a small set of small, focused, reusable subscripts that are composed together. This makes content shareable across sessions and easy to update in one place.

### Decompose by role
Split a session into separate subscripts, each owning one responsibility:
- **Structural parts** that recur across sessions — induction, deepening, redeepening, emergence, pre-talk, post-talk — should live in their own reusable files so every session can link to the same ones.
- **Content parts** that change per session — the triggers/suggestions, the theme, the tasks — should live in their own files so they can be swapped, extended, or retired without touching the shared structure.
- The **final session script** should be a thin composition file that only links to the parts it needs, plus any session-specific glue. It should not duplicate content that already lives in a subscript.

### Reuse before you rewrite
Before writing new content, check whether a suitable subscript already exists (shared induction, deepening, a trigger block, a task pool). Reuse it rather than duplicating it, but don't be afraid to modify existing parts to better fit your needs. When you improve a shared subscript, every session that links to it benefits — that is the whole point of the modular approach.

### Keep parts small and focused
- One clear job per file a single induction, one trigger block, one task pool.
- Name files by their role (`induction_*.xml`, `deepening_*.xml`, `trigger_*.xml`, `cue_*.xml`, `suggestion_*.xml`, `task_*.xml`) so the architecture is obvious from the file listing, and place them under the appropriate folder within `hypnos/<type>/`.
- Update a part in place when its content changes; never fork a copy for a single session.

## Making a session playable
An XML script alone does nothing for the user — it must be referenced so the app surfaces it. Every script in the sandbox pre-renders in the background after startup, and referenced scripts render first. After writing a session, wire it in through one of:
- A `script` action (e.g. a routine's `success` action, a task timeout escalation, or a store entry the user buys with points), which queues the script for the user to play.
- `audio.prepare(src)` / `audio.play(src)` inside a routine or task body, so it plays as a stage of the session — the body can sync to the audio through the script's `<zone>`/`<mark>` markers (`await handle.zone('warmup')`). See `docs/internal/runtime-api.md` for the full API.

You own the feature files as much as the scripts: when a commissioned session is part of a plan, wire it into (or create) the routine/task it belongs in rather than leaving the file unreferenced.

## Validate before you finish
Scripts are written in XML and can import other scripts via `<include>` (see `docs/internal/tts-tags.md` for the syntax). After writing scripts or sessions, validate them with the `validate_files` tool (optionally scoped to a path, e.g. `validate_files({ path: "hypnos" })` or `validate_files({ path: "hypnos/hypno/compositions/reinforce_sissy_identity.xml" })`): it parses and semantically checks the markup and chases includes, reporting dangling/circular includes, unknown/removed tags, and missing `<clip>` sources as errors. Fix every reported `error` before considering the script done; `warning`s are not fatal but usually indicate something unintended.
