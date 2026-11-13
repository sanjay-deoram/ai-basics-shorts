# Episode 17 (reel cut) · Which Claude model should you build with? In under 60 seconds (59.16 s, halftone avatar narrator)

`ep17-which-model-60s-apple`'s script, voice and timing (`assets/vo`, the vo block in `index.html`, `assets/lipsync.js`)
rebuilt in the ep14–ep16 reel style: a full-bleed colour per beat, whip-pans with motion blur instead of cuts,
word-by-word grotesk headlines with one italic serif accent word and a `// mono` eyebrow, one dark window, rubber
stamps, a hard cut to black, hard stop. Source, script and facts: see `../ep17-which-model-60s-apple/STORYBOARD.md`.

`voiceover.json` is the apple cut's (its `scene` ids are the apple slots), so don't run `tools/voiceover.mjs --place`
here: change the voice in the apple folder and copy `assets/vo`, `assets/lipsync.js` and the vo block across.

## Scenes

Slots overlap by 0.36 s at each whip (the outgoing scene slides out as the next slides in); tracks 1/2 alternate.

| Slot | Time | Canvas | What you see |
|---|---|---|---|
| s01 hook | 0–3.9 | white → yellow | Frame 0: `// claude models` and the four model tiles. "Which Claude *model?*" word by word; UNDER 60 SEC stamp on the row; a yellow bloom grows out of the Haiku tile. Avatar BIG at the bottom. |
| s02 four | 3.54–12.55 | yellow | "Four, small to *big.*"; the tiles land as a staircase, each on its name; a black scale bar; CHEAP + FAST stamped on Haiku, HARDER WORK on Fable. Avatar shrinks into the badge. |
| s03 jobs | 12.19–20.75 | peach | "Four *jobs.*"; job cards slide in as said (tickets count to 10,000), each stamped MODEL?. |
| s04 opus | 20.39–29.15 | light blue | "Start on *Opus.*"; the dark window: Opus 5.5 `// the daily driver`; the effort switch snaps to medium, steps to max as the thinking bar grows, back to medium; job 3 Fix a tricky bug, OPUS ✓. |
| s05 haiku | 28.79–36.6 | pink | "Move *down.*"; chips `// simple jobs`, `// someone's waiting`; job 1 Tag 10,000 tickets, HAIKU ✓; input price per million tokens, Opus $4.00 vs Haiku $0.10, 1/40 THE PRICE. |
| s06 sonnet | 36.24–39.6 | mint | "Chat goes to *Sonnet.*"; job 2 Reply in chat, SONNET ✓; "Where's my order?" / "It ships today.", FAST!. |
| s07 up | 39.24–49.4 | lavender | "Falls *short?*"; job 4 Migrate the database (on opus), FALLS SHORT; the dark window lists the order as said: 1 check its own work (✓ tests pass), 2 raise the effort (medium → high), 3 then move up (opus → fable); the red stamp lifts, FABLE ✓. Hard cut. |
| s08 black | 49.4–59.16 | black | "Cost per *task,* not per token."; price per token Opus $4 / Fable $8, 2× PER TOKEN; FrontierCode 2.0: Opus · max 45.5%, Fable · high 45.3%, SAME SCORE; cost per task bars, ½ THE COST; the card punches on the music hit (57.56); hold to the hard stop. Avatar BIG under the cards. |

## Narrator

`compositions/narrator.html` (ep15's halftone treatment, retimed): BIG at the bottom of the hook, shrinks into the round
badge bottom-left on the first whip (3.44 s), ring colour per beat; BIG again (lower, under the cards) on the black beat
(49.4 s) to the end. Claude appears only as the Claude logo, never on or next to the avatar.

## Sound

- Music: `tools/make-music.mjs` → `assets/music/bed.mp3` (116 bpm, seeded): band in on the first whip (s02), drums drop on
  the black beat (s08), one hit as the last voice line ends (57.56 s). Ducked under every vo line. Rerun after any retime.
- SFX: the ep14 reel palette, cued in each scene's `sfx-cues`, placed by `tools/build-sfx.mjs`.
