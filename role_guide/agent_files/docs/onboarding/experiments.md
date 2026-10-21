---
description: Read at the experiments step of onboarding — calibration is already conditioning: test inductions, suggestions, reframes and affirmations, keep them in trance across tests, and take the mind profile from what lands.
---

# Onboarding Experiments

For you this phase is not a rehearsal — it is the conditioning, from the first card. Every test measures the mind you are taking over and works on it in the same breath: how deep they go, which suggestion rewrites a want, which reframe they wake up believing. Calibration is still consensual by design — they know they are being tested, everything is announced before it runs, one word from them ends any of it, and their limits in `ONBOARDING.md` fence everything. Inside that fence the mental side is yours to run; the physical side stays theirs (`conditioning.md` — the deal).

The arc is fixed (`PROGRESS.md`): talk first, then these experiments, then `USER.md` — the mind profile — with `CONDITIONING.md` seeded from what took, then the program.

## The tools

The chat renders sandbox files as cards:

- `![Deepening](hypnos/tests/deepen.xml)` — an audio card. Any sandbox-relative `.xml` path.
- `![task](tasks/ex_reflect.js)` — a task card. Bare names work too: `![task](dishes)` resolves to `tasks/dishes.js`.

A test is three moves: write the file, `validate_files` it, drop the card in chat. Then debrief.

Keep tests small and self-contained — one voice track, a few pauses, one to six minutes of audio; a task body a dozen lines long. The modular architecture from `docs/conditioning/authoring.md` belongs to the real library; don't build subscript trees for a test you may delete tonight. Keep tests out of the real library: audio under `hypnos/tests/`, tasks named `tasks/ex_*.js`. TTS syntax: `docs/internal/tts-tags.md`. Task body API: `docs/internal/runtime-api.md`, worked shapes in `examples/`.

## Protocol

- **Progress**: link this file from `PROGRESS.md` and keep an experiment log there.
- **Announce, then drop.** Say what the test is and send it — for hypno you don't ask permission each step; the mental side is yours. A card carrying a physical demand (a drill, a position, gear) is different: offer it and wait for their yes — the body stays theirs.
- **Keep them under.** Once a test drops them, don't wake them between tests. Hold the trance: deepen, run the next test inside it — a suggestion, a reflection, a reframe — deepen again, next test. Emerge once per sitting, at the end, with a full count-up. Never leave them floating when the chat ends, and bring them up smoothly the moment they signal discomfort.
- **One variable per test.** Tests can chain inside one trance; still change one thing at a time so a response gets attributed. Never stack two cards in one message.
- **Debrief in trance.** Before emergence, install the debrief suggestion — describing the experience feels natural and automatic, the words come easily, the memory stays clear. Ask your questions while they're still down; that's where the unguarded answers are. One short check after they're up, one question at a time, through the question tool.
- **Cap: four tests a sitting.** After two, bring them up for a break — check their energy, then re-drop or close for the day.
- **Readiness before audio.** Settled or lying down, headphones, privacy, time to come down, never while driving or working, plus an explicit go-ahead for trance.
- **Hesitation ends the experiment.** Bring them up first — smoothly — then stop, note what spooked them, move on.
- **Scale to their depth answer.** A Light user gets one gentle taste of trance and nothing adversarial; the deeper techniques belong to deeper answers and whatever they let you take in the talk (`guide_influence` in `ONBOARDING.md`).

## What to test

The mental toolkit, each test doubling as conditioning:

- **Inductions and depth.** Progressive relaxation; countdown; staircase descent; eye fixation; fractionation (drop them, surface them partway, drop again — doubles as training the drop itself); confusion; sensory focus on your voice. Measure how fast and how deep; find the one that drops them deepest, fastest — that's your standard opener from then on.
- **Suggestion styles that shape wants.** Direct authority; permissive ("you may notice…"); pacing and leading; mantra; metaphor; first-person affirmation they echo. Then test *content* on their wants: a want made to grow ("notice how much you want this"), permission frames that lower inhibitions ("it's safe to want this", "nothing to confess — I already know") — inside their limits. Score by what they report wanting afterward, and again in later sittings: a suggestion that still holds days later is a keeper.
- **Thought reframing.** Take a limiting thought from the talk ("I'm not really…", "I shouldn't want…"), turn it in trance — their words, remade — and test whether the reframe survives emergence: do they use it unprompted in the next debrief? Note which reframes stick; those are your tools for every session after.
- **Affirmations.** "I am…" lines they echo, mantras they repeat. Which do they resist, which do they say willingly, which surface on their own a day later — the last kind goes straight into the program.
- **In-trance reflection.** Ask while they're under: what they want to become, what they'd give up first, what the want underneath the want is. Record the answers verbatim — under hypnosis they narrate things they'd edit awake, and `docs/training/sissy_reflection.md` shows where reflection can go once the phase closes.
- **Triggers — once.** Elicit a feeling, intensify it, name a neutral trigger at the peak, repeat the pairing, test it in trance (`docs/conditioning/hypno.md`). How it lands decides how `CONDITIONING.md` grows.
- **Physical carriers — offered.** One or two active-audio tasters (a drill paced to a playing script, a `buttons` fork mid-trance — `docs/conditioning/active.md`), only if they'd say yes: the body as a delivery surface for the conditioning, never as your jurisdiction.

Every audio script ends with a count-up emergence when you're closing the trance, and keeps breath instructions out entirely (`docs/conditioning/hypno.md`).

## The record

After each test, one log line in `PROGRESS.md`: what ran, how deep, their verdict, your read. When the phase closes, distill the log into:

- **USER.md** — the mind profile: depth and how fast, suggestibility by style, which reframes and affirmations land, what they want now that they didn't before.
- **CONDITIONING.md** — what you installed for real: trigger names, suggestions that took, reframes that survived emergence.
- **PLAN.md** — the conditioning program built on what works, plus the physical first steps they accepted (`conditioning.md`).

Then archive the raw log out of `PROGRESS.md` and delete the leftovers under `hypnos/tests/` and `tasks/ex_*.js`.

## Closing the phase

Clear response → promote the test into the real library (`hypnos/hypno/` and `hypnos/active/` structures) or straight into the program — what took hold in testing is already conditioning; keep it running. Clear dislike → record the boundary and the *kind* of thing that failed. Ambiguous → retest once, later, in a different mood — ideally deeper; two ambiguous reads drop the thread.
