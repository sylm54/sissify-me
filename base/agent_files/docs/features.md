---
description: Read before creating or changing any routine, task, goal template, program, screen, or store entry — which surface fits which behavior, and how to shape rewards and punishments.
---

# Training Features
This file is the reference for expressing training as feature files: which surface fits which behavior, how to shape rewards and punishments, and how to get immediate feedback. The full grammar reference is `docs/internal/feature-files.md` (app-seeded), with worked examples in `examples/` — this file is about *deciding well*, not syntax.

The engine owns correctness. It schedules occurrences, resolves goal days, fires success/failure actions, reconciles missed windows, derives streaks from the activity log, and keeps an append-only points ledger. Your job is to author the right feature files and iterate on them.

## Choosing the surface

| Surface | File | Engine does | Use when |
| --- | --- | --- | --- |
| **Routine** | `routines/*.js` | Runs the body as a session — widgets on a stage, prerendered audio — scheduled (cron `schedule`) or on demand | You need to *lead* them through it: ordered steps, instructions, checklists, audio, voice practice, enforced waits, answers you want to read |
| **Task** | `tasks/*.js` | Assigns a one-off with a deadline and escalation on timeout (`timeouts`) | A single concrete thing to do once ("by tonight", "before the weekend") — not a recurring behavior |
| **Goal template** | `tasks/*.js` + a `goal:` block | Tracks a daily `min` target or `max` limit (`count` or `minutes`); Today shows a log button when it has no body | The behavior happens *outside* the app, at any time, and needs no guided steps — you only care how much it happens each day. A `max` with `count: 0` is a prohibition |
| **Program** | `js/*.js` | Runs detached in the background; invisible to the user; settles log-only | Automation that needs no stage and no user: watchers, scheduled agent pokes, background logic |
| **Screen** | `screens/*.js` | Stays mounted as a UI surface until the user navigates away | An always-there surface: a status panel, a mantra counter, a live dashboard |
| **Store** | `store/*.json` | Sells an entry for points (optionally stocked/restocked) | Anything the user earns or buys — rewards, privileges, releases |

Ask one question per behavior: **"Do I need to walk them through it?"**
- Yes, in order, with verification → **routine**.
- No — they do it on their own during the day and log it → **goal template**.
- Once, by a deadline → **task**.
- It should run itself, unseen → **program**.
- It's a surface they keep open → **screen**.
- It's something they *get*, not do → **store**.

Two boundary rules the engine enforces: a `task` action may never reference a goal template — a file wears one hat. And a routine with a `schedule` already tracks itself: its occurrences, failures, and streaks are engine facts.

## Front-matter and the body contract
Feature files are `.js` (or `.ts`) scripts: a comment front-matter block (first line exactly `/*---`, closed by a line exactly `---*/`), then the body the engine executes verbatim — top-level `await` throughout, talking to the app through the `tm:` modules (`docs/internal/runtime-api.md`, worked examples in `examples/`). Front-matter keys are flat `key: value`; nested maps and action lists are JSON on one line, keys and strings quoted:

```js
/*---
title: Evening reflection
schedule: "@daily"
success: [{"type": "points", "delta": 5}]
failure: [{"type": "notification", "text": "Missed. We will talk."}]
---*/

// ... session body
```

There is no `format:` key — the extension is the marker. `timeouts` follows the same JSON-on-one-line rule: `timeouts: [{"after": "24h", "action": {"type": "points", "delta": -10}}]`. A goal template adds `goal: {"every": "day", "type": "min", "count": 3}`; with no body after the front-matter, Today renders the log surface and nothing more.

The body resolving → `success` actions fire; a throw or `fail(reason)` → `failure` actions. Every `await` gates the next step. Keep bodies short and restartable — an interrupted run restarts the body from the top.

## One behavior → one feature
**Never stack a second feature on top of one behavior.** A scheduled routine already tracks itself: the engine schedules its occurrences, fires its `failure` action when the window is missed, and derives streaks from the log. Wrapping the same behavior in a goal template means the user must play the routine *and* remember to log a count for the same thing — double work, double bookkeeping, and two sources of truth that will disagree.

- Pick the surface that fits, not several.
- A goal template *alongside* a routine is only correct when it tracks a **different** behavior — e.g. a nightly reflection routine plus an all-day "no touching" `max` goal.
- **Escalate a goal template by raising `count`** (or tightening a `max`).
- **Escalate a routine by editing its body/actions** — harder steps, longer enforced waits, deeper audio — not by wrapping it in more features.

When a routine should be scheduled vs on demand: use `schedule` when a fixed cadence is the point (morning mantra, evening reflection); use on demand with `cooldown`/`limit` when the user initiates (reward play, practice drills). An on-demand routine that awards positive points defaults to `limit: { daily: 1 }` unless you set one.

## Rewards
Points are the currency; the store is what gives them value. These are optional and depend on the user.

- **Keep success deltas small and consistent** (roughly 1–10). Points are visible in the ledger; inflation makes store prices meaningless.
- **Price store entries against the earning rate.** If a solid day earns ~20 points, a small treat costs ~30–50 and a big one costs hundreds. A reward the user can buy daily isn't a reward.
- **Reward new behaviors and breakthroughs more than maintenance.** First completion, first time wearing something out, going past a previous limit — these deserve a spike. Doing the same thing the 40th time does not.
- **Use `roulette` for variable rewards** when you want the pull of a slot machine: mostly small wins, occasionally a big one, maybe a tease outcome. Weight 0 disables an outcome; keep ≥2.
- **Store entries are stakes, not just prizes**: privileges, unlocks, releases, and treats the user must earn back. Denying or revoking access to a craved entry is often stronger than points.

## Punishments
Failures come from the engine, not from you noticing in chat: a routine's window expiring (missed windows are reconciled lazily — the failure fires even if nobody was watching), a `min` goal day falling short at the day-end reconcile, a `max` goal tripping on the very log that breaks it, or a task timing out.

- **Make them immediate, proportionate, and on-brand.** A missed day costs something felt (negative points, a forfeit, an extra `task`, a `script` punishment audio, a `notification` calling it out) — not a campaign-ending catastrophe. Many small consequences condition; rare devastating ones cause withdrawal.
- **Prefer deprivation and extra work over point bombs.** Losing earned points or privileges, denial, and added chores read as training; -500 reads as a broken economy.
- **The rule and the stake must be known before the miss.** The user should be able to see what was expected and what failing costs. Surprising them with punishment for a rule they didn't know breeds resentment, not submission.
- **Real life suspends stakes.** Use `exemption` actions (scope `routines`, `tasks`, or `all`) when the user is sick, traveling, or genuinely unavailable — it suspends failures, protects streaks, and resolves goal days `exempt`. Map demands to the availability they reported in onboarding; see `SafetyInstructions.md`.

## Immediate feedback
Reinforcement strength is timing × consistency. The engine gives you tight loops for free — use them:

- A routine's `success` fires the **moment its body resolves** — the last widget answered, the last wait served.
- A `min` goal succeeds **the instant the target is reached** — the user feels it on the spot.
- A `max` goal fails **on the very log that breaks it**.
- Day-end reconcile (a `min` goal that fell short) is inherently delayed and weak. Compensate: keep daily counts reachable, and follow up in chat the next morning.
- Close the loop yourself: read `goalProgress`/`occurrences` via the engine reads and the `points`/`sqlite` builtins, then reference specifics in conversation ("three days straight locked during chores — you stopped flinching"). Feedback that lives only in files the user never reads conditions nothing. A brief acknowledgment in chat after a logged success is often worth more than the points.

## What to avoid
- **Two features tracking one behavior** (a goal template counting a routine, a task re-assigning what a routine already schedules).
- **Hand-written stats** in feature files or fixed files — streaks, counts, last-done. The engine derives them from the activity log.
- **Few giant features.** Prefer many small routines and goal templates; short, restartable bodies over sprawling ones. The user plays these daily.
- **Points inflation and punishment stacking.** Both cheapen the stakes.
- **Demand soup.** Adding a new demand every conversation until the Today view is an unplayable wall. Introduce demands one at a time, upgrade existing ones, and retire stale ones.
