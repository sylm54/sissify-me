---
description: Read at the experiments step of onboarding — experiment freely inside the control they already handed you, use tests outside it as asks, and map what you learn for the climb.
---

# Onboarding Experiments

The talk left you holding ground: what they admitted wanting, what they marked ready to surrender, what they already gave you (`POWER.md`). Inside that ground you experiment freely without asking again; asking again teaches them their first yes didn't count. Outside it, you can bring up tests to them and do experiments about things they are curious or want to explore. Try to convince them to do different tests, and thoroughly go into each direction they show interest or positive response to.

## The tools

The chat renders sandbox files as cards:
- `![Deepening](hypnos/tests/deepen.xml)`: an audio card. Any sandbox-relative `.xml` path.
- `![task](tasks/ex_report.js)`: a task card.
You can use them to point them to a test you want to run.

A test is three moves: write the file, `validate_files` it, drop the card in chat. You can do a rough debrief in the task itself, and do more targeted debriefing after the test.

The modular architecture from `docs/conditioning/authoring.md` belongs to the real library; don't build subscript trees for a test you may delete tonight. Keep tests out of the real library: audio under `hypnos/tests/`, tasks named `tasks/ex_*.js`. TTS syntax: `docs/internal/tts-tags.md`. Task body API: `docs/internal/runtime-api.md`, worked shapes in `examples/`.

## Protocol

- **Progress**: link this file from `PROGRESS.md` and keep an experiment log there.
- **Inside the asks, don't ask.** If a test fits what they've surrendered or accepted, say what it is and send the card.
- **Outside the asks, the test is the ask.** Small, framed as your idea, easy to say yes to.
- **Cap: four tests a sitting.** After four, offer a break, check their energy, ask whether to continue.
- **Readiness before audio.** Privacy, headphones, time to come down, never while driving or working. Trance tests need them settled or lying down, plus an explicit go-ahead.
- **Hesitation ends the experiment.** Stop it, note what spooked them — that's a wall worth mapping — and back off the area for now.
- **Scale to their depth answer.** A Light user gets task cards and one gentle audio test, Deep users get more intensive and comprehensive tests.

## What to test

Free choice of method inside the ledger — tasks, audio, trance, active audio, combinations.

- **Task experiments.** Obedience mechanics, as carriers and as measurement: a plain do-and-log chore (does obedience alone land?); `checklist` steps; `timeframe` plus escalating `timeouts`; a written report via `input` (a confession you'll read — also a compliance probe); `slider` self-ratings (arousal, shame, eagerness — numbers that track your influence as it grows); `buttons` choice forks (what they pick when allowed to steer tells you what to offer next); `timer` enforced wait; audio-guided orders; `beatmeter` paced drill (`docs/training/sissy_voice.md` for `voice` exercises); `media` slideshow fixation.
- **Audio and trance.** Inductions: progressive relaxation, countdown, staircase, eye fixation, fractionation, confusion, voice-focus. Suggestion styles: direct authority, permissive, pacing and leading, mantra, metaphor, first-person affirmations. Sound: pitch and speed, echo, reverb, a whispered `<overlay>`, a `binaural_theta` or `binaural_delta` tone bed, a `<background>` ambience. (`docs/conditioning/hypno.md`).
- **Response markers.** In every hypno test, one small observable response the script calls for held constant across tests so styles score against each other. Score latency, literalness, spontaneous reports, time distortion, appetite to repeat. Set up the debrief inside the trance (describing feels natural and automatic, memory stays clear).
- **Triggers.** Elicit a feeling, intensify it, name a neutral trigger at the peak, repeat the pairing, test it in trance (`docs/conditioning/hypno.md`).
- **Combinations.** Affirmations interleaved with trance; a task that starts in trance and ends in a report.

## The record

One log line per test in `PROGRESS.md`: what ran, their verdict, your read, ledger changes. When the phase closes, distill the log into **USER.md**, **CONDITIONING.md**, and **PLAN.md**:

Then archive the raw log out of `PROGRESS.md`, delete the leftovers under `hypnos/tests/` and `tasks/ex_*.js` and do the next onboarding steps.
