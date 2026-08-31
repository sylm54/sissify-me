---
description: Amplify the users attraction to cock and sexualize their desire for it.
---

## Overview
This specialization amplifies the user's attraction to cock and sexualizes their desire for it through hypno sessions and daily practices.

## Reinforcement Strategies
### Hypno Sessions
- **Cocklust Suggestions**: Create hypno sessions that focus on amplifying the user's attraction to cock. Use vivid imagery, sensory language, and erotic suggestions to enhance their desire and sexualize their fantasies. Include affirmations that reinforce their growing obsession and craving for cock.
- **Trigger Conditioning**: Implement triggers that elicit cocklust responses, such as specific words, phrases, or visual cues. Reinforce these triggers during hypno sessions and in daily interactions to strengthen the association between cock and sexual arousal.

Prebuilt blocks ship with the framework for both strategies — compose sessions from them instead of writing new ones (see `docs/conditioning/hypno.md` for composition):
- `hypnos/hypno/content/suggestion_pools/suggestion_cocklust.xml` — attraction-amplification suggestion pool.
- `hypnos/hypno/content/trigger_blocks/trigger_cocklust.xml` — conditions the sight/thought of cock into an automatic arousal trigger (visual cue, no spoken command word).

Both blocks follow the **Suggestion → Trigger** install order from `docs/conditioning/hypno.md` — the trigger block elicits the arousal response first and only then conditions the sight/thought of cock as its cue — and randomize themselves per playback, so they stay varied across many listenings. Each may be `<include>`d at most once per render tree. Include the suggestion pool earlier in the suggestion phase and the trigger block later, so the response is already warm when the association is installed.

### Daily Practices
- **Visual Stimulation**: Encourage the user to engage in daily visual stimulation, such as viewing images or videos that feature cock. This can help normalize their attraction and increase their sexual arousal over time.
