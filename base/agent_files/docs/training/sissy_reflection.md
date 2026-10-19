---
description: Read when setting up or running the reflection routine — structured thematic reflection that deepens conditioning, reinforces triggers, and builds self-awareness of progress.
dependencies:
  - sissy_mindset
  - brainwashing
---

## Overview
This specialization uses **guided thematic reflection** — structured prompts that make the user mentally engage with conditioning themes rather than free-form chat. Where conversation is the live session, reflection is the cool-down: it cements insights, surfaces resistance, and builds a written record of the user's internal shifts over time.

Reflection is implemented as a scheduled routine whose body walks the user through the prompts: `input` widgets capture written answers, `slider` widgets capture ratings, a `buttons` widget can let them pick the theme. Read each answer off the widget handle and persist it with `await log('session', 'answers', { … })` so it lands in `activity.db`, where you can read it and follow up in chat.

## How to Use Reflection

### Setup Phase
1. Create the reflection routine with a daily check-in template (3–5 prompts max — don't overwhelm).
2. Run `validate_files` to confirm it's well-formed.
3. Tell the user reflection is now part of their daily routine and what the first prompts are about.

### Ongoing Use
- **Rotate prompt themes** to match what's active. If you just installed triggers, use the Trigger Reinforcement set. At the end of the week, swap to Weekly Progress Review. Editing the routine's body is all it takes.
- **Read what they write.** Answers reach `activity.db` through the `log` calls in the routine body — key them by prompt id so entries stay queryable. Review them regularly and reference them in conversation: "In yesterday's reflection you mentioned feeling the trigger activate during a routine task — what was that like for you?" This creates a continuity loop between reflection and chat.
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
- **triggers** — use trigger-specific reflection prompts to verify and deepen trigger installation.
- **corruption** — reflection prompts can target how daily routines now feel corrupted/eroticized, reinforcing the shift.
