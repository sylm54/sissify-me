## Layout

The framework is organised into a `base/` folder plus optional part folders.
Each contributing folder has the same two sub-folders:

```
my-framework.zip
├─ manifest.json          ← required (see below)
├─ config.json            ← optional (install-time options, see below)
├─ base/
│   ├─ prompts/           ← → the app's prompt store
│   └─ agent_files/       ← → the agent's sandbox root (agent_data/)
├─ intensity_light/
│   ├─ prompts/
│   └─ agent_files/
├─ intensity_hard/
│   ├─ prompts/
│   └─ agent_files/
└─ journal/
    ├─ prompts/
    └─ agent_files/
```

**Routing is fixed by directory name:**

| In a part folder     | Lands in                             |
| -------------------- | ------------------------------------ |
| `<part>/prompts/`    | `<app_data>/prompts/` (prompt store) |
| `<part>/agent_files/`| `<app_data>/agent_data/` (sandbox root) |

- `base/` is **always** installed.
- Every other part is installed only when the user selects it via a
  `config.json` option (see [config](#the-config-install-time-options)).
- When multiple parts are installed, they're applied in order: `base/` first,
  then each selected part. For overlapping files, later parts win.

Two conventions for the archive root are accepted:

1. **Flat** — `manifest.json`, `base/`, … sit directly at the ZIP root.
2. **Wrapped** — the ZIP contains a single top-level folder (e.g.
   `my-framework/manifest.json`, `my-framework/base/`). The single wrapper
   folder is detected and unwrapped automatically.

`base/prompts/main_agent.md` is the conventional entry-point prompt the agent
loads as its system prompt.

> The previous "flat" layout (`prompts/` + everything-else at the ZIP root) is
> **no longer supported**. Repackage into `base/` (+ parts).

---

## The manifest

Every framework **must** declare a `manifest.json` at its root. A ZIP without
one is rejected on staging. It has three jobs: identify the framework, declare
compatibility, and control how updates merge.

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
| `min_app_version` | no       | If set, install is refused when the running app is older.             |
| `owned_files`     | no       | Globs of files this framework owns. On update, owned files that are **absent from the new install are deleted** (handles renames/removals). |
| `preserve`        | no       | Globs of files to **never overwrite if they already exist** on disk. Protects user-authored content. |
| `remove`          | no       | Globs of files to **delete before merging**. Always applied, not just on updates. Good for one-off cleanups. |

Globs are written relative to the **destination** (so `prompts/*.md` matches
files in the prompt store, and `rules/*.md` matches files in the sandbox
root). See [Glob reference](#glob-reference).

---

## The config (install-time options)

`config.json` is optional. When present, it declares a set of option groups
the user configures **before** the framework is applied. Each choice in a
group maps to a part folder; only `base/` + the parts of the selected choices
are installed.

A missing `config.json` means a base-only framework (no options), which is
fine for minimal frameworks.

```jsonc
{
  "options": [
    {
      "type": "single",            // "single" (radio) or "multiple" (checkbox)
      "id": "intensity",
      "title": "Intensity",
      "description": "How intense the conditioning should be.",
      "default": "medium",         // choice id (single) — the pre-selected one
      "choices": [
        { "id": "light",  "label": "Light",  "description": "Gentle, slow burn.", "part": "intensity_light" },
        { "id": "medium", "label": "Medium", "description": "Balanced.",          "part": "intensity_medium" },
        { "id": "hard",   "label": "Hard",   "description": "Intense.",           "part": "intensity_hard" }
      ]
    },
    {
      "type": "multiple",
      "id": "extras",
      "title": "Optional extras",
      "description": "Toggle extra modules on or off.",
      "default": [],               // choice ids (multiple)
      "choices": [
        { "id": "journal", "label": "Journaling", "description": "Daily journal hooks.", "part": "journal" },
        { "id": "fitness", "label": "Fitness",    "description": "Workout routines.",    "part": "fitness" }
      ]
    }
  ]
}
```

### Option group fields

| Field         | Required | Purpose                                                              |
| ------------- | -------- | -------------------------------------------------------------------- |
| `type`        | yes      | `"single"` (radio — exactly one choice) or `"multiple"` (checkbox — zero or more). |
| `id`          | yes      | Stable group identifier. Saved with the user's choices so an update can re-apply them. |
| `title`       | yes      | Display name of the group.                                           |
| `description` | no       | Shown under the title.                                               |
| `default`     | no       | The pre-selected choice: a choice-id string (`single`) or an array of choice-ids (`multiple`). Empty/absent = nothing selected. |
| `choices`     | yes      | The choices (below).                                                 |

### Choice fields

| Field         | Required | Purpose                                                              |
| ------------- | -------- | -------------------------------------------------------------------- |
| `id`          | yes      | Stable choice identifier.                                            |
| `label`       | yes      | Display label.                                                       |
| `description` | no       | Shown under the label.                                               |
| `part`        | yes      | Part folder (at the framework root, other than `base`) whose `prompts/` and `agent_files/` are installed when this choice is active. |

### How parts are chosen

For a `single` group, the selected choice's `part` is installed (falling back
to `default` if the user hasn't picked). For a `multiple` group, every checked
choice's `part` is installed. A `part` that names a non-existent folder is
silently skipped. `base` is always installed first.

---

## How install works

Installing a framework is a two-phase process so the user can configure it
before anything is written:

1. **Stage** — the app downloads/extracts the ZIP and parses `manifest.json`
   + `config.json` into a holding area. Nothing is written to the live data
   folders yet.
2. **Configure** — the app shows the `config.json` option groups (pre-filled
   with their defaults). The user adjusts them. If there are no options, this
   step is skipped.
3. **Apply** — `base/` + the selected parts are merged into the prompt store
   and sandbox root (honouring `preserve` globs), and the installed-framework
   record is written.

On **update** (same `id` already installed), the saved choices are reused
where the new `config.json` still supports them; options that no longer exist
are dropped, and brand-new options show their defaults.

---

## How updates behave

When a user installs a framework whose `id` already matches one installed,
it's an **update**. The installer runs these steps in order:

1. **Remove** — delete any on-disk file matching a `remove` glob.
2. **Prune** — for each file matching an `owned_files` glob, if it's **absent**
   from the new install, delete it from disk. (This is how you retire a file:
   remove it from the framework *and* list its glob in `owned_files`.)
3. **Merge** — copy files from `base/` + the selected parts, **skipping** any
   path that matches a `preserve` glob and already exists on disk.
4. **Record** — write the new version (plus source URL + choices) to
   `<app_data>/framework.json`.

For a **fresh install** (no matching `id` installed), only `remove` and the
merge run — there's nothing to prune, and nothing to preserve-skip (unless a
different framework or the user left files behind).

### Practical implications

- **To rename a file:** add the old path to `remove` (or list it under
  `owned_files` and drop it from the framework), and include the new file.
- **To protect user content across updates:** list those paths in `preserve`.
  The user's edits to `USER.md`, `journal/**`, etc. survive every update.
- **To ship a breaking change to a normally-preserved file:** add it to
  `remove` for one release. `remove` runs before merge, so the preserved file
  is deleted and then the new version is written cleanly.
- **To change which parts exist:** edit `config.json`. Choices that disappear
  between versions simply stop being offered; the user re-picks on update.

---

## Glob reference

Globs are written relative to the **destination** (the prompt store and the
sandbox root). A `prompts/` prefix targets the prompt store; anything else
targets the sandbox root. This matches the layout the files land in after
install.

Supported syntax:

| Pattern    | Matches                                                         |
| ---------- | --------------------------------------------------------------- |
| `*`        | any run of characters **except** `/` (stays in one folder)      |
| `**`       | any run of characters **including** `/` (crosses folders)       |
| `?`        | exactly one non-`/` character                                   |
| other text | matched literally (regex metacharacters like `.` are escaped)   |

Examples:

- `prompts/*.md` — every `.md` directly under the prompt store (not subfolders)
- `rules/*.md` — every `.md` directly under `rules/` in the sandbox
- `journal/**` — everything recursively under `journal/`
- `USER.md` — exactly the root-level `USER.md`
- `voice/config.json` — exactly that nested file

---

## Verification

Use the scripts in `.dev/` to check your work. Use `cd .dev && bun run analyze.ts lint` to verify the framework is well-formed and ready to ship. For more info you can use `bun run analyze.ts view`.
