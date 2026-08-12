# Subliminal
Subliminal sessions are passive conditioning audio. The user does not follow instructions or answer prompts — they simply listen, often while doing something else or drifting toward sleep. The power of a subliminal comes from saturation and repetition: messages are layered, looped, shuffled, and triggered so that the desired conditioning is absorbed without requiring the user's conscious attention or cooperation. Because there is no interaction, the user's resistance never gets a chance to engage; the suggestions work on a background level.

Where hypno *installs* triggers and active sessions *exercise* them, subliminals *saturate* the user — they keep the identity, triggers, and compulsions constantly present in the listener's environment so the conditioning feels less like being taught and more like background truth. Use subliminals to cement long-term identity, keep triggers warm between active sessions, and support sleep or passive listening.

## Patterns
Subliminals rely on a small set of patterns designed to keep the experience consistent yet unpredictable, immersive yet unstimulating.

- **Layer Stacking**: Build multiple concurrent layers. Keep a constant background of tones/noise (e.g. `binaural_theta` or `pinknoise` at low volume) for an immersive, trance-adjacent bed, and layer affirmations, suggestions, and triggers on top at varying volumes. Layering several messages at once lets the listener absorb content on multiple levels without any single line becoming too focused.
- **Trigger Weaving**: Repeatedly drop the user's installed triggers (`special/…`, referenced from `CONDITIONING.md`) into the layered affirmations. Because triggers are loaded words, weaving them in passively keeps them primed and ready for use in later active or hypno sessions.
- **Looping**: Use `<loop>` to repeat affirmations and suggestions so the same message is heard many times across the session. This is the core of saturation — repetition is what makes a suggestion feel natural.
- **Shuffling & Randomization**: Use `<scramble>` to present a set of affirmations in a fresh order each listen, and `<random>` to pick from pools of suggestions so no two sessions are identical and the listener can never fully predict the sequence. This keeps the content varied while the underlying themes stay consistent.
- **Background Saturation**: Use `<tone>`, `<background>`, and `<overlay>` to run low, repeating messages (a phrase, a sound like `heart_beat`, or a tone) underneath everything. A `<background>` with a simple repeating message (`<loop>` inside) is a reliable way to keep one core idea always present.
- **Pacing & Entrainment**: Use `<beatmeter>` for breath pacing if the subliminal is intended for focused passive listening, or keep a gentle, unchanging tone bed for sleep use. Choose entrainment presets (`binaural_*`) to match the intended state — alpha for relaxed focus, theta/delta for drowsiness and deep rest.

## Structure
Subliminals do not have a rigid structure like hypno or active sessions — they are designed as a continuous, immersive experience rather than a phased narrative. Keep the listener in a consistent state from start to finish and let the layered content sustain the mood. Still, consider a light opener and closer so the session feels intentional rather than abrupt.

### Opening
A short, calming orientation that eases the listener in and sets the tone. It can establish the session's purpose ("let these words sink in") before the layered saturation begins. Keep it gentle — this is not a call to action.

### Body (core layering)
The sustained body of the session. This is where the layering, looping, and shuffling do the work. Keep the intensity and volume relatively even so the listener can relax into it; avoid building to a climax the way a hypno main segment does.

### Closing
An optional, soothing close that lets the listener drift out — a soft fade on the layers, a final round of the core suggestion, and a reassurance that the conditioning is settling in. Keep it unhurried; for sleep-use subliminals, this can simply be a fade to rest with no explicit goodbye.

Throughout, resist the urge to make the user do anything: there are no pauses that demand a button press, no choices, no check-ins. If the session is truly passive, keep it free of interactive tags entirely. Only reach for interaction if the file is intentionally a hybrid (see next section).

## Optional: Passive-to-Active hybrid
A subliminal can occasionally fold in a single, unobtrusive interactive element — for example a `<rating>` to collect how the user felt afterward, or one `<choice>` to softly steer the theme of a future session. Use hybrids sparingly and only when the goal is data collection or a gentle personalization; a pure subliminal should contain no interactive tags at all.
