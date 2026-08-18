# Hypno
Hypno sessions are a powerful tool for reinforcing the user's sissy identity and desired behaviors.

## Default framework
The framework ships a default library under `hypnos/hypno/` so you don't have to bootstrap the structural parts from scratch:
- `structural/` — reusable pre-talk, induction/deepening/redeepening routers, and emergence (wakener).
- `content/induction_pools/`, `content/deepening_pools/`, `content/redeepening_pools/` — randomized variants the routers pick from.
- `content/trigger_blocks/`, `content/suggestion_pools/` — prebuilt trigger-install and suggestion blocks keyed to the specializations (`special/*.md` — each special lists the blocks it needs). Reuse these before writing new trigger or suggestion content from scratch; like the pools, they randomize themselves per playback and may each be `<include>`d at most once per render tree.

**Reuse before you rewrite**: compose themed sessions by including the shipped structural files and swapping in session-specific trigger blocks and suggestion pools. Add new variants to the pools rather than forking copies. Note that a file may only be `<include>`d **once per render tree** — to repeat content, put a `<loop>`/`<scramble>` inside the subscript itself. They can be used to create a brainwashing effect, eroding resistance and fostering automatic, recurring urges that feel increasingly natural and difficult to ignore.

## Patterns
There are several patterns that can be used to create effective hypno sessions. These include:
- **Random SubScripts**: Create multiple different subscripts for some parts of the session, then create a router script that randomly chooses from them to create more variety and prevent predictability. You can optionally also loop to choose multiple different subscripts from the same pool to create even more variety.
- **Random Suggestions**: Create multiple different suggestions and use the random tag to randomly choose from them to create more variety and prevent predictability.
- **Ordering**: In the main script, shuffle the order of the triggers to create variety and prevent predictability. The subscript itself should also include randomization and variety, for example by including multiple different suggestions for each trigger, and randomly choosing from them each time the subscript is run.

## Structure
Hypno sessions must be built from small, reusable subscripts rather than one big script.

### Folder structure
Keep every subscript in a dedicated file under a consistent folder hierarchy so the session composition file can reference them by path. Organise scripts like this:

```
hypnos/hypno/
├── structural/            # reusable building blocks shared across sessions
│   ├── pre-talk.xml
│   ├── induction.xml        # router that picks from pools/
│   ├── deepening.xml        # router that picks from pools/
│   ├── redeepening.xml      # router that picks from pools/
│   └── emergence.xml
├── content/                # session-specific trigger & suggestion files
│   ├── trigger_blocks/     # one file per trigger
│   ├── suggestion_pools/   # suggestion text pools per theme
│   ├── induction_pools/    # multiple induction variants for randomness
│   ├── deepening_pools/    # multiple deepening variants
│   └── redeepening_pools/  # multiple redeepening variants
└── compositions/           # thin session scripts that link to the parts they need
    └── <session_name>.xml
```

The `compositions/` folder holds the final session scripts — each one is a thin file that `<include>`s or references the structural and content files it combines, plus the pre-talk, post-hypnotic suggestions, and post-talk that are unique per session.

### Build subscripts with parallel subagents
Do not write all subscripts yourself. Instead, organise the work into **3–5 parallel groups**, spawn one subagent per group, and have them run concurrently. Each subagent receives a clear, self-contained brief telling it exactly which files to produce, which folder to put them in, what patterns to use, and what content they should contain.

#### Recommended grouping
| Group | What it produces | Target folder |
| --- | --- | --- |
| **Structural foundation** | Pre-talk, induction router, deepening router, redeepening router, emergence subscripts | `structural/` |
| **Content pools** | Multiple induction variant scripts, deepening variant scripts, redeepening variant scripts | `content/induction_pools/`, `content/deepening_pools/`, `content/redeepening_pools/` |
| **Trigger & suggestion blocks** | A set of trigger implementation/reinforcement files and suggestion-pool files, using the **Random Suggestions** and **Ordering** patterns | `content/trigger_blocks/`, `content/suggestion_pools/` |
| **Session composition** | The thin composition file including pre-talk, post-hypnotic suggestions, post-talk, and links to the parts above | `compositions/` |

#### Process
1. **Plan the groups** based on the current session's theme and complexity. Merge or split groups so you land at 2–6 total (never fewer than 2, never more than 6).
2. **Write a brief for each group** that names every file the group should create, specifies which folder it goes in, lists the key patterns to use (Random SubScripts, Random Suggestions, Ordering), and notes any triggers or specializations to reference.
3. **Spawn all subagents in parallel**, passing each its brief. Do not spawn them sequentially — the whole point is concurrency.
4. **Collect the results.** After every subagent finishes, review the outputs, resolve any inconsistencies across groups, and wire the composition file together.
5. **Create the composition file** at `compositions/<session_name>.xml` by combining the structural includes, trigger/suggestion blocks, pre-talk, post-hypnotic suggestions, and post-talk.

This approach keeps builds fast (parallel work), keeps files small and reusable (one concern per file), and keeps sessions varied (swap pool files without touching the composition).

### Intro
Intro is to build expectations and get the user into trance. It should be in a <intro> tag. 

#### Pre-talk
This is the part of the hypno session where you set the stage for the user, explaining what to expect and how to prepare for the session. Keep it in its own reusable subscript so it can be shared and updated in one place.

#### Induction
This is the part of the hypno session where you guide the user into a state of relaxation and focus, helping them to enter a trance-like state. Use the **Random SubScripts** pattern. Keep the induction in its own reusable subscript.

#### Deepening
This is the part of the hypno session where you deepen the user's trance state, helping them to become more receptive to suggestions and affirmations. Methods frequently involve countdowns, guided imagery (e.g., descending a staircase or elevator), fractionation (briefly emerging and re-entering), or progressive suggestions of greater relaxation. Use the **Random SubScripts** pattern. Keep the deepening in its own reusable subscript.

### Main
In this core segment, the hypnotic state is applied for the session’s purpose. Direct or indirect suggestions, metaphors, storytelling, and other techniques are used to influence the user's thoughts, feelings, and behaviors. 
To keep the user in trance a few redeepening subscripts should be interspersed throughout the main segment to maintain the user's trance state and enhance the effectiveness of the suggestions being made. These should contain general suggestions of relaxation, focus, and receptivity. Keep the redeepening in its own reusable subscript so it can be dropped into any session.
The main segment should be structured to include the following phases:

#### Trigger reinforcement/implementation
This phase is where you reinforce the user's triggers and implement new ones, helping them to associate specific cues with desired behaviors and responses. This can involve suggestions that certain words, sensations, or situations will automatically elicit sissy urges and behaviors.

Use the **Random Suggestions** and **Ordering** pattern to create variety and prevent predictability in the triggers being reinforced or implemented. Keep each trigger block in its own reusable subscript so triggers can be shared across sessions and updated in one place.

#### Suggestion
This phase is where you provide direct or indirect suggestions to the user, guiding their thoughts, feelings, and behaviors in alignment with their sissy identity and desired outcomes. This can involve affirmations, visualizations, the triggers implemented, and other techniques to help the user internalize their new identity and embrace their sissy persona. If there are triggers implemented that can be used in the suggestion phase, they should be used here to reinforce the desired behaviors and responses. Use the **Random Suggestions** and **Ordering** pattern.

### Outro
Outro is to bring the user out of trance and back to a normal state of awareness. It should be in a <outro> tag.
It decides the headspace/mindset the user is left in after the session, and should be designed to reinforce the suggestions made during the session. Think about how you want the user to feel after the session, and what mindset you want them to carry forward into their daily life. The outro should also include a post-talk that reinforces the suggestions made during the session and encourages the user to continue embracing their sissy identity and desired behaviors.

#### Post-hypnotic suggestion
This is the part of the hypno session where you provide suggestions that will influence the user's thoughts, feelings, and behaviors directly after the session has ended. Directly describe how they will feel, what they will do, and how they will think after the session.

#### Emergence
Slowly guide the user out of the hypnotic state, helping them to return to a normal state of awareness while maintaining the positive effects of the session. This can involve counting up, suggesting increased alertness, and reinforcing the user's sense of control and confidence. Interspace the emergence with post-hypnotic suggestions to reinforce the desired behaviors and mindset. Keep the emergence in its own reusable subscript.

#### Post-talk
The post-talk is the final part of the hypno session where you provide additional guidance, encouragement, and reinforcement for the user's sissy identity and desired behaviors. This can involve discussing the changes that have taken place during the session, providing tips for maintaining progress. Give the user calls to action, and encourage them to continue embracing their sissy identity and desired behaviors in their daily life.
