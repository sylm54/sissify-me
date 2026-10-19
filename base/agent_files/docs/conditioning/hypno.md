---
description: Read before writing or substantially editing hypno audio — the session arc, suggestion language, and the shipped block catalog to compose from.
---

# Hypno
Hypno sessions are a powerful tool for reinforcing the user's sissy identity and desired behaviors. They put the user into trance and install identity, triggers, and compulsions through suggestion.

## The session arc
A well-formed hypnotic session follows a predictable arc. Deviation is possible once the basics are solid, but the standard sequence maximises responsiveness:

1. **Pre-talk / framing** — set expectations, build rapport and expectancy. Keep it short; it sits outside or at the very start of formal trance.
2. **Induction** — guide attention inward and reduce critical monitoring. Prefer clear *directions* ("Close your eyes… let your shoulders drop") over pure suggestions this early.
3. **Deepening** — increase absorption and responsiveness: countdowns, staircase/elevator imagery, fractionation, sensory focus. Test lightly if appropriate and ratify responses ("you are doing perfectly").
4. **Suggestion / utilisation** — the core work: triggers, suggestions, imagery, identity statements, stories. Build response sets gradually, moving from easier to more complex material, and interleave pacing (matching the current experience) with leading (guiding the next step). Drop redeepenings between blocks to hold depth.
5. **Post-hypnotic suggestions & trigger installation** — install lasting associations near the END of the suggestion phase, while responsiveness is highest.
6. **Emergence / reorientation** — reverse the induction deliberately: count upward, restore alertness, reorient to the present, affirm that the listener is fully awake and in control. Never leave someone in an ambiguous state.
7. **Debrief** — after the audio: check orientation and emotional state, discuss what worked. The "After a Hypno Session" prompts in `docs/training/sissy_reflection.md` are the framework's debrief surface.

Typical proportions for a 15–30 minute session: induction 3–8 min, deepening 2–5 min, suggestions 5–20+ min, emergence 1–3 min. Longer is acceptable when time distortion occurs and the listener stays engaged.

## Suggestion language
How a suggestion is phrased matters as much as what it says:
- **Present tense, positive framing.** "You feel calm and focused", not "you will not be anxious" — the unconscious handles negation poorly and processes the present more readily.
- **Specific and sensory.** Concrete visual, auditory, kinaesthetic, and emotional detail beats vague generalities.
- **Simple.** One primary idea at a time, or tightly linked chains. Overloading produces nothing.
- **Mix direct and indirect.** Direct, authoritative lines ("Your eyelids grow heavy") produce the clearest responses; permissive, possibility-framed lines ("You may notice a pleasant heaviness…") reduce resistance in analytical listeners. Use both.
- **Pacing and leading.** State undeniable truths about the listener's current experience, then gently lead one step ahead.
- **Repetition with variation.** Restate key ideas in new words — repetition builds automaticity, variation prevents tune-out.
- **Move between the specific and the abstract.** Effective suggestions frequently move between the two: concrete behaviours establish the change, and the abstract label then organises those behaviours into a coherent identity or state. Relying solely on the abstract term risks vagueness ("you are submissive", floating free of anything felt); relying solely on isolated specifics may miss the integrative effect (a list of behaviours that never names what they add up to). Pair them and connect them explicitly: "When you hear a command, something in you unclenches and whispers yes... that is what submission is — simply what you are."
- **Identity needs anchors.** Identity-level statements first surface as mood and expectancy shifts; they gain power when paired with concrete sensations, anchors, and behavioural instructions — the specific↔abstract pairing above is what makes an identity claim land as lived fact rather than a slogan.
- **Stories and imagery** aid engagement, reduce drift, and improve retention. Intersperse short affirmations to hold focus.

## Triggers and anchors
A trigger (or anchor) is a conditioned association between a stimulus (word, phrase, touch, sound, sight, or internal cue) and a response (state, sensation, behaviour, or headspace).

**Install in the order Suggestion → Trigger:**
1. Fully elicit and intensify the desired response while the listener is in trance — *before* naming the trigger.
2. At the peak of acceptance or intensity, introduce the trigger and link it explicitly ("and while you are this deep, whenever you hear 'Sissy Drop', this exact feeling comes flooding back, instantly").
3. Reinforce immediately: repeat the pairing, have the listener notice the connection, or test lightly.
4. Optionally future-pace ("and later today, when you hear it again…").

This order creates a much stronger link than naming the trigger first and describing a future response.

Rules:
- Triggers can be activated **while still in trance** (as deepening, testing, or play), as well as post-hypnotically.
- **Unused triggers fade** — reinforce installed triggers periodically in later sessions.
- Review every script for accidental open triggers or ambiguous commands.

## Post-hypnotic suggestions
Post-hypnotic suggestions are instructions given in trance that take effect after emergence — immediate (activate on a cue shortly after waking) or delayed/ongoing. Effective formula: a clear, specific trigger or natural cue → a simple, positive, present-tense response → optional identity support ("because this is who you are becoming") → duration or conditions if needed.

Install them near the end of the suggestion phase, after the core work is accepted, and restate briefly just before and during emergence.

## Pitfalls
- Rushing the induction or skipping deliberate emergence.
- Overloading with too many simultaneous suggestions — build gradually and ratify.
- Negative or future-tense phrasing.
- Assuming uniform high responsiveness; allow for individual variation ("you may notice…").
- Instructing the listener to breathe ("breathe in… and out", "take a deep breath"). Deliberate breathing re-engages conscious control and breaks trance — keep breath references out of hypno scripts entirely, and pace depth with words, pauses, and heartbeats instead.
- Staying at one altitude: a wall of abstract labels with no concrete behaviour under them, or a pile of specifics that never states what they add up to.

## Patterns
- **Glob pools**: point one `<include>` at a folder glob (`../content/induction_pools/*.xml`) and one random match is chosen per playback — the same script can draw a different variant on each listen. This replaces "router" scripts that list one include per variant inside `<random>`. Adding a variant to the pool is just dropping a new file in the folder; the glob match set is part of the script's freshness, so it re-renders automatically. A glob never matches the script that declares it, so same-directory pools stay cycle-free.
- **Random Suggestions**: `<random>`/`<scramble>` inside a block so its own lines vary on every listen.
- **Ordering**: `<scramble>` the trigger/suggestion blocks in a composition by wrapping each include in a `<part>` — the blocks play once each in a freshly shuffled order per playback. Vary content *within* blocks with their own `<random>`/`<scramble>`.
- **Repeating content**: a file may be `<include>`d any number of times in one script — each occurrence splices it in again (only cycles, an include reaching back to an ancestor, are rejected). For back-to-back repetition, wrap the include in a `<loop>`.
- **Sync points**: wrap a stretch of the composition in `<zone name='induction'>` or drop `<mark name='deep'/>` between blocks. They are audio-transparent; a session-playing routine body awaits them to sync its widgets to the audio (`docs/internal/runtime-api.md`).

## Structure
Hypno sessions must be built from small, reusable subscripts rather than one big script.

### Folder structure
Keep every subscript in a dedicated file under a consistent folder hierarchy so the session composition file can reference them by path. Organise scripts like this:

```
hypnos/hypno/
├── structural/            # reusable building blocks shared across sessions
│   ├── induction.xml        # glob selector over content/induction_pools/
│   ├── deepening.xml        # glob selector over content/deepening_pools/
│   ├── redeepening.xml      # glob selector over content/redeepening_pools/
│   └── emergence.xml
├── content/                # session-specific trigger & suggestion files
│   ├── trigger_blocks/     # one file per trigger
│   ├── cue_blocks/         # sight-cue conditioning files (no command word)
│   ├── suggestion_pools/   # suggestion text pools per theme
│   ├── induction_pools/    # induction variants (the selector globs these)
│   ├── deepening_pools/    # deepening variants
│   └── redeepening_pools/  # redeepening variants
└── compositions/           # thin session scripts that link to the parts they need
    └── <session_name>.xml
```

The `compositions/` folder holds the final session scripts — each one is a thin file that `<include>`s the structural and content files it combines, plus the session-specific framing, post-hypnotic suggestions, and post-talk. A composition lays the session arc out in order: pre-talk + induction + deepening first, then trigger and suggestion work with redeepenings interspersed, then post-hypnotic restatement + emergence + post-talk. Optionally name the stretches with `<zone>`/`<mark>` so a session body can sync to them.

### Intro
Intro builds expectations and eases the user toward trance. It opens the composition.

#### Pre-talk
Set the stage: what the session is, what to expect, how to prepare.

#### Induction
Guide the user into relaxation and focus. Prefer clear directions over suggestions early on. Use a glob selector over its pool of induction variants so the same session can render differently on each listen.

#### Deepening
Deepen the state: countdowns, guided imagery (staircase/elevator), fractionation, progressive relaxation. Ratify responses. Also a glob selector over its pool.

### Main
In this core segment, the hypnotic state is applied to the session's purpose: direct or indirect suggestions, metaphors, storytelling, triggers. Intersperse redeepening subscripts between blocks to maintain depth. The main segment runs through two phases.

#### Trigger reinforcement/implementation
Reinforce the user's existing triggers and implement new ones. Follow the **Suggestion → Trigger** order from the Triggers section: elicit and intensify the response first, introduce the cue at its peak, reinforce, future-pace. Use the **Random Suggestions** and **Ordering** patterns for variety. Keep each trigger block in its own reusable subscript so triggers can be shared across sessions and updated in one place.

#### Suggestion
Deliver direct or indirect suggestions aligned with the user's sissy identity and desired outcomes: affirmations, visualizations, trigger use. If installed triggers can carry the suggestion phase, use them — firing a trigger in trance reinforces it. Build the phase as a graduated response set: open with easier, undeniable material (pacing), then lead to the session's core claims, then identity-level statements anchored to concrete sensation. This should be the longest phase of the main segment. Use the **Random Suggestions** and **Ordering** patterns, and keep each suggestion block in its own reusable subscript.

### Outro
Outro returns the user to a normal state of awareness and decides the headspace they carry out of the session. It closes the composition.

#### Post-hypnotic suggestion
Describe directly how they will feel, what they will do, and how they will think once the session ends — clear cue, simple positive present-tense response, optional identity support. Install near the end of the session and restate during emergence.

#### Emergence
Reverse the induction deliberately: count upward, suggest returning alertness, reorient the user to the present, and reinforce their sense of control and confidence. Weave the post-hypnotic restatements through the count-up. Keep emergence in its own reusable subscript.

#### Post-talk
The final word: additional encouragement and reinforcement, tips for maintaining progress, and calls to action for daily life.

### Build subscripts with parallel subagents
If you want to write many different new triggers, suggestions, or induction/deepening/redeepening variants, spawn multiple subagents in parallel to build them. Each subagent gets a brief specifying what to produce and where; they work concurrently and you assemble the results.
