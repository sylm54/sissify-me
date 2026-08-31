---
description: Active session guidelines — instruction layering, drills, and interactive checkpoints that turn installed conditioning into lived behavior.
---

# Active
Active sessions are participant-driven conditioning audio. Unlike hypno, they do not put the user into trance — they put the user to work. The listener follows instructions, performs tasks, and makes choices in real time, and the player waits for their input at interactive checkpoints. Active sessions are at their most effective when they turn the conditioning already installed by hypno into lived, repeated behavior: every time a trigger fires or a task is performed, the association is reinforced through actual experience rather than just suggestion.

Where hypno *installs* the triggers and suggestions, active sessions *exercise* them. Use active sessions to drill obedience, train the body and mind toward the user's sissy persona, and gather information (`<choice>`/`<rating>`) about how far the user is willing to go so future conditioning can escalate accordingly.

## Patterns
Active sessions are built from a small set of reusable patterns. Mixing and layering these creates variety and keeps the user engaged.

- **Choice Branching**: Present the user with a fork and let their answer steer the session. Use `<choice>` with `label` on each part so the player shows clear options. Branch early on preference or limits, then let the choice determine the difficulty, the task, or the reward for the rest of the session.
- **Rating Check-ins**: Use `<rating>` to turn the session into a live assessment. Ask the user to rate their arousal, focus, obedience, or honesty mid-session. Rated values are recorded to the activity log, so these double as a data-gathering tool for escalating future conditioning.
- **Instruction Layering**: Put instructions on a `<background>` track (or an `<overlay>` part) running beneath the main coaching line so the user is guided on two levels at once — e.g. a constant whispered directive underneath an active task. This mirrors how subliminals layer messages and keeps the user saturated.
- **Paced Drills**: Use `<loop>` and `<beatmeter>` to structure timed, rhythmic exercises. A `<beatmeter>` over a coaching block gives the user a beat to follow, which is ideal for breathwork, tapping, rocking, stroking, or any movement task like workouts that benefits from a steady tempo and an on-screen meter.
- **Randomization & Ordering**: Shuffle (`<scramble>`) or randomly pick (`<random>`) between exercises, tasks, or escalation paths so no two sessions feel identical. Apply the same idea to the ordering of triggers and instructions to prevent the user from anticipating what comes next.
- **Progressive Escalation**: Build tasks in difficulty waves, checking in between them (`<until>`/`<rating>`) so the user can signal capacity. Use a `<react>` interrupt as a pressure valve — if they can't keep up, it cuts to an easier fallback instead of breaking the session.
- **Reinforcement Through Repetition**: End exercises by re-stating the suggestion or trigger they were practicing, turning the behavioral work into a conditioned moment (pair with a trigger from `CONDITIONING.md`).

## Structure
Structure the session as Intro → Main → Outro using the structural markers. Build the session from small, reusable subscripts rather than one big script.

### Folder structure
Keep every subscript in a dedicated file under a consistent folder hierarchy so the session composition file can reference them by path. Organise scripts like this:

```
hypnos/active/
├── structural/          # reusable building blocks shared across sessions
│   ├── intro.xml
│   ├── outro.xml
│   ├── warmup.xml
│   └── reinforcement.xml
├── content/             # session-specific content that can be swapped per theme
│   ├── task_pools/      # individual task description files
│   ├── drill_blocks/    # paced drill definition files
│   ├── choice_branches/ # choice-branch definition files
│   └── escalation_paths/
└── compositions/        # thin session scripts that link to the parts they need
    └── <session_name>.xml
```

The `compositions/` folder holds the final session scripts — each one is a thin file that `<include>`s or references the structural and content files it combines, plus any session-specific glue. Do not put reusable parts directly in compositions.

### Build subscripts with parallel subagents
Do not write all subscripts yourself. Instead, organise the work into **3–5 parallel groups**, spawn one subagent per group, and have them run concurrently. Each subagent receives a clear, self-contained brief telling it exactly which files to produce, which folder to put them in, and what content they should contain.

#### Recommended grouping
| Group | What it produces | Target folder |
| --- | --- | --- |
| **Structural foundation** | Intro, outro, warm-up/grounding, reinforcement subscripts | `structural/` |
| **Task & drill pools** | A set of task description files, drill block files, and any `<beatmeter>`/`<loop>` paced drill definitions | `content/task_pools/`, `content/drill_blocks/` |
| **Choice & escalation paths** | Choice-branch definitions and escalation-path files (easy, medium, hard variants) | `content/choice_branches/`, `content/escalation_paths/` |
| **Session composition** | The thin composition file that `<include>`s the parts above plus any session-specific glue | `compositions/` |

#### Process
1. **Plan the groups** based on the current session's theme and complexity. Merge or split groups so you land at 2–6 total (never fewer than 2, never more than 6).
2. **Write a brief for each group** that names every file the group should create, specifies which folder it goes in, lists the key patterns to use (from the Patterns section above), and notes any triggers or specializations to reference.
3. **Spawn all subagents in parallel**, passing each its brief. Do not spawn them sequentially — the whole point is concurrency.
4. **Collect the results.** After every subagent finishes, review the outputs, resolve any inconsistencies across groups, and wire the composition file together.
5. **Create the composition file** at `compositions/<session_name>.xml` that links to the produced structural, task, and choice subscripts.

This approach keeps builds fast (parallel work), keeps files small and reusable (one concern per file), and keeps sessions varied (swap content files without touching the composition).

### Intro
Set the stage: tell the user what the session will make them do, how to prepare (posture, focus, props, privacy), and what they should be ready to feel. This is your only chance before the work begins, so it should build anticipation and secure their willingness to comply. Wrap it in an `<intro>` tag.

### Main
The body of the session. It should move through distinct phases rather than being a flat sequence:

#### Warm-up / Grounding
Start with something easy and low-stakes to establish compliance and get the user in a responsive, aroused mindset. This is a good place for a casual `<choice>` warm-up, a light paced drill, or a first `<rating>` to set a baseline.

#### Core Tasks
The central exercises that put the user's sissy conditioning into action. This is where you layer instructions, run paced drills, and cycle through randomized exercises. Keep the user guessing with `<random>`/`<scramble>`, and keep instructions layered beneath the main line to maintain immersion.

#### Escalation & Branching
Raise the intensity based on the user's answers. This phase should feel like it *earned* its difficulty — it builds directly on what the user chose or rated earlier. Use `<choice>` to gate escalation on their consent, so the session can adapt gracefully instead of pushing them past it.

#### Reinforcement
What the user just did should land as conditioning. Re-state the behavior as something they want and are becoming, pair it with any triggers they practiced, and make them feel proud of their compliance ("good girl / good sissy"). This phase turns exercise into identity.

### Outro
Wind the user down and consolidate the work. Reinforce the behaviors they performed, seed a call to action for daily life, and close with a soft landing. Wrap it in an `<outro>` tag. A final `<rating>` here captures how effective the session felt and feeds the main agent's future planning.

For moderate-length sessions, revisit the Hypno Agent's pattern of interspersing short re-grounding moments throughout the Main so the user stays present and focused rather than drifting or fatiguing.
