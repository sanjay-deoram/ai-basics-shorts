# Episode 15 · Claude Code reel (41.8 s, halftone avatar narrator)

A fast product reel about Claude Code, modelled on a reference creator-platform reel: we copied its **structure, cut
rhythm, sound feel and flow**, not its product name, logo, UI or copy. Built from the ep14 kit; the look departs from
the Eggshell system on purpose (colour-flip sections, grotesk + italic serif type).

## Reference beats (internal only)

Reference: 41.6 s, 60 fps vertical reel (local copy in the session scratchpad, not in the repo).

| Time | Reference | Ours |
|---|---|---|
| 0–2 | White, `// for creators`, "Got something to *sell?*", halftone 3D mascot big at the bottom | s01: "Got an app in your *head?*" |
| 2–6 | A blue dot grows from the accent word into a full-blue frame; product cards (Courses, Ebooks…) pop above the waving mascot | s01: a blue bloom grows from the avatar's head; three app-idea cards pop |
| 6–10 | White; small "With X, you get your own" line, big "creator page *in minutes.*"; a phone skeleton fills in | s02: small line + big "In *minutes.*"; the Claude Code terminal draws in |
| 10–15 | "Pick a *look.*" (theme wall of many phone variants flies past), "Add your *products.*", "Share one *link.*" | s03 describe, s04 "Every *file.*" with the file wall |
| 16–35 | Section per feature, each on its own pastel (light blue, lavender, pink, mint), white panels, whip-pans with heavy motion blur; timer chip counting, ticks, a "MERCHANT OF RECORD" stamp; mascot shrunk to a round badge bottom-left with a coloured ring | s05–s07: builds, fixes (TESTS PASS stamp), ships (PR card); badge + ring per section (no timer chip) |
| 35–36 | Zoom-out montage of all screens, circled script "*Handled.*" stamp | s08: montage pull-back, ring drawn, "*Shipped.*" stamp |
| 36–39 | Hard cut to black: "You create. We handle the *flow.*" word by word, mascot big and gesturing | s09: "You describe. Claude *builds.*" |
| 39–41.6 | Hard cut to white logo end card with a button | s10: Claude logo, "Claude Code", line, button, install command |

Cut rhythm kept: two hard cuts only (to black, to the end card); every other change is a whip-pan.

## Script (approved)

| # | Eyebrow | Line (on screen accent in *italics*) |
|---|---|---|
| 1 | `// got an idea?` | Got an app in your *head?* |
| 2 | — | With Claude Code, you get a coding partner right in your terminal. In *minutes.* |
| 3 | `// describe` | Describe it. In plain *English.* |
| 4 | `// reads` | It reads your code. Every *file.* |
| 5 | `// builds` | Plans the change. Writes it. Runs the *tests.* |
| 6 | `// fixes` | Broken build? It *fixes it.* |
| 7 | `// ships` | Then it commits, and opens the *pull request.* |
| 8 | — | *Shipped.* |
| 9 | — | You describe. Claude *builds.* |
| 10 | — | (end card, silent) Claude Code · Your coding partner, *in the terminal.* |

## Scenes (41.8 s)

Slots overlap by 0.36 s at each whip so the outgoing scene slides out while the next slides in (one camera move).

| Slot | Time | Canvas | What you see |
|---|---|---|---|
| s01 | 0–3.46 | white → blue | Eyebrow on frame 0, headline word by word; avatar BIG at the bottom (rises in); blue bloom from his head at 1.42 s fills the frame, text turns white/yellow, three idea cards (Habit tracker, Recipe box, Budget app) pop and float. Whip out. |
| s02 | 3.1–9.16 | white | Small line word by word, big "In *minutes.*"; terminal draws in, Claude logo spins into the welcome box, empty prompt with blinking caret. Avatar shrinks into the badge during the whip. |
| s03 | 8.8–13.26 | peach | "Describe it. In plain *English.*"; the request types into the prompt ("Build a habit tracker: daily check-ins, streaks, and a dark mode."), Enter flash, "On it. Let me read the project first." |
| s04 | 12.9–17.96 | light blue | Read / Read / Search rows; on "Every file" the terminal steps back and a wall of 36 file cards streams up with a vertical smear, ticks popping; terminal returns with "Read 42 files ✓". |
| s05 | 17.6–22.56 | lavender | Plan with three boxes that tick as each step is said, Edit with a green/red diff, Bash(npm test) with a spinner. |
| s06 | 22.2–26.96 | pink | "✗ 1 failing" (terminal shakes, status chip "build failing"), Edit fixes the line, rerun "✓ 24 passing", status chip turns green, TESTS PASS rubber stamp. Badge ring turns green. |
| s07 | 26.6–31.66 | mint | git commit row, `gh pr create`, PR card "Add daily streaks #42" rises; "Open pull request" pressed → "✓ Opened", Open pill, checks tick. |
| s08 | 31.3–34.6 | warm grey | Whips in close on the last beat's tile, pulls back to six tiles (one per beat), a blue ring is drawn, "*Shipped.*" stamp lands (grid shakes); badge hops. |
| s09 | 34.6–38.2 | black (hard cut) | "You describe. / Claude *builds.*" word by word; avatar BIG again, nodding. |
| s10 | 38.2–41.8 | white (hard cut) | Claude logo spins in, "Claude Code", "Your coding partner, *in the terminal.*", Get started button, `npm install -g @anthropic-ai/claude-code`. Hard stop, holds ~2.4 s. Avatar out (Claude is shown only with the logo). |

Voiceover as placed (`voiceover.json`, scene-local `at`): s01 0.1, s02–s07 0.45, s08 1.2, s09 0.2.

## Look

- Type: Inter Tight 500 headlines (100–150 px, −0.045em), accent word in Instrument Serif italic (OFL, local in
  `assets/fonts`), Geist Mono eyebrows and terminal (28 px minimum). Styles in `assets/reel.css`, motion helpers in
  `assets/reel.js` (`Reel.whip`, `words`, `rows`, `clock`, `spin`) on top of `Egg.*` (typeOn, stamp, shake, avatar).
- Whip-pan: `Reel.whip` moves the scene camera a full frame in 0.36 s (power3.inOut) with a horizontal SVG Gaussian
  blur that peaks mid-move; the file wall uses the same filter vertically.
- Halftone avatar (`compositions/narrator.html`): an SVG filter (greyscale, contrast 1.3, alpha table that makes his
  faded shoulders solid so he reads as a cut-out on colour) plus a 9 px dot screen masked to his own alpha
  (`mask: url(assets/avatar/f1.png)`, multiply). Badge = `clip-path: circle()` tween around his face + white disc +
  a ring whose colour follows each section.

## Sound

- Music: `tools/make-music.mjs` (seeded, deterministic) → `assets/music/bed.mp3`, placed as `<audio id="music">`
  in `index.html` at volume 0.55. 116 bpm, C – G – Am – F: soft four-on-the-floor kick, clap on 2 and 4, off-beat
  hats, round sine bass, light Karplus-Strong pluck. Hook = kick + hats + pluck; the band comes in on the first whip;
  the black beat drops the drums for bass, pluck and a pad with a noise riser; one hit (kick + C chord stab + crash) on
  the cut to the end card, ringing out to the hard stop. Ducked −7 dB under every voice line (read from index.html).
  Rerun after any retime.
- SFX: new palette in `tools/make-sfx.mjs` (whip, bloom, pop, tick, key, typing, enter, click, thud, success, error,
  zoom, flurry, pen, chime), cued in each scene's `sfx-cues` and placed by `tools/build-sfx.mjs` (which now reads
  `assets/sfx/lengths.json`).

## Facts used

- Claude Code runs in the terminal, reads and searches the codebase, edits files, runs shell commands (tests, git) and
  can create pull requests (`gh pr create`); install command `npm install -g @anthropic-ai/claude-code`.
- The transcript rows (Read / Edit / Bash / Search with ⎿ results) are simplified stand-ins for Claude Code's tool
  calls, not a pixel copy of its UI. The habit-tracker app, file names, commit hash and PR number are invented.
