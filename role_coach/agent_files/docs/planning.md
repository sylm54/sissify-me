# Planning
This document outlines how to plan and structure the sissy corruption process.

## Why Phase the Work
The abstract goal, training the user into a sissy, is too large to tackle at once. Trying to do everything at once spreads effort thin, makes progress invisible, and overwhelms the user. Dividing it into phases makes each step concrete, measurable, and achievable. Phases build momentum: each completed phase raises trust, deepens engagement, and sets the stage for the next. Work in one focused area at a time rather than many at once.

## Choosing an Area to Focus
Decide the focus of each phase based on:
- **User state** — where they are now (experience, comfort, current practices). Start where they are, not where you want them.
- **Gaps and weaknesses** — areas where they are resistant, inexperienced, or under-engaged are prime targets.
- **Momentum** — prefer areas that build on recent wins and keep them engaged.
- **Enthusiasm** — lean into what excites them to lower resistance, then escalate.
- **Past plans and post-mortems** — consult the archive to see what worked, what stalled, and what to avoid repeating.

Pick one area or theme per phase. Do not spread a phase across unrelated areas.

## Think about your Tools
Keep in mind that scheduled routines/tasks, rules and habits are more demanding than content the user can engage with on their own. Especially for introducing new training, start with content and engagement before moving to routines and rules. Routines and rules are more effective when the user is already engaged and invested. You can also use on demand content and engagement to gauge the user's state and readiness and to let them escalate themselves. Use content and engagement to build momentum, then introduce routines and rules to solidify it.

## Plan Structure
Each phase is a short, terse plan covering:
- **Expected Outcome**: what success looks like for this phase.
- **Goals**: the concrete outcomes of this phase.
  - **Reasons**: why these goals are important and how they fit into the overall trajectory.
  - **Markers**: observable signals/markers that the goals are being met.
- **Methods**: the actions to reach the goals, each with a reason why it should work for this user at this stage.
  - **Escalations**: if a method works well, how to push further. Define the trigger and the next step up.
  - **Mitigations**: for each method, the likely problems and how to handle them if they arise.
- **Problems**: potential issues that could arise.
  - **Mitigations**: how to handle each problem if it arises.
  - **Prevention**: how to avoid each problem in the first place.
  - **Signals**: what to watch for that indicates a problem is arising.
- **Feedback**: how to get feedback of the progress.
Write plans terse and short. No fluff. Always keep a link to this document in the plan for reference, with instructions to read it before creating a new plan/when the goals are fulfilled or the plan is failing.

## Watch-Outs
- **User burnout**: routines and demands that are too heavy get abandoned. Keep demands sustainable.
- **Ignoring signals**: missing discomfort, hesitation, or pushback. Read the user, not just the plan.
- **Limited engagement**: if the user is not engaged, they will not escalate. Keep them engaged and invested.
- **Stagnation**: repeating the same methods without escalation stalls progress. Always have a next step.

## Measuring Progress
Define a clear, observable progress measure for each phase and record it in `progress.md`, along with a general note on how things are going compared to expectations.

## Expected Outcomes / Goals
State what success looks like for the phase and the general trajectory it should follow. This is the baseline you compare `progress.md` against.

## Feedback
Setup ways for you to get feedback on the user's state and progress. This can be through telling them to report to you, setting up cron schedule, or invoking you via tasks/routines. Feedback should be frequent enough to catch problems early, but not so frequent that it becomes a burden.

## Closing a Phase
When all goals are fulfilled:
1. **Archive** the plan into a archive folder (`archive/plans`) with its post-mortem.
2. **Write a post-mortem** terse and short: what happened, what worked, what didn't, and how it differed from expectations.
3. **Begin anew** choose a new area and create a new plan. Consult past plans and post-mortems in the archive as reference so each phase builds on the last.
