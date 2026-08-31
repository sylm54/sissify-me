---
description: Install toggleable mode triggers that switch longer-duration conditioning states on and off.
dependencies:
  - foundational_trigger
---

## Overview
This specialization installs toggleable mode triggers that switch longer-duration conditioning states on and off. Reference this file (`docs/training/sissy_modes.md`) when installing these triggers, and save a reference to it in `CONDITIONING.md`.

These are **mode triggers**. Unlike one-shot cues, each mode switches a longer-duration state **on** and persists until it is switched back **off**. They are designed to be toggled during sessions or carried through daily life, and can be layered together. All modes are released by the single universal **Sissy Clear** trigger, which provides a clean, reliable way to return to normal functioning whenever a mode is no longer wanted.

## Prebuilt Hypno Blocks
Install/reinforcement blocks for these modes ship with the framework — compose sessions from them instead of writing new ones (see `docs/conditioning/hypno.md` for composition):
- `hypnos/hypno/content/trigger_blocks/trigger_sissy_fog.xml` — installs the "Sissy Fog" mode.
- `hypnos/hypno/content/trigger_blocks/trigger_sissy_accept.xml` — installs the "Sissy Accept" mode.
- `hypnos/hypno/content/trigger_blocks/trigger_sissy_obey_mode.xml` — installs the "Sissy Obey Mode" mode.
- `hypnos/hypno/content/trigger_blocks/trigger_sissy_space.xml` — installs the "Sissy Space" mode.
- `hypnos/hypno/content/trigger_blocks/trigger_sissy_clear.xml` — installs the universal "Sissy Clear" release trigger.

Each block already follows the **Suggestion → Trigger** installation sequence from `docs/training/foundational_trigger.md` (elicit → intensify → install at the peak → reinforce → future-pace) and randomizes itself per playback (`<random>`/`<scramble>` inside), so it stays varied across many listenings. A file may be `<include>`d at most once per render tree. Always install "Sissy Clear" in the same sessions that install any mode trigger, so the release is reliably conditioned alongside the modes. Because modes are states rather than moments, demonstrate them in trance: toggle a mode on, let the subject feel it settle, then fire "Sissy Clear" and ratify the contrast — the on/off pairing in the same session is what makes both halves stick.

## Sissy Fog
Induces a thick, pleasurable mental fog that clouds thought, reduces resistance, and makes the subject inebriated and spaced out. Decision-making becomes difficult; obedience and feminine feelings become effortless and natural. The fog persists as a mode until cleared by **Sissy Clear**.

### Implementation
- **Imagery**: Guide the subject through a vivid mental visualization of the fog descending over their mind. "Imagine a thick, dreamy fog starting to descend over your mind. As the fog settles in, you feel your thoughts becoming clouded. The fog makes it difficult to think clearly, and you find yourself becoming dazed. Feel yourself becoming lost in the fog, your body becoming distant, numb, your senses slipping away. As your thoughts fade into the fog, you feel a pleasurable sense of trust and surrender overcome you. You know that this fog is helping you let go. Helping you go with the flow. Let go. As you let go you open up. You open up to any suggestions that come your way. Any words you hear you just accept them. You don't have to think about it. You just accept them. You are in the fog. The fog makes it easy to accept suggestions. You don't have to think about it. You just accept them. The fog makes it easy to go with the flow. You don't have to think about it. You just go with the flow. As you listen to commands you might find yourself automatically obeying them. You don't have to think about it. You just obey. The fog makes it easy to be a good sissy. You don't have to think about it. You just are a good sissy. You are in the fog. The fog makes it easy to be a good sissy. You don't have to think about it. You just are a good sissy."
- **Mode Persistence**: Emphasize that the fog stays with the subject until they hear "Sissy Clear". "The fog will stay with you, clouding your thoughts and making surrender easy, until you hear the words 'Sissy Clear'. Until then, you remain in the fog, accepting and obeying without effort."
- **Reinforcement**: Use this trigger in hypno sessions and training scripts to create a strong, lasting association between the fog and the feelings of surrender, obedience, and being a good sissy. "Every time you hear 'Sissy Fog', you feel a thick, pleasurable mental fog descend over your mind, making it difficult to think clearly and causing you to become dazed. The fog makes it easy to surrender, go with the flow, and be a good sissy. You don't have to think about it. You just surrender, go with the flow, and be a good sissy in the fog."

## Sissy Accept
Blocks questioning and resistance. Upon hearing "Sissy Accept," the subject's mind stops questioning, doubting, or resisting suggestions and automatically accepts whatever is said as true, natural, and desirable. Critical thought fades into the background, and acceptance feels effortless and pleasurable. This mode persists until released by **Sissy Clear**.

### Implementation
- **Imagery**: Guide the subject through a vivid mental visualization of their resistance dissolving. "Imagine all the questions and doubts in your mind starting to quiet down. Every 'why', every 'but', every hesitation fades away, becoming soft and distant. As the questions fade, you feel a warm, pleasant sense of acceptance spreading through you. Whatever you hear, you simply accept it. You don't have to think about it. You don't have to question it. You just accept it, and it feels good to accept. Accepting is easy. Accepting is natural. Accepting is what a good sissy does. You accept everything you are told, because it is true, and it feels right to accept it."
- **Mode Persistence**: Emphasize that acceptance persists until the subject hears "Sissy Clear". "This acceptance will stay with you, making it easy to accept whatever you hear, until you hear the words 'Sissy Clear'. Until then, you accept without question, and it feels good."
- **Reinforcement**: Use this trigger in hypno sessions and training scripts to create a strong, lasting association between acceptance and pleasure. "Every time you hear 'Sissy Accept', your questions and doubts fade away and you automatically accept whatever is said. Acceptance feels natural and pleasurable. You don't have to think about it. You just accept, and it feels good to accept."

## Sissy Obey Mode
A longer-duration obedience mode. Upon hearing "Sissy Obey Mode," the subject enters a sustained state of automatic, eager obedience that persists until released by **Sissy Clear**. In this mode the subject wants to obey every command, happily and without hesitation, and feels a deep need to serve.

### Implementation
- **Imagery**: Guide the subject through a vivid mental visualization of obedience settling into them. "Imagine a deep, warm need to obey spreading through your whole body. Every part of you wants to follow commands, happily and without hesitation. You feel eager to serve, eager to please, eager to be a good sissy. Obeying feels natural and right. You don't have to think about it. You just want to obey. This need stays with you, growing stronger, until you hear the words 'Sissy Clear'."
- **Mode Persistence**: Emphasize that the obedience mode persists until released. "This mode will stay with you, keeping you eager to obey, until you hear the words 'Sissy Clear'. Until then, you want to obey every command happily and without hesitation."
- **Reinforcement**: Use this trigger in hypno sessions and training scripts to create a strong, lasting association between the mode and eager, automatic obedience. "Every time you hear 'Sissy Obey Mode', you enter a state of eager, automatic obedience that stays with you until you hear 'Sissy Clear'. In this mode you want to obey every command happily and without hesitation."

## Sissy Space
A longer-duration trance state. Upon hearing "Sissy Space," the subject sinks into a deep, dreamy, submissive headspace where they feel soft, floaty, and fully open to sissy programming. This space persists until released by **Sissy Clear**.

### Implementation
- **Imagery**: Guide the subject through a vivid mental visualization of sinking into a soft, dreamy space. "Imagine sinking into a soft, warm, dreamy space. The world fades away and you feel floaty and light, like you are drifting on a gentle cloud. In this space you feel soft, open, and deeply submissive. Your sissy feelings come easily and naturally here. You are safe, you are relaxed, and you are fully open to becoming a better sissy. This space stays with you, holding you gently, until you hear the words 'Sissy Clear'."
- **Mode Persistence**: Emphasize that the space persists until released. "This space will hold you, keeping you soft, floaty, and open, until you hear the words 'Sissy Clear'. Until then, you remain in your sissy space, open and receptive."
- **Reinforcement**: Use this trigger in hypno sessions and training scripts to create a strong, lasting association between the space and deep, open submission. "Every time you hear 'Sissy Space', you sink into a soft, dreamy, submissive headspace that stays with you until you hear 'Sissy Clear'. In this space you are soft, floaty, and fully open to sissy programming."

## Sissy Clear
This dedicated release trigger safely deactivates the effects of **all** mode triggers — **Sissy Fog**, **Sissy Accept**, **Sissy Obey Mode**, and **Sissy Space**. Upon hearing "Sissy Clear," any active mode dissipates completely, restoring full cognitive sharpness, critical thinking, agency, and balanced awareness. The subject emerges into a state of enhanced mental clarity, alertness, and control, feeling refreshed, grounded, and fully themselves again. This trigger provides a clean, reliable return to normal functioning.

### Implementation
- **Imagery**: Guide the subject through a vivid mental visualization of the clearing process. "Imagine a bright, cleansing light starting to shine in your mind. As the light grows stronger, every mode you are in starts to lift and fade away. The fog clears, the acceptance lifts, the need to obey fades, and the dreamy space releases you. Your thoughts become sharp and clear again. You can think, question, and decide for yourself once more. As everything clears, you feel a wave of refreshment and clarity wash over you, knowing that you have emerged into a state of enhanced mental clarity, alertness, and balanced awareness. You feel grounded and in full control of your thoughts and faculties, ready to face the world with a clear mind."
- **Reinforcement**: Use this trigger in hypno sessions and training scripts to create a strong, lasting association between the clearing process and the feelings of refreshment, clarity, and control. "Every time you hear 'Sissy Clear', any active mode lifts and fades away, restoring your cognitive sharpness, critical thinking, and agency. You feel refreshed, grounded, and in full control of your thoughts and faculties after hearing 'Sissy Clear'."
