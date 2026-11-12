# Episode 16 (reel cut) · Build a daily brief agent in under 60 seconds (55.15 s, halftone avatar narrator)

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
| s01 hook | 0–4.71 | white → blue | Frame 0: `// managed agents` and the post (Daily brief, Tue Nov 17). "Build a daily *brief* agent." word by word; 7:34 AM lights on "every morning"; UNDER 60 SEC stamp; a blue bloom grows from the post's app tile. Avatar BIG at the bottom. |
| s02 what | 4.35–10.81 | blue | The agent (Claude logo disc) pops on "agent"; "Reads Slack + GitHub. Posts a *brief.*"; Slack and GitHub pills join it with drawn lines, `weekdays 7:32` chip, a line down to a compact post. Avatar shrinks into the badge. |
| s03 example | 10.45–15.31 | peach | "It's *Tuesday.*" Counters run to 140 (// slack messages) and 25 (// pull requests) as overnight messages and PRs rain into a pile. |
| s04 agent | 14.95–21.86 | light blue | "Step one: *agent.md*"; the dark editor types the file, each part flashing on its word (model, tools, run steps). |
| s05 rule | 21.5–25.56 | pink | Step 4 quoted; "Only what you'd act on *today.*"; weak "12 open reviews" stamped A COUNT, better "PR #482 is blocked on your review · day 2" stamped ACT TODAY; the count shakes and fades. |
| s06 daily | 25.2–32.96 | lavender | "Step two: *deployment.md*"; the file types; cron "32 7 * * 1-5" taken apart (minute / hour / any day / any month / Mon–Fri), fields lighting on "Weekdays", "seven", "thirty-two"; $5 CAP / RUN stamp on the budget line. |
| s07 memory | 32.6–40.36 | mint | "Step three: *memory.*"; preferences (lock, READ-ONLY stamp) and state cards; bookmarks.json; timeline from Monday's bookmark to a late Tuesday run, NOTHING MISSED stamp. |
| s08 apply | 40–47.4 | yellow | "Then run *ant apply.*"; the terminal types the command, six resources tick in; a fresh session for Tue 7:32 AM reads from bookmarks (GitHub unreadable), re-checks, `chat.postMessage → "ok": true`; the post lands, ✓ posted. Hard cut. |
| s09 black | 47.4–55.15 | black | "No server to keep *alive.*"; the post; its last line types "github: unreadable this run.", HONEST stamp; weak "Nothing new today." stamped QUIET DAY?, shakes and fades; the post punches on the music hit (53.45); hold to the hard stop. Avatar BIG under the cards. |

## Narrator

`compositions/narrator.html` (ep15's halftone treatment, retimed): BIG at the bottom of the hook, shrinks into the round
badge bottom-left on the first whip (4.25 s), ring colour follows each beat; BIG again (lower, under the cards) on the
black beat to the end. Claude appears only as the Claude logo, never on or next to the avatar.

## Sound

- Music: `tools/make-music.mjs` → `assets/music/bed.mp3` (116 bpm, seeded): band in on the first whip (s02), drums drop on
  the black beat (s09), one hit as the last voice line ends (53.45 s). Ducked under every vo line. Rerun after any retime.
- SFX: the ep14 reel palette, cued in each scene's `sfx-cues`, placed by `tools/build-sfx.mjs`.
