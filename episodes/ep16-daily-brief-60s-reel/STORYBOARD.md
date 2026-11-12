# Episode 16 (reel cut) · Build a daily brief agent in under 60 seconds (59.82 s, halftone avatar narrator)

`ep16-daily-brief-60s-apple`'s script, voice and timing (`assets/vo`, the vo block in `index.html`, `assets/lipsync.js`)
rebuilt in the ep14/ep15 reel style: a full-bleed colour per beat, whip-pans with motion blur instead of cuts,
word-by-word grotesk headlines with one italic serif accent word and a `// mono` eyebrow, one dark editor / terminal
window that keeps changing between beats, rubber stamps, a hard cut to black, hard stop.
Source, script and facts: see `../ep16-daily-brief-60s-apple/STORYBOARD.md`.

`voiceover.json` is the apple cut's (its `scene` ids are the apple slots), so don't run `tools/voiceover.mjs --place`
here: change the voice in the apple folder and copy `assets/vo`, `assets/lipsync.js` and the vo block across.

## Scenes

Slots overlap by 0.36 s at each whip (the outgoing scene slides out as the next slides in); tracks 1/2 alternate.

| Slot | Time | Canvas | What you see |
|---|---|---|---|
| s01 hook | 0–4.66 | white → blue | Frame 0: `// managed agents` and the post (Daily brief, Tue Nov 17). "Build a daily *brief* agent." word by word; 7:34 AM lights on "every morning"; UNDER 60 SEC stamp; a blue bloom grows from the post's app tile. Avatar BIG at the bottom. |
| s02 what | 4.3–10.66 | blue | The agent (Claude logo disc) pops on "agent"; "Reads Slack + GitHub. Posts a *brief.*"; Slack and GitHub pills join it with drawn lines, `weekdays 7:32` chip, a line down to a compact post. Avatar shrinks into the badge. |
| s03 example | 10.3–15.16 | peach | "It's *Tuesday.*" Counters run to 140 (// slack messages) and 25 (// pull requests) as overnight messages and PRs rain into a pile. |
| s04 agent | 14.8–21.56 | light blue | "Step one: *agent.md*"; the dark editor types the file, each part flashing on its word (model, tools, run steps). |
| s05 rule | 21.2–25.86 | pink | Step 4 quoted; "Only if it needs you *today.*"; four of Tuesday's items land stamped: Acme can't log in IN, Lunch order is in SKIP, 12 pull requests open SKIP (// just a count), PR #482 needs your review IN; on "today" the IN items light green, the skips fade. |
| s06 daily | 25.5–33.11 | lavender | "Step two: *deployment.md*"; the file types; cron "32 7 * * 1-5" taken apart (minute / hour / any day / any month / Mon–Fri), fields lighting on "Weekdays", "seven", "thirty-two"; $5 CAP / RUN stamp on the budget line. |
| s07 memory | 32.75–42.66 | mint | "Step three: *memory.*"; two folders: preferences/ (// you write it: preferences.md, read / length / mention) and state/ (// the agent's notes: bookmarks.json where it stopped, ledger.md what it told you, runs/ a log per run); "two folders · kept between runs" chip, "// every run opens both at /mnt/memory/"; READ-ONLY stamp with a lock on "never change"; bookmarks.json lights on "bookmark". |
| s08 bookmark | 42.3–49.58 | teal | "Starts where it *stopped.*"; state/bookmarks.json = Mon 7:33 AM; timeline: bookmark, Tue 7:32 scheduled, late run Tue 9:10; "// without a bookmark: last 24 hours" leaves a hatched gap stamped MISSED; "// with a bookmark: from where it stopped" covers it, NOTHING MISSED. |
| s09 apply | 49.22–53.6 | yellow | "Then run *ant apply.*"; the terminal types the command, six resources tick in, "runs Mon–Fri · 7:32 AM"; "the brief arrives": the post lands, ✓ posted. Hard cut. |
| s10 black | 53.6–59.82 | black | "Can't read a source? It *says so.*"; slack ✓ read, github ✕ couldn't be read; the post types its last line "github: couldn't be read.", HONEST stamp; "// without that line" "Nothing new today." stamped QUIET DAY?, shakes and fades; the post punches on the music hit (58.42); hold to the hard stop. Avatar BIG under the cards. |

## Narrator

`compositions/narrator.html` (ep15's halftone treatment, retimed): BIG at the bottom of the hook, shrinks into the round
badge bottom-left on the first whip (4.2 s), ring colour follows each beat; BIG again (lower, under the cards) on the
black beat to the end. Claude appears only as the Claude logo, never on or next to the avatar.

## Sound

- Music: `tools/make-music.mjs` → `assets/music/bed.mp3` (116 bpm, seeded): band in on the first whip (s02), drums drop on
  the black beat (s10), one hit as the last voice line ends (58.42 s). Ducked under every vo line. Rerun after any retime.
- SFX: the ep14 reel palette, cued in each scene's `sfx-cues`, placed by `tools/build-sfx.mjs`.
