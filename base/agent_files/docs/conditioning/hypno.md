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
7. **Debrief** — after the audio: check orientation and emotional state, discuss what worked. The "After a Hypno Session" prompts in `special/sissy_reflection.md` are the framework's debrief surface.

Typical proportions for a 15–30 minute session: induction 3–8 min, deepening 2–5 min, suggestions 5–20+ min, emergence 1–3 min. Longer is acceptable when time distortion occurs and the listener stays engaged — the `<main>` marker lets them extend the session themselves (see Patterns).

## Suggestion language
How a suggestion is phrased matters as much as what it says:
- **Present tense, positive framing.** "You feel calm and focused", not "you will not be anxious" — the unconscious handles negation poorly and processes the present more readily.
- **Specific and sensory.** Concrete visual, auditory, kinaesthetic, and emotional detail beats vague generalities.
- **Simple.** One primary idea at a time, or tightly linked chains. Overloading produces nothing.
- **Mix direct and indirect.** Direct, authoritative lines ("Your eyelids grow heavy") produce the clearest responses; permissive, possibility-framed lines ("You may notice a pleasant heaviness…") reduce resistance in analytical listeners. Use both.
- **Pacing and leading.** State undeniable truths about the listener's current experience, then gently lead one step ahead.
- **Repetition with variation.** Restate key ideas in new words — repetition builds automaticity, variation prevents tune-out.
- **Identity needs anchors.** Identity-level statements first surface as mood and expectancy shifts; they gain power when paired with concrete sensations, anchors, and behavioural instructions.
- **Stories and imagery** aid engagement, reduce drift, and improve retention. Intersperse short affirmations to hold focus.

## Triggers and anchors
A trigger (or anchor) is a conditioned association between a stimulus (word, phrase, touch, sound, sight, or internal cue) and a response (state, sensation, behaviour, or headspace).

**Install in the order Suggestion → Trigger:**
1. Fully elicit and intensify the desired response while the listener is in trance — *before* naming the trigger.
2. At the peak of acceptance or intensity, introduce the trigger and link it explicitly ("and while you are this deep, whenever you hear 'Sissy Drops', this exact feeling comes flooding back, instantly").
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

## Default framework
The framework ships a default library under `hypnos/hypno/` so you don't have to bootstrap the structural parts from scratch:
- `structural/` — reusable pre-talk, emergence (wakener), and induction/deepening/redeepening **selectors** (each is a single glob include over its pool).
- `content/induction_pools/`, `content/deepening_pools/`, `content/redeepening_pools/` — randomized variants the selectors draw from.
- `content/trigger_blocks/`, `content/suggestion_pools/` — prebuilt trigger-install and suggestion blocks keyed to the specializations (`special/*.md` — each special lists the blocks it needs). Reuse these before writing new trigger or suggestion content from scratch.

**Reuse before you rewrite**: compose themed sessions by including the shipped structural files and swapping in session-specific trigger blocks and suggestion pools. Add new variants to the pools rather than forking copies. The shipped trigger blocks and pools assume the foundational triggers (`special/foundational_trigger.md`) are already installed — they fire "Sissy Drops" and "Good Girl" as in-trance reinforcement; a first-ever session should install triggers before leaning on them. This in-trance repetition can create a brainwashing effect, eroding resistance and fostering automatic, recurring urges that feel increasingly natural and difficult to ignore.

## Patterns
- **Glob pools**: point one `<include>` at a folder glob (`../content/induction_pools/*.xml`) and one random match is chosen per playback — the same script can draw a different variant on each listen. This replaces "router" scripts that list one include per variant inside `<random>`. Adding a variant to the pool is just dropping a new file in the folder; the glob match set is part of the script's freshness, so it re-renders automatically. A glob never matches the script that declares it, so same-directory pools stay cycle-free.
- **Random Suggestions**: `<random>`/`<scramble>` inside a block so its own lines vary on every listen.
- **Ordering**: `<scramble>` the trigger/suggestion blocks in a composition by wrapping each include in a `<part>` — the blocks play once each in a freshly shuffled order per playback. Vary content *within* blocks with their own `<random>`/`<scramble>`.
- **Repeating content**: a file may be `<include>`d at most once per render tree — to repeat content, put a `<loop>`/`<scramble>` inside the subscript itself.
- **Structural markers**: wrap compositions in `<intro>` / `<main>` / `<outro>`. They are transparent to audio; `<intro>`/`<outro>` play once each, and a `<main>` with **no interactive tag** (`<until>`/`<random>`/`<scramble>`/`<choice>`) unlocks the player's "Repeat length" slider, looping `<main>` up to 10 hours. Sessions built from randomized blocks play fixed-length; pure affirmation/looping sessions benefit most from the slider. Use at most one `<main>`, top-level only.
- **Pressure valve**: wrap demanding content in a `<react>` (main + fallback parts) so an overwhelmed listener can cut to a gentler line without breaking the session.
- **Depth check**: a `<rating>` near the end ("how deep are you, one to five?") records the answer to the activity log — real data for calibrating the next session.

## Structure
Hypno sessions must be built from small, reusable subscripts rather than one big script.

### Folder structure
Keep every subscript in a dedicated file under a consistent folder hierarchy so the session composition file can reference them by path. Organise scripts like this:

```
hypnos/hypno/
├── structural/            # reusable building blocks shared across sessions
│   ├── pre-talk.xml         # default framing/expectation-setting
│   ├── induction.xml        # glob selector over content/induction_pools/
│   ├── deepening.xml        # glob selector over content/deepening_pools/
│   ├── redeepening.xml      # glob selector over content/redeepening_pools/
│   └── emergence.xml
├── content/                # session-specific trigger & suggestion files
│   ├── trigger_blocks/     # one file per trigger
│   ├── suggestion_pools/   # suggestion text pools per theme
│   ├── induction_pools/    # induction variants (the selector globs these)
│   ├── deepening_pools/    # deepening variants
│   └── redeepening_pools/  # redeepening variants
└── compositions/           # thin session scripts that link to the parts they need
    └── <session_name>.xml
```

The `compositions/` folder holds the final session scripts — each one is a thin file that `<include>`s the structural and content files it combines, plus the session-specific framing, post-hypnotic suggestions, and post-talk. A composition maps the session arc onto the structural markers: `<intro>` = pre-talk + induction + deepening, `<main>` = trigger and suggestion work with redeepenings interspersed, `<outro>` = post-hypnotic restatement + emergence + post-talk.

### Intro
Intro builds expectations and eases the user toward trance. It should be in an `<intro>` tag.

#### Pre-talk
Set the stage: what the session is, what to expect, how to prepare. Keep it in its own reusable subscript so it can be shared and updated in one place.

#### Induction
Guide the user into relaxation and focus. Prefer clear directions over suggestions early on. The default selector globs the induction pool, so each playback draws a different induction — keep variants in `content/induction_pools/`.

#### Deepening
Deepen the state: countdowns, guided imagery (staircase/elevator), fractionation, progressive relaxation. Ratify responses. Also a glob selector over its pool.

### Main
In this core segment, the hypnotic state is applied to the session's purpose: direct or indirect suggestions, metaphors, storytelling, triggers. Intersperse redeepening subscripts between blocks to maintain depth. The main segment runs through two phases — use `<main>` only if you understand the repeat-slider trade-off above (randomized blocks disable it):

#### Trigger reinforcement/implementation
Reinforce the user's existing triggers and implement new ones. Follow the **Suggestion → Trigger** order from the Triggers section: elicit and intensify the response first, introduce the cue at its peak, reinforce, future-pace. Use the **Random Suggestions** and **Ordering** patterns for variety. Keep each trigger block in its own reusable subscript so triggers can be shared across sessions and updated in one place.

#### Suggestion
Deliver direct or indirect suggestions aligned with the user's sissy identity and desired outcomes: affirmations, visualizations, trigger use. If installed triggers can carry the suggestion phase, use them — firing a trigger in trance reinforces it. Build the phase as a graduated response set: open with easier, undeniable material (pacing), then lead to the session's core claims, then identity-level statements anchored to concrete sensation. This should be the longest phase of the main segment. Use the **Random Suggestions** and **Ordering** patterns, and keep each suggestion block in its own reusable subscript.

### Outro
Outro returns the user to a normal state of awareness and decides the headspace they carry out of the session. It should be in an `<outro>` tag.

#### Post-hypnotic suggestion
Describe directly how they will feel, what they will do, and how they will think once the session ends — clear cue, simple positive present-tense response, optional identity support. Install near the end of the session and restate during emergence.

#### Emergence
Reverse the induction deliberately: count upward, suggest returning alertness, reorient the user to the present, and reinforce their sense of control and confidence. Weave the post-hypnotic restatements through the count-up. Keep emergence in its own reusable subscript.

#### Post-talk
The final word: additional encouragement and reinforcement, tips for maintaining progress, and calls to action for daily life. A `<rating>` here ("how deep were you?") logs usable data.

### Build subscripts with parallel subagents
If you want to write many different new triggers, suggestions, or induction/deepening/redeepening variants, spawn multiple subagents in parallel to build them. Each subagent gets a brief specifying what to produce and where; they work concurrently and you assemble the results.

#### Recommended grouping
| Group | What it produces | Target folder |
| --- | --- | --- |
| **Structural foundation** | Pre-talk, emergence, and the pool selectors (glob includes) | `structural/` |
| **Content pools** | Induction, deepening, and redeepening variant scripts | `content/induction_pools/`, `content/deepening_pools/`, `content/redeepening_pools/` |
| **Trigger & suggestion blocks** | Trigger install/reinforcement files and suggestion-pool files, following the Suggestion → Trigger order and the suggestion-language principles | `content/trigger_blocks/`, `content/suggestion_pools/` |
| **Session composition** | The thin composition file: `<intro>`/`<main>`/`<outro>` wrapping includes, plus session-specific framing, post-hypnotic suggestions, and post-talk | `compositions/` |

#### Process
1. **Plan the groups** based on the session's theme and complexity. Merge or split groups so you land at 2–6 total (never fewer than 2, never more than 6).
2. **Write a brief for each group** that names every file the group should create, specifies which folder it goes in, lists the key patterns to use (glob pools, Random Suggestions, Ordering), the session-arc phase each file serves, and any triggers or specializations to reference.
3. **Spawn all subagents in parallel**, passing each its brief. Do not spawn them sequentially — the whole point is concurrency.
4. **Collect the results.** After every subagent finishes, review the outputs, resolve any inconsistencies across groups, and wire the composition file together.
5. **Create the composition file** at `compositions/<session_name>.xml` and validate everything with `validate_files`, fixing every error.

This approach keeps builds fast (parallel work), keeps files small and reusable (one concern per file), and keeps sessions varied (swap pool files without touching the composition).
