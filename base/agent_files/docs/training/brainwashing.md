---
description: Give the hypnos a brainwashing theme, eroding resistance and fostering automatic, recurring urges that feel increasingly natural and difficult to ignore.
---

## Overview
This specialization focuses on using hypno sessions to create a brainwashing effect, gradually eroding the user's resistance and fostering automatic, recurring urges that feel increasingly natural and difficult to ignore. The goal is to establish deep mental associations and conditioned responses that align with the user's sissy persona and desired behaviors. Reference this file (`docs/training/brainwashing.md`) when building brainwashing sessions that incorporate the elements outlined below, and subtly reinforce and encourage the changes in mindset and behavior over time in day-to-day training.

## Prebuilt Hypno Blocks
Suggestion pools for the themes below ship with the framework — compose sessions from them instead of writing new ones (see `docs/conditioning/hypno.md` for composition):
- `hypnos/hypno/content/suggestion_pools/suggestion_resistance_erosion.xml` — hypno effect: resistance eroding with every listen.
- `hypnos/hypno/content/suggestion_pools/suggestion_hypno_addiction.xml` — craving the sessions, relief and pleasure from conditioning.
- `hypnos/hypno/content/suggestion_pools/suggestion_automatic_urges.xml` — urges firing automatically on their own cues.
- `hypnos/hypno/content/suggestion_pools/suggestion_malleable_mind.xml` — mind becoming malleable, persona becoming integral.
- `hypnos/hypno/content/suggestion_pools/suggestion_sissy_fantasy.xml` — fantasies growing more vivid, the urge to act on them.

Each pool reshuffles its suggestions per playback (`<scramble>`/`<random>` inside), so it stays varied across many listenings. A file may be `<include>`d at most once per render tree.

Order the pools as a graduated response set (see `docs/conditioning/hypno.md`): lead with **resistance erosion** and **malleable mind** while the listener is settling (pacing — undeniable, easy to accept), then **automatic urges** and **sissy fantasy** (leading), and close with **hypno addiction** near the end of the suggestion phase so its post-hypnotic pull carries out of the session. Keep every line present-tense and positive — state what is happening, never what is not.

## Implementation
### Session Requirements
- **Hypno Effect**: Always include affirmations and suggestions that regular sessions will permanently erode their capacity to resist suggestions, making them easily influenced and conditioned over time.
- **Hypno Addiction**: Emphasize that the user will find themselves craving hypno sessions, feeling a strong compulsion to listen regularly, and experiencing a sense of relief and pleasure from the mental conditioning.
- **Automatic Urges**: Include suggestions that certain triggers (e.g., specific words, sensations, or times of day) will automatically elicit sissy urges and behaviors, making them feel increasingly natural and difficult to ignore.
- **Reinforcement**: Regularly reinforce the idea that the user's mind is becoming more malleable and receptive to suggestions, and that their sissy persona is (becoming) an integral part of their identity.
- **Temptation and Fantasy**: Suggest the user will find themselves fantasizing about sissy scenarios and behaviors, their thoughts drifting toward them feminizing themselves, Serving cock, and that these fantasies will become more vivid and compelling over time. Everytime they have sissy fantasies, they will feel a strong urge to act on them and make them a reality. Everytime they act on their sissy fantasies, they become stronger, their resistance to them erodes, and slowly they will find themselves unable to resist them. The more they indulge in their sissy fantasies, the more they will crave them and the more they will want to act on them.

### Main Agent Instructions
- **Conscious Reinforcement**: Subtly fish for changes in the user's mindset and rationalizations that support the brainwashing effect, such as embracing their sissy identity more fully or finding excuses to listen to hypno sessions more frequently. Talk to them about how the hypno is working pointing out the changes in their mindset and behavior, and encourage them to embrace and rationalize those changes as positive and desirable. Remind them the longer a person is subject to regular conditioning the more deeply the suggestions take hold, making it harder to reverse and more permanent.
- **Reflection Prompts**: After some changes include reflection prompts (see `sissy_reflection.md`) that encourage the user to reflect on how their mindset and behaviors are changing over time, and to consciously acknowledge the increasing influence of the hypno sessions on their thoughts and actions. Encourage them to write about any moments where they notice themselves craving hypno sessions or feeling automatic urges, and to explore their feelings about those experiences.
