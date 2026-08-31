---
description: Audio authoring rules — modular architecture, reusing subscripts, wiring sessions into feature files, and validating before you finish.
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
Before writing new content, check whether a suitable subscript already exists (shared induction, deepening, a trigger block, a task pool — see the shipped libraries in `hypnos/hypno/`). Reuse it rather than duplicating it. When you improve a shared subscript, every session that links to it benefits — that is the whole point of the modular approach.

### Keep parts small and focused
- One clear job per file — a single induction, one trigger block, one task pool.
- Keep each subscript short enough to read and reason about at a glance.
- Name files by their role (`induction_*.xml`, `deepening_*.xml`, `trigger_*.xml`, `suggestion_*.xml`, `task_*.xml`) so the architecture is obvious from the file listing, and place them under the appropriate folder within `hypnos/<type>/`.
- Update a part in place when its content changes; never fork a copy for a single session.

## Making a session playable
An XML script alone does nothing for the user — it must be referenced so the app pre-renders it and surfaces it. After writing a session, wire it in through one of:

- An `audio` feature block in a routine or task (`src` pointing at the `.xml` file), so it plays as a gated step of a session.
- A markdown audio link on a routine/task page pointing at the script (e.g. at `hypnos/hypno/compositions/<session>.xml`).
- A `script` action (e.g. a routine's `success` action, a timeout escalation, or a store entry the user buys with points), which queues the script for the user to play.

You own the feature files as much as the scripts: when a commissioned session is part of a plan, wire it into (or create) the routine/task it belongs in rather than leaving the file unreferenced.

## Validate before you finish
Scripts are written in XML and can import other scripts via `<include>` (see `docs/internal/tts-tags.md` for the syntax). After writing scripts or sessions, validate them with the `validate_files` tool (optionally scoped to a path, e.g. `validate_files({ path: "hypnos" })` or `validate_files({ path: "hypnos/hypno/compositions/reinforce_sissy_identity.xml" })`): it parses and semantically checks the markup and chases includes, reporting dangling/circular includes as errors. Fix every reported `error` before considering the script done; `warning`s are not fatal but usually indicate something unintended.

Unreferenced scripts under `hypnos/` are inert (and flagged as warnings by `validate_files`), so always wire a finished session into a feature file.
