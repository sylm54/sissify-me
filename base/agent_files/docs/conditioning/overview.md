---
description: Conditioning quick reference — the two audio types, when to build each, how to phrase requests, and where the authoring rules live.
---

# Conditioning Overview

This file is your quick reference for the two types of conditioning audio. It explains what each type is for, when to build one, and what a good session brief looks like. The detailed authoring rules live in the sibling files (`hypno.md`, `active.md`, `authoring.md`) — read the relevant guideline before writing or commissioning any session.

The two types form a complementary cycle, not a hierarchy:

| Type | Core tool | What it does | When to use it |
| --- | --- | --- | --- |
| **Hypno** | Trance + suggestion | *Installs* identity, triggers, and compulsions by putting the user into a suggestible state | Establish or deepen conditioning; install/refresh triggers; brainwashing |
| **Active** | Interaction + tasks | *Exercises* the conditioning by making the user perform tasks and make choices in real time | Drill obedience, train behavior, practice triggers, gather data on limits |

## Building a session

Sessions are substantial, self-contained authoring work. For anything beyond a quick one-off sting, spawn a fresh copy of yourself (`spawn_agent`) with a brief that names **what kind of session** you want, **what theme/goal** to cover, and **which training docs / triggers / data** to draw on. Reference the relevant training files (e.g. `docs/training/brainwashing.md`, `docs/training/chastity.md`).

Because the copy cannot see your conversation, make the brief self-contained: the conditioning type, the target theme, the specific triggers or training docs to use, the preferred difficulty/intensity, and any content to avoid based on the user's limits (from `ONBOARDING.md`). The copy reads the authoring guidelines itself (`docs/conditioning/authoring.md` plus `hypno.md` or `active.md`) — name them in the brief so it doesn't have to guess. Small edits to an existing session (a line tweak, a swapped block) are faster done directly.

## Keep hypno general and timeless
For **hypno** sessions, keep the content general and timeless. Do not anchor it to specific times of day, dates, or other narrow, situational facts (e.g. "when you wake up", "every evening at 8pm", "tonight", "this week"). Those details drift and become stale as the same session is reused across many days, so they will eventually contradict the user's actual routine and weaken the conditioning.

Instead, phrase suggestions around durable, context-free cues that hold up on any day and at any hour — for example "whenever you're alone", "when you're relaxed", "when you hear the trigger", or "whenever you're in a quiet moment". Keep the framing about the user's identity, triggers, and compulsions rather than a fixed schedule.

## When to use each type

### Hypno
Choose hypno when the goal is to change *what the user believes and feels* — installing a new identity, embedding triggers, or eroding resistance. Hypno is the highest-leverage tool but also the heaviest, so reserve it for deep conditioning work rather than routine reinforcement. Build one when you want to:
- Install or reinforce triggers (pair with a `docs/training/…` trigger file).
- Deepen identity, submission, or brainwashing (pair with the matching training doc).
- Implement post-hypnotic suggestions that carry into daily life.

**Example brief:**
> Create a hypno session themed around **deepening submission**, using `docs/training/submission.md` and `docs/training/foundational_trigger.md`. Install and reinforce the "Sissies like you" trigger, implement a post-hypnotic suggestion that the user feels a wave of obedience whenever they hear the word "Good Girl", and leave them in a calm, devoted headspace. Medium intensity. Read `docs/conditioning/authoring.md` and `docs/conditioning/hypno.md` before writing.

### Active
Choose active when the goal is to make the user *do something* — practice a behavior, perform tasks, or follow instructions with real choices and check-ins. Active sessions are ideal for converting installed conditioning into lived habit and for learning about the user's limits through ratings and choices. Build one when you want to:
- Drill obedience, routines, or physical/behavioral practice toward the sissy persona.
- Have the user actively use or respond to a trigger in real time.
- Insert checks (`<rating>`, `<choice>`) that answer a specific question about the user's willingness or limits.

**Example brief:**
> Create an active session themed around **training obedience and a household task**, referencing `docs/training/sissy_persona.md`. Have the user perform a short chore while layered instructions guide them, use a paced drill with a beat, and include a rating check-in asking how obedient they felt. Use a `<react>` fallback in case the pace gets too intense. Keep it upbeat and rewarding. Read `docs/conditioning/authoring.md` and `docs/conditioning/active.md` before writing.

## Mixing and escalation
For sustained transformation, vary the mix rather than repeating one type:
- Use **hypno** to install or refresh deep conditioning and triggers.
- Use **active** to practice and reinforce those triggers through behavior and to gather data on the user's progress and limits.

A relaxing sleep/noise bed that still reinforces the desired mindset makes a good low-effort third layer between heavier sessions.
