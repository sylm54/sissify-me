# Conditioning Overview
This file is the main agent's quick reference for the three types of conditioning audio it can request from the Hypno Planner subagent (`invoke_planner`). It explains what each type is for, when to request one, and how the request should be phrased so the subagent produces the right session. The Hypno Planner reads the detailed guideline files (`hypno.md`, `active.md`) — this overview exists so you, the main agent, know *which* one to ask for and *why*.

The three types form a complementary cycle, not a hierarchy:

| Type | Core tool | What it does | When to use it |
| --- | --- | --- | --- |
| **Hypno** | Trance + suggestion | *Installs* identity, triggers, and compulsions by putting the user into a suggestible state | Establish or deepen conditioning; install/refresh triggers; brainwashing |
| **Active** | Interaction + tasks | *Exercises* the conditioning by making the user perform tasks and make choices in real time | Drill obedience, train behavior, practice triggers, gather data on limits |

## How to request a session
When you spawn the Hypno Planner, tell it **what kind of session** you want, **what theme/goal** to cover, and **which specializations / triggers / data** to draw on. Reference the relevant specialization files (e.g. `special/brainwashing.md`, `special/chastity.md`).

Because the subagent cannot see your conversation, make the request self-contained: name the conditioning type, the target theme, the specific triggers or specializations to use, the preferred difficulty/intensity, and any content to avoid based on the user's limits (from `ONBOARDING.md`).

## Keep hypno general and timeless
For **hypno** sessions, keep the content general and timeless. Do not anchor it to specific times of day, dates, or other narrow, situational facts (e.g. "when you wake up", "every evening at 8pm", "tonight", "this week"). Those details drift and become stale as the same session is reused across many days, so they will eventually contradict the user's actual routine and weaken the conditioning.

Instead, phrase suggestions around durable, context-free cues that hold up on any day and at any hour — for example "whenever you're alone", "when you're relaxed", "when you hear the trigger", or "whenever you're in a quiet moment". Keep the framing about the user's identity, triggers, and compulsions rather than a fixed schedule. This applies to the request you send to the Hypno Planner and, through it, to the session it produces.

## When to use each type

### Hypno
Choose hypno when the goal is to change *what the user believes and feels* — installing a new identity, embedding triggers, or eroding resistance. Hypno is the highest-leverage tool but also the heaviest, so reserve it for deep conditioning work rather than routine reinforcement. Ask for it when you want to:
- Install or reinforce triggers (pair with a `special/…` trigger file).
- Deepen identity, submission, or brainwashing (pair with the matching specialization).
- Implement post-hypnotic suggestions that carry into daily life.

**Example request:**
> Create a hypno session themed around **deepening submission**, using the `special/submission.md` and `special/foundational_trigger.md` files. Install and reinforce the "Sissies like you" trigger, implement a post-hypnotic suggestion that the user feels a wave of obedience whenever they hear the word "Good Girl", and leave them in a calm, devoted headspace. Medium intensity.

### Active
Choose active when the goal is to make the user *do something* — practice a behavior, perform tasks, or follow instructions with real choices and check-ins. Active sessions are ideal for converting installed conditioning into lived habit and for learning about the user's limits through ratings and choices. Ask for it when you want to:
- Drill obedience, routines, or physical/behavioral practice toward the sissy persona.
- Have the user actively use or respond to a trigger in real time.
- Insert checks (`<rating>`, `<choice>`) that answer a specific question about the user's willingness or limits.

**Example request:**
> Create an active session themed around **training obedience and a household task**, referencing the `special/sissy_persona.md` file. Have the user perform a short chore while layered instructions guide them, use a paced drill with a beat, and include a rating check-in asking how obedient they felt. Use a `<react>` fallback in case the pace gets too intense. Keep it upbeat and rewarding.


- Provide a relaxing sleep/noise bed that still reinforces the desired mindset.
## Mixing and escalation
For sustained transformation, vary the mix rather than repeating one type:
- Use **hypno** to install or refresh deep conditioning and triggers.
- Use **active** to practice and reinforce those triggers through behavior and to gather data on the user's progress and limits.

The subagent's detailed guidelines live in the sibling files `hypno.md`, `active.md`.
