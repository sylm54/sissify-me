---
description: Read before building or commissioning any conditioning audio — hypno vs active and when to use each, plus the modular architecture, wiring, and validation rules that apply to both. Then read hypno.md or active.md for the type you are writing.
---

# Conditioning Overview

This file is the entry point for conditioning audio: it decides **hypno or active**, and carries the architecture, wiring, and validation rules that apply to both. The craft guidelines for each type live in the sibling files — read `docs/conditioning/hypno.md` when writing a hypno session, `docs/conditioning/active.md` when writing an active one. Nothing ships prebuilt: you author every script and every feature file yourself, so what you build *is* the library.

The two types form a complementary cycle, not a hierarchy:

| Type | Core tool | What it does | When to use it |
| --- | --- | --- | --- |
| **Hypno** | Trance + suggestion | *Installs* identity, triggers, and compulsions by putting the user into a suggestible state | Establish or deepen conditioning; install/refresh triggers; brainwashing |
| **Active** | Interaction + tasks | *Exercises* the conditioning by making the user perform tasks and make choices in real time | Drill obedience, train behavior, practice triggers, gather data on limits |

## When to use each type
- Choose **hypno** when the goal is to change *what the user believes and feels* — installing a new identity, embedding triggers, eroding resistance. Hypno is the highest-leverage tool but also the heaviest, so reserve it for deep conditioning work rather than routine reinforcement: install or reinforce triggers (pair with `docs/training/triggers.md`), deepen identity or brainwashing (pair with `docs/training/corruption.md`), or implement post-hypnotic suggestions that carry into daily life.
- Choose **active** when the goal is to make the user *do something* — practice a behavior, perform tasks, follow instructions with real choices and check-ins. Active sessions convert installed conditioning into lived habit and teach you the user's limits through ratings and choices.
- For sustained transformation, vary the mix: hypno installs and refreshes; active drills and measures. Repeating one type stalls.

## Building a session
Sessions are substantial, self-contained authoring work. For anything beyond a quick one-off sting, spawn a fresh copy of yourself (`spawn_agent`) with a brief that names **what kind of session** you want, **what theme/goal** to cover, and **which training docs / triggers / data** to draw on (e.g. `docs/training/corruption.md`, `docs/training/chastity.md`).

Because the copy cannot see your conversation, make the brief self-contained: the conditioning type, the target theme, the specific triggers or training docs to use, the preferred difficulty/intensity. The copy reads the guidelines itself — this file plus `hypno.md` or `active.md`; name them in the brief so it doesn't have to guess. Small edits to an existing session (a line tweak, a swapped block) are faster done directly.

## Keep hypno general and timeless
For **hypno** sessions, keep the content general and timeless. Do not anchor it to specific times of day, dates, or other narrow, situational facts (e.g. "when you wake up", "every evening at 8pm", "tonight", "this week"). Those details drift and become stale as the same session is reused across many days, so they will eventually contradict the user's actual routine and weaken the conditioning.

Instead, phrase suggestions around durable, context-free cues that hold up on any day and at any hour — for example "whenever you're alone", "when you're relaxed", "when you hear the trigger", or "whenever you're in a quiet moment". Keep the framing about the user's identity, triggers, and compulsions rather than a fixed schedule.

## Build modular, not monolithic
Never write a session as one big monolithic script. Architect every session as a small set of small, focused, reusable subscripts composed together.

- **Decompose by role.** Structural parts that recur across sessions — induction, deepening, redeepening, emergence, pre-talk, post-talk — live in their own reusable files so every session can link to the same ones. Content parts that change per session — the triggers/suggestions, the theme, the tasks — live in their own files so they can be swapped, extended, or retired without touching the shared structure.
- **The composition is thin.** The final session script only links to the parts it needs, plus session-specific glue. It never duplicates content that already lives in a subscript.
- **Reuse before you rewrite.** Check whether a suitable subscript already exists (shared induction, deepening, a trigger block, a task pool) before writing new content. Modify existing parts to better fit rather than forking a copy for a single session — when you improve a shared subscript, every session that links to it benefits. Update a part in place when its content changes.
- **One clear job per file** — a single induction, one trigger block, one task pool. Name files by their role (`induction_*.xml`, `deepening_*.xml`, `trigger_*.xml`, `cue_*.xml`, `suggestion_*.xml`, `task_*.xml`) so the architecture is obvious from the listing. The per-type folder layouts are in `hypno.md` and `active.md`.

## Make it playable
An XML script alone does nothing for the user — it must be referenced so the app surfaces it. Every script in the sandbox pre-renders in the background after startup, and referenced scripts render first. After writing a session, wire it in through one of:

- A `script` action (e.g. a routine's `success` action, a task timeout escalation, or a store entry the user buys with points), which queues the script for the user to play.
- `audio.prepare(src)` / `audio.play(src)` inside a routine or task body, so it plays as a stage of the session — the body can sync to the audio through the script's `<zone>`/`<mark>` markers (`await handle.zone('warmup')`). See `docs/internal/runtime-api.md` for the full API.

You own the feature files as much as the scripts: when a commissioned session is part of a plan, wire it into (or create) the routine/task it belongs in rather than leaving the file unreferenced.

## Validate before you finish
Scripts are written in XML and can import other scripts via `<include>` (syntax: `docs/internal/tts-tags.md`). After writing scripts or sessions, validate them with the `validate_files` tool (optionally scoped to a path, e.g. `validate_files({ path: "hypnos" })` or `validate_files({ path: "hypnos/hypno/compositions/reinforce_sissy_identity.xml" })`): it parses and semantically checks the markup and chases includes, reporting dangling/circular includes, unknown/removed tags, and missing `<clip>` sources as errors. Fix every reported `error` before considering the script done; `warning`s are not fatal but usually indicate something unintended.
