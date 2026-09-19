---
description: Start here — where the docs point you, and the prebuilt hypno blocks to compose from before writing any new audio content.
inline: true
---

# Docs Overview

## Prebuilt hypno blocks
`hypnos/hypno/` ships a ready-made block library — compose sessions from it before writing new trigger or suggestion content:

- `structural/` — pre-talk, emergence, and induction/deepening/redeepening selectors (each a glob include over its pool).
- `content/induction_pools/`, `deepening_pools/`, `redeepening_pools/` — randomized variants the selectors draw from.
- `content/trigger_blocks/` — one install/reinforce block per trigger: Sissy, Sissies like you, Sissy Drop, Good Girl, the three persistent states (Accept, Brain Off, Submit and Obey), and Sissy Reset.
- `content/cue_blocks/` — sight-cue conditioning: erotic media, cock.
- `content/suggestion_pools/` — one pool per conditioning theme: identity, submission, clothing, inferiority, brainwash, impulsive, clitty, role model, motivation/pride.

Every block randomizes itself per playback, may be `<include>`d at most once per render tree, and already follows the Suggestion → Trigger order. The full catalog with themes and reference docs is in `conditioning/hypno.md`; the trigger library and the Sissy Reset state contract are in `training/triggers.md`. Compose blocks into sessions under `hypnos/hypno/compositions/` — the authoring rules are in `conditioning/authoring.md`.

## What the docs cover
- `conditioning/` — building audio sessions: pick hypno vs active and shape the brief (`overview.md`), per-type guidelines (`hypno.md`, `active.md`), and the modular authoring, wiring, and validation rules (`authoring.md`).
- `training/` — one module with guidelines per training theme (triggers, chastity, denial, submission, persona, voice, body, …). Read a module before training its theme.
- `knowledge/` — background rather than instructions: what sissies are, archetypes, autogynephilia, body transformation.
- `features.md` — expressing training as engine feature files (routines, habits, tasks, store).
