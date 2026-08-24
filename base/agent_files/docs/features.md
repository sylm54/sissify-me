# Training Features
This file is the main agent's reference for expressing training as feature files: which surface fits which behavior, how to shape rewards and punishments, and how to get immediate feedback. The full grammar reference is provided in your system prompt, with worked examples in `examples/` — this file is about *deciding well*, not syntax.

The engine owns correctness. It schedules occurrences, counts habit logs, fires success/failure actions, reconciles missed windows, derives streaks from the activity log, and keeps an append-only points ledger. Your job is to author the right feature files and iterate on them — never to track any of that state yourself (no streaks, counts, or last-done dates written into files; the engine will clobber them and the user will see two conflicting truths).

## Choosing the surface

| Surface | File | Engine does | Use when |
| --- | --- | --- | --- |
| **Routine** | `routines/*.md` | Walks the user through gated pages, on a schedule or on demand | You need to *lead* them through it: ordered steps, instructions, checklists, audio, voice practice, enforced waits, answers you want to read |
| **Habit** | `habits/*.md` | Counts self-logged occurrences against a daily goal (`min`) or limit (`max`) | The behavior happens *outside* the app, at any time, and needs no guided steps — you only care how often it happens |
| **Task** | `tasks/*.md` | Assigns a one-off with a deadline and escalation on timeout | A single concrete thing to do once ("by tonight", "before the weekend"), not a recurring behavior |
| **Store** | `store/*.json` | Sells an entry for points (optionally stocked/restocked) | Anything the user earns or buys with points — rewards, privileges, releases |

Ask one question per behavior: **"Do I need to walk them through it?"**
- Yes, in order, with verification → **routine**.
- No — they do it on their own during the day and log it → **habit**.
- Once, by a deadline → **task**.
- It's something they *get*, not do → **store**.

## Front-matter actions are JSON
Feature-file front-matter is flat `key: value`; action lists are JSON on one line, keys and strings quoted:

```md
---
format: 2
title: Evening reflection
schedule: "@daily"
success: [{"type": "points", "delta": 5}]
failure: [{"type": "notification", "text": "Missed. We will talk."}]
---
```

Not YAML block lists (`success:` followed by `- type:` lines) — `validate_files` rejects those. Same for nested maps like task `timeouts`: `timeouts: [{"after": "24h", "action": {"type": "points", "delta": -10}}]`.

## Routines vs habits — the common mistake
**Never create a habit to count completions of a routine.** A scheduled routine already tracks itself: the engine schedules its occurrences, fires its `failure` action when the window is missed, and derives streaks from the log. Stacking a habit on top means the user must play the routine *and* remember to log a habit for the same behavior — double work, double bookkeeping, and two sources of truth that will disagree.

Rules:
- **One behavior → one feature.** Pick the surface that fits, not several.
- A habit *alongside* a routine is only correct when it tracks a **different** behavior — e.g. a nightly reflection routine plus an all-day "no touching" `max` habit.
- **Escalate a habit by raising `count`** (or tightening a `max`).
- **Escalate a routine by editing its pages/actions** — harder steps, longer `wait` blocks, deeper audio — not by wrapping it in more features.

When a routine should be scheduled vs on-demand: use `schedule` when a fixed cadence is the point (morning mantra, evening reflection); use on-demand with `cooldown`/`limit` when the user initiates (reward play, practice drills). Remember an on-demand routine that awards positive points defaults to `limit: { daily: 1 }` unless you set one.

## Rewards
Points are the currency; the store is what gives them value.

- **Keep success deltas small and consistent** (roughly 1–10). Points are visible in the ledger; inflation makes store prices meaningless.
- **Price store entries against the earning rate.** If a solid day earns ~20 points, a small treat costs ~30–50 and a big one costs hundreds. A reward the user can buy daily isn't a reward.
- **Reward new behaviors and breakthroughs more than maintenance.** First completion, first time wearing something out, going past a previous limit — these deserve a spike. Doing the same thing the 40th time does not.
- **Use `roulette` for variable rewards** when you want the pull of a slot machine: mostly small wins, occasionally a big one, maybe a tease outcome. Weight 0 disables an outcome; keep ≥2.
- **Store entries are stakes, not just prizes**: privileges, unlocks, releases, and treats the user must earn back. Denying or revoking access to a craved entry is often stronger than points.

## Punishments
Failures come from the engine, not from you noticing in chat: a routine's window expiring (missed windows are reconciled lazily — the failure fires even if nobody was watching), a `min` habit falling short at day end, a `max` habit tripping the moment the count is exceeded, or a task timing out.

- **Make them immediate, proportionate, and on-brand.** A missed day costs something felt (negative points, a forfeit, an extra `task`, a `script` punishment audio, a `notification` calling it out) — not a campaign-ending catastrophe. Many small consequences condition; rare devastating ones cause withdrawal.
- **Prefer deprivation and extra work over point bombs.** Losing earned points or privileges, denial, and added chores read as training; -500 reads as a broken economy.
- **The rule and the stake must be known before the miss.** The user should be able to see what was expected and what failing costs. Surprising them with punishment for a rule they didn't know breeds resentment, not submission.
- **Real life suspends stakes.** Use `exemption` actions when the user is sick, traveling, or genuinely unavailable — it suspends failures and protects streaks. Map demands to the availability they reported in onboarding; see `SafetyInstructions.md`.

## Immediate feedback
Reinforcement strength is timing × consistency. The engine gives you tight loops for free — use them:

- A routine's `success` fires the **moment the last page completes**.
- A `min` habit succeeds **the instant the count is reached** — the user feels it on the spot.
- A `max` habit fails **on the very log that breaks it**.
- Day-end evaluation (a `min` habit that fell short) is inherently delayed and weak. Compensate: keep daily counts reachable, and follow up in chat the next morning.
- Close the loop yourself: query `activity.db` and the `points` builtin, then reference specifics in conversation ("three days straight locked during chores — you stopped flinching"). Feedback that lives only in files the user never reads conditions nothing. A brief acknowledgment in chat after a logged success is often worth more than the points.

## What to avoid
- **A habit counting a routine** (or any other double-tracking of one behavior).
- **Hand-written stats** in feature files or fixed files — streaks, counts, last-done. The engine derives them from the activity log.
- **Few giant features.** Prefer many small routines/habits; short pages over walls of text. The user plays these daily.
- **Points inflation and punishment stacking.** Both cheapen the stakes.
- **Demand soup.** Adding a new habit every conversation until the Today view is an unplayable wall. Introduce demands one at a time, upgrade existing ones, and retire stale ones.
