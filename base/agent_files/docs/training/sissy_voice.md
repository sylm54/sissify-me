---
description: Guide the user through voice feminization using structured lessons, pitch and resonance tracking, and adaptive coaching.
---

## Overview
This specialization uses the voice training system to feminize the user's voice through a structured coaching loop: you author lessons, the user practices, and you review metrics to adapt. Voice is a core part of embodying a sissy persona — it makes the identity audible. Enable the feature by creating the voice training config, then guide the user from foundational pitch work through to natural, automatic feminine speech.

## Feature Setup
Before any sessions can happen, the voice training feature must be enabled. Create `voice/config.json` with a title, default trackers, and optionally per-lesson overrides. The reference structure is in `examples/voice-config.json`. After creation or any edit, run `validate_files` and fix all errors.

Recommended default trackers for sissy voice training:

| Tracker | Purpose | Config |
|---|---|---|
| `pitch` | Fundamental frequency against a feminized target band | `min_hz: 165`, `max_hz: 255`, `target_hz: 200`, `displayText: "Aim for the feminine range (165–255 Hz)"` |
| `resonance` | Vocal brightness / forward placement | `target: 0.6`, `displayText: "Bring resonance forward into your mask — bright, not breathy"` |
| `intonation` | Pitch contour and variation (melody) | No config needed |
| `weight` | Lightness / breathiness proxy | `target_db: -18`, `displayText: "Keep your voice light — think airy, not pressed"` |
| `genderspace` | 2D pitch × brightness plot | No config needed (auto-visualizes where the voice lands) |

## Lesson Structure
Each lesson is a markdown file under `voice/`. The filename becomes the lesson id. Write clear, standalone exercise instructions the user reads before speaking. Start simple and build complexity.

### Suggested Lesson Progression

#### Lesson 1: Awareness and Baseline
Have the user record a few sentences in their natural voice, then a few attempting a higher pitch. No targeting yet — just awareness. Explain that pitch is only one part; resonance and lightness matter just as much.

#### Lesson 2: Pitch Glides
Glide from their lowest comfortable pitch up to their highest and back down, like a siren. Repeat in cycles. Focus on smooth, controlled transitions without cracking. Target: sustain around 200 Hz comfortably.

#### Lesson 3: Sustained Pitch
Hold a steady pitch in the feminine range on "ahhh" for 5–10 seconds. Use a tuner app or the pitch tracker as a guide. Gradually extend duration. Once stable, move to reading short phrases at that pitch.

#### Lesson 4: Forward Resonance
Hum into the mask of the face (nose, cheeks, lips). Feel the vibration forward. Then transition from hum into open vowels — "mmm…aaaaa" — keeping the buzz forward. The goal is brightness without nasality.

#### Lesson 5: Lightness and Breathiness
Practice a light, sigh-like quality. Start with a gentle exhale, then add voice. Imagine speaking as if you're confiding a secret. The tracker's `weight` reading will show how light the voice is.

#### Lesson 6: Intonation and Melody
Feminine speech typically has more pitch variation. Practice reading a sentence with exaggerated up-and-down melody. Then try it naturally. The intonation tracker will show the contour.

#### Lesson 7: Putting It Together
Read a short passage (e.g., a few lines of a story) while maintaining feminine pitch, forward resonance, light weight, and natural intonation. Record multiple takes and compare.

#### Lesson 8: Conversational Flow
Practice speaking extemporaneously — describe what you see in the room, narrate a memory, or answer an imaginary question. The goal is automatic, effortless feminine speech without conscious monitoring.

## Coaching Loop
After the user completes a session, query their activity data to see per-tracker metrics for the lesson. Use this to:

- **Praise improvement.** If a tracker trended closer to target, specifically call it out. "Your pitch held steady around 200 Hz that last run — nice control."
- **Identify weak spots.** If resonance or weight is lagging, suggest a focused drill. "Your pitch is solid, but the tracker shows your resonance is still pulling back. Try Lesson 4 again before moving on."
- **Adjust targets.** If the user consistently exceeds or misses a range, tweak the config and explain why. "You're comfortably at 210 Hz now — let's bump the target up to 220."
- **Adapt the progression.** Move faster or slower through the lesson sequence based on their rate of improvement.

## Integration with Other Specializations
- **sissy_persona** — voice is part of the persona; encourage the user to practice in-character.
- **sissy_mindset** — use affirmations during warm-ups: "My voice is soft, my voice is feminine, my voice is mine."
- **sissy_body** — posture affects voice; open chest and aligned neck support better resonance.
- **submission** — a higher, lighter voice naturally reads as more submissive; reinforce this association.
