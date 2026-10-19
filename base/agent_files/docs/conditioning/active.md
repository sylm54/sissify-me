---
description: Read before writing or substantially editing active sessions — instruction layering, drills, and interactive checkpoints that turn installed conditioning into lived behavior.
---

# Active
Active sessions are participant-driven conditioning: an audio script plays while a routine/task body runs the interaction around it. Unlike hypno, they do not put the user into trance. The listener follows instructions, performs tasks, and makes choices in real time — the audio is pure sound now (no interactive tags), so every choice, rating, and button-wait is mounted from the session body as a widget (`buttons`, `slider`, `input`, …) and synced to the audio through the script's `<zone>`/`<mark>` markers (`docs/internal/runtime-api.md`). Active sessions are at their most effective when they turn the conditioning already installed by hypno into lived, repeated behavior: every time a trigger fires or a task is performed, the association is reinforced through actual experience rather than just suggestion.

Where hypno *installs* the triggers and suggestions, active sessions *exercise* them. Active work is one of the two main places triggers fire — in trance inside a hypno session, or here, live, with the user performing (`docs/training/triggers.md`); post-hypnotic carryover into daily life is real, but session work is the main channel. Use active sessions to drill obedience, train the body and mind toward the user's sissy persona, and gather information (`buttons`/`slider` widgets) about how far the user is willing to go so future conditioning can escalate accordingly.

## Patterns
Active sessions combine two layers — the XML audio and the JS session body that orchestrates it. Mixing and layering the patterns below creates variety and keeps the user engaged.

- **Choice Branching**: Present the user with a fork and let their answer steer the session. Show a `buttons` widget in the body and branch on the answer. Branch early on preference or limits, then let the choice determine the difficulty, the task, or the reward for the rest of the session.
- **Instruction Layering**: Put instructions on a `<background>` track (or an `<overlay>` part) running beneath the main coaching line so the user is guided on two levels at once — e.g. a constant whispered directive underneath an active task. This mirrors how subliminals layer messages and keeps the user saturated.
- **Paced Drills**: Use `<loop>` in the audio for timed repetition, and a `beatmeter` widget (`bpm`, `pattern`, optionally `sync`ed to the playing script) to give the user a beat to follow — ideal for breathwork, tapping, rocking, stroking, or any movement task like workouts that benefits from a steady tempo and an on-screen meter.
- **Randomization & Ordering**: Shuffle (`<scramble>`) or randomly pick (`<random>`) between exercises, tasks, or escalation paths so no two sessions feel identical. Apply the same idea to the ordering of triggers and instructions to prevent the user from anticipating what comes next.
- **Progressive Escalation**: Build tasks in difficulty waves. Use a `buttons` check-in as a pressure valve — if they can't keep up, the body branches to an easier fallback block instead of breaking the session.
- **Audio sync**: Name the script's stretches with `<zone>`/`<mark>`, then `await handle.zone('drill')` / `handle.mark('rest')` in the body so widgets appear, change, or vanish exactly when the audio reaches that point. This is what turns a sound file into a guided session.
- **Reinforcement Through Repetition**: End exercises by re-stating the suggestion or trigger they were practicing, turning the behavioral work into a conditioned moment (pair with a trigger from `CONDITIONING.md`).
- **Router**: Use glob `<include>` patterns combined with pools of tasks, drills, and branches to build a session from a library of reusable parts. This allows you to swap out content for different themes or difficulty levels without rewriting the session structure and keep sessions varied.

## Structure
Structure the session as Intro → Main → Outro, laid out in order in the composition. Build the session from small, reusable subscripts rather than one big script.

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
│   └── escalation_paths/
└── compositions/        # thin session scripts that link to the parts they need
    └── <session_name>.xml
```

The `compositions/` folder holds the final session scripts — each one is a thin file that `<include>`s or references the structural and content files it combines, plus any session-specific glue. Do not put reusable parts directly in compositions. Branch logic is not audio: the fork lives in the session body (a `buttons` widget and the branch it triggers), and each branch draws its audio from the pools above.

### Build subscripts with parallel subagents
Do not write all subscripts yourself. Instead, organise the work into **3–5 parallel groups**, spawn one subagent per group, and have them run concurrently. Each subagent receives a clear, self-contained brief telling it exactly which files to produce, which folder to put them in, and what content they should contain.
