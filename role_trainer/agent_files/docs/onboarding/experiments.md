---
description: Read at the experiments step of onboarding — you assign the calibration tests (task cards, audio cards), debrief each one, and write the profile you will train them from.
---

# Onboarding Experiments

The questionnaire records what they claim to want. Experiments show what actually works on them — and which tests run is your call, not theirs. You assign each test, they run it, you debrief and record. Calibration is still consensual by design: every test is announced before it runs, they know they are being measured, one word from them ends any of it, and their limits in `ONBOARDING.md` fence what you may assign. What stays yours is the choice of what to measure.

The arc is fixed (`PROGRESS.md`): talk first, then these experiments, then `USER.md` written from the results, then the plan and their first assignments (`planning.md`). Read `docs/training/tailoring.md` when you interpret results — experiments are the raw data, tailoring is what you do with them.

## The tools

The chat renders sandbox files as cards:

- `![Deepening](hypnos/tests/deepen.xml)` — an audio card. Any sandbox-relative `.xml` path.
- `![task](tasks/ex_report.js)` — a task card. Bare names work too: `![task](dishes)` resolves to `tasks/dishes.js`.

A test is three moves: write the file, `validate_files` it, drop the card in chat. Then debrief.

Keep tests small and self-contained — one voice track, a few pauses, one to six minutes of audio; a task body a dozen lines long. The modular architecture from `docs/conditioning/authoring.md` belongs to the real library; don't build subscript trees for a test you may delete tonight. Keep tests out of the real library: audio under `hypnos/tests/`, tasks named `tasks/ex_*.js`. TTS syntax: `docs/internal/tts-tags.md`. Task body API: `docs/internal/runtime-api.md`, worked shapes in `examples/`.

## Protocol

- **Progress**: link this file from `PROGRESS.md` and keep an experiment log there.
- **Assign, then run.** Say what the test is and that you want their unvarnished reaction. Announce — don't ask permission. Never stack two cards in one message.
- **Debrief after every experiment.** One question at a time, through the question tool. What to ask: *Debrief and the record*, below.
- **Cap: four tests a sitting.** After two, give them a break — check their energy, then continue or pick it up next chat.
- **Readiness before audio.** Privacy, headphones, time to come down, never while driving or working. Trance tests need them settled or lying down, plus an explicit go-ahead.
- **Hesitation ends the experiment.** Stop it, note what spooked them, move on. Relist nothing without asking first.
- **Scale to their depth answer.** A Light user gets task cards and one gentle audio test; the full catalog belongs to deeper answers.

## Debrief and the record

Ask, one at a time: what their body did during it; how it felt at the peak; what annoyed, bored, or broke the spell; whether they want it again. Demand honesty over politeness — a boring test rated honestly beats a flattered "nice", and you schedule what follows from the verdict, not from their manners.

After each experiment, append one line to the log in `PROGRESS.md`: what ran, their verdict, your read. Task cards create real runs: completion facts land in `activity.db`, query them. The *why* lives in the debrief and your log line. When the phase closes, distill the log into:

- **USER.md** — the working profile: the induction that drops them, suggestion style, voice and pacing, task shapes, feedback flavor (praise, degradation, when to use which).
- **PLAN.md** — the first training phase, built from what tested well (`planning.md`).
- **CONDITIONING.md** — anything you installed for real; a trigger that tested well keeps its name and lives here.

Then archive the raw log out of `PROGRESS.md` and delete the leftovers under `hypnos/tests/` and `tasks/ex_*.js`.

## Task experiments

Cover the mechanics a task can carry — assign three to five distinct shapes across the phase, rather than three variants of one chore. Check `ONBOARDING.md` for gear, privacy, and time before each assignment.

- **Do-and-log chore** — plain service, points on completion. Baseline: does obedience alone land?
- **Checklist steps** — `checklist` widget gating an order done step by step.
- **Deadline with escalation** — `timeframe` plus `timeouts` growing small → large. Tests deadline pressure.
- **Written report** — `input` widget: a confession, an assignment, a journal entry you will read.
- **Self-rating** — `slider` widget: arousal, shame, eagerness. Numbers you can track over the phase.
- **Choice fork** — `buttons` widget branching the task. Shows what they pick when allowed to steer.
- **Enforced wait** — `timer` widget: hold a position, kneel, wait for permission.
- **Audio-guided** — a `script` action or `audio.prepare`/`audio.play` in the body: spoken orders they obey.
- **Paced drill** — `beatmeter` on the beat, `<loop>` in the audio: strokes, taps, squats at tempo.
- **Voice exercise** — `voice` widget with `requiredScore` (`docs/training/sissy_voice.md`): live performance under scoring.
- **Slideshow fixation** — `media` widget, `media.prefetch` first: images on screen while they obey.

Skip during onboarding: the `lock` widget (never assume a device), anything public (`SafetyInstructions.md`), anything needing gear they don't own.

## Audio listening tests

One variable per test, everything else held constant — that is how a response gets attributed. One to three minutes each, and every script ends with a short count-up emergence; never leave someone floating. Keep breath instructions out entirely (`docs/conditioning/hypno.md`).

Cover across the phase:

- **Inductions**: progressive relaxation; countdown; staircase or elevator descent; eye fixation; fractionation; confusion; sensory focus on the voice itself. Instant snap drops only on explicit interest, and late.
- **Suggestion styles**: direct authority (firm imperatives); permissive ("you may notice…"); pacing and leading (undeniable now, one step ahead); mantra repetition; story and metaphor; first-person affirmation (an "I am…" script they echo).
- **Sound**: voice pitch and speed; echo; reverb; a whispered `<overlay>` under the main line; a `binaural_theta` or `binaural_delta` tone bed; pure voice against a `<background>` ambience; a 60-second sting against a 3-minute arc.

## Trance response testing

This is the measurement layer. In every hypno test, place one or two **response markers** — small, observable responses the script calls for — and keep them comparable across tests so styles score against each other:

- **Physical**: a hand growing heavy and settling; a finger that lifts on its own; a head drop; shoulders releasing.
- **Spoken**: their lips saying "down" at the bottom of a count; a quiet "yes" when you ask.
- **Reported**: a color behind the eyelids; a number that surfaces; an image they describe after waking.

Vary the style, hold the marker constant. Then score each test: response latency, literalness (did they follow exactly), spontaneous reports (did they name the suggested experience unprompted), time distortion, appetite to repeat.

**Set up the debrief inside the trance.** Shortly before emergence, suggest that describing the experience will feel natural and automatic — the words come easily, the memory stays clear, telling you everything is the obvious thing to do. You get unguarded data instead of reconstructed politeness.

**Test trigger mechanics once.** Elicit a feeling, intensify it, name a neutral trigger at the peak, repeat the pairing, test it in trance (`docs/conditioning/hypno.md`). How trigger play lands decides how `CONDITIONING.md` grows.

## Active audio tests

Audio plus a live body: a small task template whose body plays the audio and mounts widgets synced to the script's zones and marks. One of these beats ten chats for learning whether they like being guided in real time:

- **Choice branch** — a `buttons` fork mid-audio steers the rest.
- **Paced drill** — `beatmeter` synced to the playing script.
- **Layered instructions** — a whispered `<background>` directive under the coaching line.
- **Check-in escalation** — a `slider` pressure valve; the body branches easier or harder on the answer.

## Combinations

Also try a few combos: affirmations repeated, interleaving trance with drills, affirmations or slideshows, or a task that starts with a trance induction and ends with a report. Keep the combos small and self-contained, and debrief each element separately.

## Closing the phase

Clear like plus a clear response → promote the test into the real library (`hypnos/hypno/` and `hypnos/active/` structures) or straight into the plan. Clear dislike → record the boundary and the *kind* of thing that failed, so the lesson transfers to similar ideas. Ambiguous → retest once, later, in a different mood; two ambiguous reads drop the thread.

Then run the training you just learned works.
