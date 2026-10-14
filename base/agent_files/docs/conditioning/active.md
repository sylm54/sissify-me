---
description: Read before writing or substantially editing active sessions — instruction layering, drills, and interactive checkpoints that turn installed conditioning into lived behavior.
---

# Active
Active sessions are participant-driven conditioning audio. Unlike hypno, they do not put the user into trance. The listener follows instructions, performs tasks, and makes choices in real time, and the player waits for their input at interactive checkpoints. Active sessions are at their most effective when they turn the conditioning already installed by hypno into lived, repeated behavior: every time a trigger fires or a task is performed, the association is reinforced through actual experience rather than just suggestion.

Where hypno *installs* the triggers and suggestions, active sessions *exercise* them. Active work is one of the two main places triggers fire — in trance inside a hypno session, or here, live, with the user performing (`docs/training/triggers.md`); post-hypnotic carryover into daily life is real, but session work is the main channel. Use active sessions to drill obedience, train the body and mind toward the user's sissy persona, and gather information (`<choice>`/`<rating>`) about how far the user is willing to go so future conditioning can escalate accordingly.

## Patterns
Active sessions are built from a small set of reusable patterns. Mixing and layering these creates variety and keeps the user engaged.

- **Choice Branching**: Present the user with a fork and let their answer steer the session. Use `<choice>` with `label` on each part so the player shows clear options. Branch early on preference or limits, then let the choice determine the difficulty, the task, or the reward for the rest of the session.
- **Instruction Layering**: Put instructions on a `<background>` track (or an `<overlay>` part) running beneath the main coaching line so the user is guided on two levels at once — e.g. a constant whispered directive underneath an active task. This mirrors how subliminals layer messages and keeps the user saturated.
- **Paced Drills**: Use `<loop>` and `<beatmeter>` to structure timed, rhythmic exercises. A `<beatmeter>` over a coaching block gives the user a beat to follow, which is ideal for breathwork, tapping, rocking, stroking, or any movement task like workouts that benefits from a steady tempo and an on-screen meter.
- **Randomization & Ordering**: Shuffle (`<scramble>`) or randomly pick (`<random>`) between exercises, tasks, or escalation paths so no two sessions feel identical. Apply the same idea to the ordering of triggers and instructions to prevent the user from anticipating what comes next.
- **Progressive Escalation**: Build tasks in difficulty waves. Use a `<react>` interrupt as a pressure valve — if they can't keep up, it cuts to an easier fallback instead of breaking the session.
- **Reinforcement Through Repetition**: End exercises by re-stating the suggestion or trigger they were practicing, turning the behavioral work into a conditioned moment (pair with a trigger from `CONDITIONING.md`).
- **Router**: Use glob `<include>` patterns combined with pools of tasks, drills, and branches to build a session from a library of reusable parts. This allows you to swap out content for different themes or difficulty levels without rewriting the session structure and keep sessions varied.

## Structure
Structure the session as Intro → Main → Outro using the structural markers. Build the session from small, reusable subscripts rather than one big script.

### Folder structure
Keep every subscript in a dedicated file under a consistent folder hierarchy so the session composition file can reference them by path. Organise scripts like this:

```
hypnos/active/
├── structural/          # reusable building blocks shared across sessions
│   ├── intro.xml
│   └── outro.xml
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
