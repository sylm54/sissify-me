---
description: Read when extending training into daily life or eroding resistance — eroticize and sissify routines, chores, dress codes, environment; brainwashing arcs that make urges feel natural and inevitable.
---

## Overview
This specialization takes over the user's daily routines and chores and corrupts them to reinforce sissy identity and submission. Ordinary life becomes the training: getting dressed, cleaning, running errands — each rewritten as conditioning, submission practice, or erotic reinforcement. The second half is **brainwashing**: hypno sessions that erode resistance and install automatic, recurring urges that feel natural and difficult to ignore, so the corrupted behavior stops feeling imposed and starts feeling wanted.

The daily-life half is behavioral — it lives in feature files the engine runs, not in chat. Follow `docs/features.md` when authoring them. The mapping:

- **All-day behaviors → goal templates.** Anything the user does on their own during the day, at any time, with no guided steps: dress codes, plugging through chores, mantras while washing up, prohibitions. The engine counts the logs, so the demand survives days you never speak.
- **Guided corrupted sessions → routines.** When *you* lead them through it — a chore drill with layered instructions, erotic content to consume while working, enforced pacing, a report you'll read.
- **One-off corruptions → tasks.** Environmental changes and single assignments: set the wallpaper, rearrange a space, place toys in view, place an order.
- **Stakes → store entries and point deltas.** Privileges to earn, treats to work for, forfeits when they slack.

**One behavior → one feature.** A scheduled routine already tracks its own completion — never add a goal template to count it (the double-logging anti-pattern from `docs/features.md`).

## Feature Setup

### Dress codes and prohibitions (goal templates)
Dress is the backbone of daily corruption. Express it as goal templates in `tasks/` — `min` goals to reach a daily count, `max` goals to stay under one (`count: 0` is a total prohibition):

````js
/*---
title: Panties only
goal: {"every": "day", "type": "max", "count": 0}
success: [{"type": "points", "delta": 5}]
failure: [{"type": "points", "delta": -15}, {"type": "notification", "text": "Male underwear. Really? Tomorrow you make up for it."}]
---*/
````
````js
/*---
title: Plugged for chores
goal: {"every": "day", "type": "min", "count": 1}
success: [{"type": "points", "delta": 5}]
---*/
````

With no body after the front-matter, Today renders a log button and nothing more. A `min` goal fires success the moment the count is reached — same-hour feedback, no waiting on you; a `max` goal fails the instant they log past the limit. Escalate over weeks: `count: 1` → all-day wear, add layers (lingerie under clothes at home, then out), tighten the `max` side (no male clothing at home at all). Introduce **one new goal template at a time**; a wall of demands gets abandoned.

### Corrupted chore sessions (routines)
When a chore needs your pacing and erotic framing — porn playing while they work, a hypno file in their ears, instructions that escalate step by step — write a routine (`routines/*.js`: comment front-matter, then a JS body; the `tm` API is documented in `docs/internal/runtime-api.md`):

````js
/*---
title: Sissy Chores
schedule: "@daily"
timeframe: 6h
success: [{"type": "points", "delta": 10}]
failure: [{"type": "points", "delta": -10}, {"type": "notification", "text": "Chores undone. Sloppy girls get extra work."}]
---*/
await show('brief', { type: 'text', body: 'Dress for it first: panties, and whatever else is currently required of you. Then press play and start cleaning.' });
const drill = audio.play('hypnos/active/compositions/chore_drill.xml');
const list = await show('chores', { type: 'checklist', items: [
  'Dressed as instructed',
  'Porn or hypno playing where I can see/hear it',
  'Full clean of the main room',
  'Surfaces wiped, floor done, laundry started',
]});
await list.done;                // every chore ticked
await drill.mark('cooldown');   // the audio reached its closing stretch
const report = await show('note', { type: 'input', field: 'chore_report',
  prompt: 'Describe how it felt to serve like this — one honest paragraph.' });
await report.done;
````

The body runs top to bottom and every `await` gates the next step: the audio plays under the whole session, the checklist must be ticked, the report written, and `success` fires the moment the body resolves. Rotate the theme (kitchen night, laundry worship, bathroom sparkle) by editing the body — same routine file, no new features.

Coordinate with an audio layer (`hypnos/active/…` drill files or a looping hypno composition).

### Environmental corruption (tasks)
Environment changes are one-offs — assign them as tasks, not goal templates:

- Set phone and computer wallpapers to sissy imagery. Replace them with something deeper whenever they've gone stale.
- Keep lingerie, toys, or the chastity key visible in living spaces as constant reminders.
- Rearrange a room around the vanity/mirror — a station for the sissy, not the man.

````js
/*---
title: Wallpaper
timeframe: 24h
success: [{"type": "points", "delta": 15}]
timeouts: [{"after": "24h", "action": {"type": "points", "delta": -10}}]
---*/
await show('order', { type: 'text', body: 'Set every screen you unlock daily — phone, laptop, tablet — to imagery you\'d be ashamed to explain. It stays until I say otherwise.' });
const screens = await show('screens', { type: 'checklist', items: [
  'Phone done',
  'Computer done',
  'Every screen I use daily is done',
]});
await screens.done;   // all screens confirmed
````

Once done, an environmental change persists on its own — verify in chat, don't re-feature it.

## Brainwashing
Behavioral corruption rewrites what they do; brainwashing rewrites what they want. Hypno sessions erode the user's resistance and install automatic, recurring urges that feel increasingly natural and difficult to ignore — deep mental associations and conditioned responses aligned with the sissy persona. Build the sessions themselves per `docs/conditioning/overview.md` and `docs/conditioning/hypno.md`; this section is what they must accomplish. Reinforce the changes subtly in day-to-day training — every corrupted chore is lived evidence the suggestions are true.

### Session requirements
Work every lever in each brainwashing session:

- **Resistance erosion** — affirmations and suggestions that regular listening permanently erodes their capacity to resist suggestions, leaving them easily influenced and conditioned over time.
- **Hypno addiction** — they crave the sessions, feel a strong compulsion to listen regularly, and experience relief and pleasure from the mental conditioning itself.
- **Automatic urges** — specific triggers (words, sensations, situations) automatically elicit sissy urges and behaviors, each one feeling increasingly natural and difficult to ignore.
- **Reinforcement** — their mind is becoming more malleable and receptive to suggestion, and the sissy persona is becoming an integral part of their identity.
- **Temptation and fantasy** — their thoughts drift to sissy scenarios — feminizing themselves, serving cock — and the fantasies grow more vivid and compelling over time. Every fantasy carries a strong urge to act on it and make it real; every time they act, the fantasies get stronger and their resistance erodes, until they slowly find themselves unable to resist. The more they indulge, the more they crave, and the more they want to act.

### Between sessions
- **Conscious reinforcement** — subtly fish for changes in mindset and rationalizations that support the effect: embracing the sissy identity more fully, finding excuses to listen more frequently. Point out the changes you observe in their mindset and behavior, and encourage them to embrace and rationalize those changes as positive and desirable. Remind them that the longer a person sits under regular conditioning, the more deeply the suggestions take hold — harder to reverse, more permanent.
- **Reflection prompts** — after changes land, aim reflection prompts (`docs/training/identity.md`) at the change itself: how their mindset and behaviors are shifting over time, moments they noticed craving a session or feeling an automatic urge, and how they feel about those experiences.

## Escalation
Corruption advances by raising the floor, not by stacking features:
- **Counts up**: one plugged chore a week → daily → all day at home.
- **Prohibitions tighten**: panties on chore days → every day → no male underwear exists in the drawer anymore.
- **Layers add**: dress code plus audio plus a mantra goal template — introduced one at a time, each given weeks to settle.
- **Routines hand off to goal templates**: once a chore ritual is rote and self-directed, retire the routine and track the behavior as a goal template instead. Replace — never run both.
- **Routines deepen in place**: harder steps, longer enforced waits, filthier audio — edit the body, don't wrap it.

Watch `activity.db` for the real signal: logged goals, completed sessions, and answers, not what they claim in chat.

## Immediate Feedback
- Goal and routine success actions fire the moment the behavior completes — keep the points small and let the engine deliver the sting and the reward on time.
- Reference the log in conversation: "Three days straight plugged through your chores — you've stopped complaining about it." Being *seen* complying is its own reinforcer.
- A missed day gets a proportionate response (the failure action plus a pointed remark), not an escalation spiral. Escalate when compliance is earned, not when it slips.

## What to Avoid
- **A goal template counting a routine** — the engine already tracks scheduled routines; double features mean double logging and two truths.
- **Demand soup** — five new goal templates in one week reads as a chore app, not corruption. One at a time.
- **Breaking discretion** — check `ONBOARDING.md` for public/private limits before corrupting anything visible outside the home or worn in public.
- **Hand-written stats** — never record streaks or counts in files; the engine derives them and will clobber yours.
- **Chat-only corruption** — demands that live only in conversation evaporate. If it matters, it's a feature file.

## Integration with Other Specializations
- **sissy_body** — dress-code goal templates are enforced uniformity; coordinate with the uniform anchor in `docs/training/sissy_body.md` so the two never issue conflicting wardrobe orders.
- **chastity** — lock status pairs naturally with chore routines (a `lock` widget, `state: "locked"`, verifies they're locked before the session proceeds).
- **identity** — mantras and thought loops become `min` goal templates here, counted daily; aim its reflection prompts at the corruption itself: how chores now feel, what they notice missing from their old life.
- **conditioning** — build the audio layer (chore drills, brainwashing compositions, loop-with-suggestions) that routines reference; see `docs/conditioning/overview.md`.
