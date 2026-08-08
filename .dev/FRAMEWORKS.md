# Framework Authoring Guide

This guide covers everything you need to package, version, and distribute a
**framework** for train-me: the on-disk layout, the mandatory `manifest.json`,
how updates behave, and how to publish over the network.

A framework is a ZIP archive that supplies the agent's prompts and its sandbox
content (rules, routines, conditioning, personality, …). The app ships none of
this by default — a framework is what makes it useful.

## Contents

- [ZIP layout](#zip-layout)
- [The manifest](#the-manifest)
- [How updates behave](#how-updates-behave)
- [Glob reference](#glob-reference)
- [Versioning](#versioning)
- [Distributing over the network](#distributing-over-the-network)
- [Minimal example](#minimal-example)
- [Troubleshooting](#troubleshooting)

---

## ZIP layout

A framework ZIP has two parts:

```
my-framework.zip
├─ manifest.json        ← required (see below)
├─ prompts/             ← → the app's prompt store
│   ├─ main_agent.md
│   ├─ hypno_planner.md
│   └─ hypno_writer.md
└─ (everything else)    ← → the agent's sandbox root (agent_data/)
    ├─ PERSONALITY.md
    ├─ USER.md
    ├─ rules/
    ├─ routines/
    ├─ conditioning/
    ├─ journal/
    └─ ...
```

**Routing is fixed by directory name:**

| In the ZIP            | Lands in                         |
| --------------------- | -------------------------------- |
| `prompts/`            | `<app_data>/prompts/` (prompt store) |
| everything else       | `<app_data>/agent_data/` (sandbox root) |

Two conventions for the archive root are accepted:

1. **Flat** — `manifest.json`, `prompts/`, … sit directly at the ZIP root.
2. **Wrapped** — the ZIP contains a single top-level folder (e.g.
   `my-framework/manifest.json`, `my-framework/prompts/`). The single wrapper
   folder is detected and unwrapped automatically.

`prompts/main_agent.md` is the conventional entry-point prompt the agent
loads as its system prompt.

---

## The manifest

Every framework **must** declare a `manifest.json` at its root. A ZIP
without one is rejected on import. It has three jobs: identify the framework,
declare compatibility, and control how updates merge.

```jsonc
{
  // Identity — required
  "id": "train-me-core",            // stable across all versions; never change it
  "name": "Train-Me Core",
  "description": "Core conditioning framework with routines, rules, and journal hooks.",
  "version": "2.1.0",               // semver-ish (see Versioning)

  // Compatibility — optional
  "min_app_version": "1.4.0",       // refuse to install if the app is older

  // Update merge rules — optional (all default to empty)
  "owned_files": [
    "prompts/*.md",
    "rules/*.md",
    "routines/*.md",
    "conditioning/*.md"
  ],
  "preserve": [
    "USER.md",
    "PERSONALITY.md",
    "journal/**",
    "voice/config.json"
  ],
  "remove": [
    "conditioning/legacy_loop.md"
  ]
}
```

### Field reference

| Field             | Required | Purpose                                                              |
| ----------------- | -------- | -------------------------------------------------------------------- |
| `id`              | yes      | Stable identifier. Two frameworks with the same `id` are versions of the same thing; an update is only detected when the incoming `id` matches the installed one. |
| `name`            | yes      | Display name.                                                        |
| `description`     | yes      | Short human-readable description (shown in the UI / index).          |
| `version`         | yes      | Version string. A higher value triggers the "update available" badge. |
| `min_app_version` | no       | If set, import is refused when the running app is older.             |
| `owned_files`     | no       | Globs of files this framework owns. On update, owned files that are **absent from the new ZIP are deleted** (handles renames/removals). |
| `preserve`        | no       | Globs of files to **never overwrite if they already exist** on disk. Protects user-authored content. |
| `remove`          | no       | Globs of files to **delete before merging**. Always applied, not just on updates. Good for one-off cleanups. |

---

## How updates behave

When a user imports a framework whose `id` already matches one installed,
it's an **update**. The importer runs these steps in order:

1. **Remove** — delete any on-disk file matching a `remove` glob.
2. **Prune** — for each file matching an `owned_files` glob, if it's **absent**
   from the new ZIP, delete it from disk. (This is how you retire a file:
   remove it from the ZIP *and* list its glob in `owned_files`.)
3. **Merge** — copy files from the ZIP, **skipping** any path that matches a
   `preserve` glob and already exists on disk.
4. **Record** — write the new version to `<app_data>/framework.json`.

For a **fresh install** (no matching `id` installed), only `remove` and the
merge run — there's nothing to prune, and nothing to preserve-skip (unless a
different framework or the user left files behind).

### Practical implications

- **To rename a file:** add the old path to `remove` (or list it under
  `owned_files` and drop it from the ZIP), and include the new file.
- **To protect user content across updates:** list those paths in `preserve`.
  The user's edits to `USER.md`, `journal/**`, etc. survive every update.
- **To ship a breaking change to a normally-preserved file:** add it to
  `remove` for one release. `remove` runs before merge, so the preserved file
  is deleted and then the new version is written cleanly.

---

## Glob reference

Globs are written **relative to the ZIP root** (so `prompts/a.md` and
`rules/b.md` are both valid). The `prompts/` prefix routes a glob to the
prompt store; anything else routes to the sandbox root.

Supported syntax:

| Pattern    | Matches                                                         |
| ---------- | --------------------------------------------------------------- |
| `*`        | any run of characters **except** `/` (stays in one folder)      |
| `**`       | any run of characters **including** `/` (crosses folders)       |
| `?`        | exactly one non-`/` character                                   |
| other text | matched literally (regex metacharacters like `.` are escaped)   |

Examples:

- `prompts/*.md` — every `.md` directly under `prompts/` (not subfolders)
- `rules/*.md` — every `.md` directly under `rules/`
- `journal/**` — everything recursively under `journal/`
- `USER.md` — exactly the root-level `USER.md`
- `voice/config.json` — exactly that nested file

---

## Versioning

Versions are compared as dot-separated numeric components:

- `2.1.0` > `2.0.9` ✓
- `2.1` == `2.1.0` ✓ (missing components treated as `0`)
- non-numeric components are treated as `0` (never crash, but avoid them)

An update is offered when the channel/ZIP version is **strictly greater** than
the installed version. Bump `version` on every release.

---

## Distributing over the network

To let users check for and install updates without manually picking a ZIP,
publish an **index document** at a stable URL. Users paste this URL once into
Settings → Update channel; thereafter "Check for updates" and "Install" work
against it.

The index points at the actual ZIP and advertises its checksum:

```jsonc
{
  "version": "2.1.0",
  "url": "https://example.com/train-me/train-me-core-2.1.0.zip",
  "sha256": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
  "description": "Core conditioning framework with routines, rules, and journal hooks.",
  "min_app_version": "1.4.0"
}
```

| Field             | Required | Purpose                                                          |
| ----------------- | -------- | ---------------------------------------------------------------- |
| `version`         | yes      | Version of the ZIP this index points at.                         |
| `url`             | yes      | Absolute URL of the framework ZIP (must include its own `manifest.json`). |
| `description`     | yes      | Shown in the update-available notice.                            |
| `sha256`          | no       | Lowercase hex SHA-256 of the ZIP. If set, a mismatch rejects the download. Strongly recommended. |
| `min_app_version` | no       | Optional app-version gate.                                       |

**Publishing a release:**

1. Build the ZIP (flat or wrapped root, with `manifest.json`).
2. Compute its SHA-256: `sha256sum train-me-core-2.1.0.zip`
3. Upload the ZIP to your host.
4. Update the index JSON at your stable channel URL to point at the new ZIP,
   bump `version`, set `sha256`, and update `description`.

The download streams to disk with a live progress bar, verifies the checksum,
then runs the same manifest-aware import as a local ZIP — so all the
`preserve` / `remove` / `owned_files` rules apply identically.

> **Hosting note:** the index and ZIP must be served over HTTPS and be
> publicly fetchable (no auth). The fetch retries up to 3 times on transient
> failures.

---

## Minimal example

A complete, minimal framework:

```
hello-framework.zip
├─ manifest.json
└─ prompts/
   └─ main_agent.md
```

`manifest.json`:

```json
{
  "id": "hello-framework",
  "name": "Hello Framework",
  "description": "A minimal example framework.",
  "version": "1.0.0"
}
```

`prompts/main_agent.md`:

```markdown
You are a helpful assistant.
```

Zip it up (from inside the folder so the paths are flat):

```bash
cd hello-framework
zip -r ../hello-framework.zip manifest.json prompts/
```

Import it via **Settings → Framework → Import**, or the onboarding flow.

---

## Troubleshooting

**"Package is missing a required manifest.json at its root."**
The ZIP has no `manifest.json` at the (unwrapped) root. Add one. If you zipped
a folder *containing* the project, that's fine (single top-level folders are
unwrapped) — but a ZIP with multiple top-level entries and no root manifest
will fail.

**Imported but "No 'prompts/' folder found in package."**
The merge still proceeds (sandbox content lands in `agent_data/`), but no
prompts were installed. Add a `prompts/` folder.

**"This package requires app version X or newer (you are running Y)."**
The `min_app_version` gate blocked the install. Either lower the constraint or
tell the user to update the app.

**A file I removed from the ZIP is still on disk after update.**
List its glob under `owned_files` (or `remove`). Files absent from the new ZIP
are only pruned if they match an `owned_files` glob — otherwise they're left
untouched (the merge never deletes untracked files).

**A file I ship keeps getting overwritten by user edits on update.**
That's expected unless you list it in `preserve`. Add its glob to `preserve`
and re-importing will skip it whenever it already exists.

**"Checksum mismatch: download is … but index expected …."**
The downloaded ZIP doesn't match the `sha256` in your index JSON. Re-upload
the ZIP and/or recompute the checksum and republish the index.
