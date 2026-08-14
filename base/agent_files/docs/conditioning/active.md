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
Structure the session as Intro → Main → Outro using the structural markers. Build the session from small, reusable subscripts rather than one big script: keep shared structural parts (intro, outro, warm-up, reinforcement) in reusable files so every session links to the same ones, and keep the content parts (task pools, drill blocks, choice branches, escalation paths) in their own files so they can be swapped, extended, and updated independently. The final session script should be a thin composition file that links to the parts it needs plus any session-specific glue. Build subscripts with subagents.

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
