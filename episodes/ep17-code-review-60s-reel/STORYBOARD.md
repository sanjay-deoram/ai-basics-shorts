# Episode 17 (reel cut) · How the Claude Code team does code review, in under 60 seconds (59.6 s, halftone avatar narrator)

`ep17-code-review-60s`'s script, voice and timing rebuilt in the reel style of `ep17-which-model-60s-reel`. Source,
script, trims and facts (and what is illustrative): see `../ep17-code-review-60s/STORYBOARD.md`.

## Style · REEL variant

A full-bleed colour per beat, whip-pans with motion blur instead of cuts, word-by-word grotesk headlines with one italic
serif accent word, `// mono` eyebrows, white cards and one dark window, badge pills (`.rstamp` + `Reel.badge`, white
pill with a coloured icon disc) for every tag and stamp, a hard cut to black for the payoff, hard stop. Theme:
`assets/reel.css` (+ an ep17 code-review section: the layer tracker `.trk`, `.person`, `.vote` ballots, the yellow
marker highlight) and `assets/reel.js`. The fix ("Fix: empty config crash", bug icon) is a badge in every layer.
Claude is shown only with the Claude logo, never next to the avatar.

`assets/vo`, `assets/lipsync.js`, `voiceover.json` and the vo block in `index.html` are the base's, unchanged. The
slots start 0.36 s earlier than the base's (the whip overlap), so `voiceover.json`'s `at` values no longer match:
don't run `tools/voiceover.mjs --place` here. Change the voice in the base folder and copy `assets/vo`,
`assets/lipsync.js` and the vo block across.

## Scenes

Slots overlap by 0.36 s at each whip (the outgoing scene slides out as the next slides in); tracks 1/2 alternate.
Scene-local times are the base's + 0.36 (s01 and s08 unchanged).

| Slot | Time | Canvas | What you see |
|---|---|---|---|
| s01 hook | 0–4.3 | white → yellow | Frame 0 (thumbnail, nothing fades in): `// claude code`, "How the Claude Code team does *code review*" and, big under it, "in under 60 *seconds*" (red 60); the accent punches on its word, the 60 on "sixty"; a pull request slides in with the fix's real diff (config.ts), a lens reads it, a Claude comment "Add a test?" pops off it and blooms yellow. Avatar BIG at the bottom. |
| s02 flood | 3.94–14.6 | yellow | Three Claude marks (`// agents writing code`) throw changes into a to-scale block chart (1 block = 500 a day): May 2,500, Sept 30,000+; "Changes *jumped.*" "Nobody can read all that": the pile jams against one gate with one reviewer. "Stack *layers.*": four sieve layers catch changes. "not one gate": the gate dims, "One gate" struck. Avatar shrinks into the badge. |
| s03 setup | 14.24–19.06 | peach | You → Claude: "Fix the crash when the config file is empty." types in; "Fix a *bug.*"; the dark window shows Claude's fix (config.ts, −1 +1). It folds into the fix badge; a four-stop route: On your machine · AI review · Blocking checks · People, by risk. |
| s04 local | 18.7–26.32 | light blue | `// layer 1`, "On your *machine.*"; the dark window runs tests, build, lint (✓); Claude, who wrote it: "Shows the output, not just 'done'". Writer vs Reviewer context cards (token chips vs only the change, its two diff lines); a scan bar rereads it. |
| s05 review | 25.96–35.84 | pink | `// layer 2`, "In *review.*"; the pull request with the fix badge; four Claude agents probe four bands of the diff (real code) at once, four findings pin. "Group *votes.*": a vote table under three voter marks; two findings posted (ink ring, Important / Pre-existing badges), two struck and dropped; tag legend. |
| s06 gates | 35.48–41.32 | mint | `// layer 3`, "Checks *block.*"; the checks card: security review, lint, type checks, tests on every platform, build, …and dozens more, Claude review "1 open finding". The Merge button's lock snaps shut, it greys and shakes: "Blocked until it's fixed or answered". |
| s07 people | 40.96–48.52 | lavender | `// layer 4`, "People, by *risk.*"; three change badges drop through a risk classifier into LOW (no approver), MEDIUM (one person), HIGH (two people) over a lower → higher risk arrow; "The classifier rates the change, not who wrote it." Hard cut. |
| s08 payoff | 48.52–59.6 | black | "More than *doubled.*": a June → Sept strip; merged pull requests 1× → 2× (More than 2×); share rolled back, Sept shrinks to 60% (Down over 40%); bars at the stated minimum. "Never *approves.*": the AI reviewer's dashed, struck Approve vs a person's real Approve; the two findings post as comments; "Findings, not *approvals.*" lands and punches on the music hit (57.67 s); hold to the hard stop. Avatar BIG under the cards. |

## Narrator

`compositions/narrator.html` (ep15's halftone treatment, retimed): BIG at the bottom of the hook, shrinks into the round
badge bottom-left on the first whip (3.84 s), ring colour per beat; BIG again under the cards on the black beat
(48.52 s) to the end. Scenes keep x < 290 / y > 1290 empty for the badge.

## Sound

- Music: `tools/make-music.mjs` → `assets/music/bed.mp3` (116 bpm, seeded): band in on the first whip (s02, 3.94 s),
  drums drop on the black beat (s08, 48.52 s), one hit as the last voice line ends (57.67 s). Ducked under every vo
  line. Rerun after any retime.
- SFX: the reel palette (`assets/sfx`), cued in each scene's `sfx-cues`, placed by `tools/build-sfx.mjs`.
