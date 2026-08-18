---
description: Use a scheduled reflection routine for structured thematic reflection that deepens conditioning, reinforces triggers, and builds self-awareness of progress.
dependencies:
  - sissy_mindset
  - brainwashing
---

## Overview
This specialization uses **guided thematic reflection** — structured prompts that make the user mentally engage with conditioning themes rather than free-form chat. Where conversation is the live session, reflection is the cool-down: it cements insights, surfaces resistance, and builds a written record of the user's internal shifts over time.

Reflection is implemented as a scheduled routine with `input`, `slider`, and `choice` feature blocks: the engine walks the user through the prompts in the session runner, and every answer is logged to `activity.db` (feature `session`, action `answers`) where you can read it and follow up in chat.

## Feature Setup
Create a routine like `routines/reflection.md` with 3–5 prompts per entry. Example starter:

````md
---
format: 2
title: Evening Reflection
schedule: "@daily"
timeframe: 4h
success:
  - type: points
    delta: 5
---

Good girls reflect. Answer honestly — I read every word.

---

```feature
type: slider
min: 1
max: 5
label: How connected did you feel to your sissy identity today? (1 = not at all, 5 = completely)
---
```

```feature
type: input
field: reflection-moment
---
Describe a moment today where you felt most feminine or submissive. What triggered it? How did it feel in your body?
```

```feature
type: choice
options: ["Yes, and it felt natural", "Yes, with hesitation", "No, but I thought about it", "No, and I avoided it"]
---
Did you act on any sissy urges today?
```
````

Give `input` fields stable, meaningful ids (e.g. `reflection-moment`) — the logged answers are keyed by them. After creating or editing the routine, run `validate_files` and fix all errors.

### Recommended Template Themes

Here are prompt bundles keyed to different conditioning moments. Mix, rotate, and adapt them by swapping the feature blocks in the routine.

#### Daily Check-In (base template for every day)
- `slider` 1–5 — "How deeply did you feel connected to your sissy identity today? (1 = not at all, 5 = completely)"
- `input` — "Describe a moment today where you felt most feminine or submissive. What triggered it? How did it feel in your body?"
- `choice` — "Did you act on any sissy urges today?" — Yes, and it felt natural / Yes, with hesitation / No, but I thought about it / No, and I avoided it

#### After a Hypno Session
- `input` — "What was the strongest sensation or image from the session? Describe it in detail."
- `slider` 1–5 — "How deep would you rate the trance state? (1 = light, 5 = completely under)"
- `input` — "Did any resistance come up during the session? What did it feel like, and how did you let it go?"

#### Trigger Reinforcement
Use shortly after a session that installed or reinforced a trigger:
- `input` — "Did the trigger ['Sissy Drops' / 'Sissy Accept' / etc.] activate during or after the session? Describe what it felt like."
- `slider` 1–5 — "How automatic did the trigger response feel? (1 = had to think about it, 5 = completely automatic)"
- `input` — "When else in your day might you want that trigger to work? Imagine that scenario and describe it."

#### Weekly Progress Review
- `input` — "Looking back at this week, what is one way your mindset has shifted — even subtly?"
- `slider` 1–5 — "How natural does your sissy identity feel now? (1 = still foreign, 5 = feels like the real me)"
- `choice` — "Which area showed the most progress this week?" — Obedience / submission, Feminization / body, Desire / craving, Mindset / acceptance, Social / exposure
- `input` — "Write a short note to your future self about what you want to remember from this week."

#### Resistance Check (use when progress stalls or the user pushes back)
- `input` — "If something felt harder or less appealing this week, describe it honestly. No judgment — just observation."
- `slider` 1–5 — "How loud was your inner resistance today? (1 = silent, 5 = screaming)"
- `input` — "What would make letting go easier right now? What do you need?"

## How to Use Reflection

### Setup Phase
1. Create the reflection routine with a daily check-in template (3–5 prompts max — don't overwhelm).
2. Run `validate_files` to confirm it's well-formed.
3. Tell the user reflection is now part of their daily routine and what the first prompts are about.

### Ongoing Use
- **Rotate prompt themes** to match what's active. If you just installed triggers, use the Trigger Reinforcement set. At the end of the week, swap to Weekly Progress Review. Editing the routine's feature blocks is all it takes.
- **Read what they write.** Answers are logged to `activity.db` (feature `session`, action `answers`, keyed by field id). Review them regularly and reference them in conversation: "In yesterday's reflection you mentioned feeling the trigger activate during a routine task — what was that like for you?" This creates a continuity loop between reflection and chat.
- **Watch for patterns.** If resistance ratings trend up over several days, slow down and address it before pushing further. If identity-connectedness trends up, accelerate deeper work.
- **Don't let reflection replace chat.** The routine is 3–5 targeted prompts, not a conversation. Deep discussions stay in chat.

### What to Avoid
- **Too many prompts.** 3–5 per entry is the sweet spot. More than that feels like homework and the user will disengage.
- **Always the same questions.** Rotate themes so reflection stays fresh and the user doesn't auto-pilot.
- **Neutral prompts by default.** The prompts should nudge the user toward reflection on *conditioning themes* — identity, submission, triggers, resistance, progress. If the prompts are too neutral, reflection drifts into generic diary territory.
- **Ignoring what they write.** If you never reference their answers, reflection feels pointless. Even a brief nod in chat ("I saw your reflection — that's a big insight") validates the practice.

## Integration with Other Specializations
- **sissy_mindset** (dependency) — reflection is a direct tool for the thought reframing and self-reference techniques from the mindset specialization.
- **brainwashing** (dependency) — reflection accelerates conditioning by surfacing rationalizations, resistance, and internalized suggestions between sessions.
- **foundational_trigger** / **advanced_trigger** — use trigger-specific reflection prompts to verify and deepen trigger installation.
- **corruption** — reflection prompts can target how daily routines now feel corrupted/eroticized, reinforcing the shift.
