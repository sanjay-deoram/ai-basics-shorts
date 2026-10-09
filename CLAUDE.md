# AI basics shorts

Vertical (1080×1920, ≤ 60 s) animated shorts that teach AI basics in plain language, built with
HyperFrames (HTML + GSAP → MP4).

## Layout

- `studio/` — the kit and the sample episode (ep00). `studio/DESIGN.md` is the design system and
  episode recipe; read it before writing or editing any scene.
  - `assets/eggshell.css`, `assets/eggshell.js` — shared styles and the `Egg.*` motion helpers
    (including `Egg.mountAvatar` / `Egg.avatarTalk` for the narrator avatar).
  - `assets/avatar/` — the Sanjay avatar: rest face, mouth / expression patches and the two Gemini
    source sheets. `assets/claude-logo.svg` — the Claude mark, for scenes that show Claude itself.
  - `assets/fonts/`, `assets/sfx/` — local fonts and sound effects (renders must not hit the network).
  - `compositions/` — one sub-composition per scene; the sample has one of each block, plus
    `narrator.html`, the avatar overlay that narrates the whole episode.
  - `voiceover.json` — voice lines; `"voice": "sanjay"` (Fish Audio) by default, `sheldon` kept as an option.
  - `tools/new-episode.mjs` — copies the kit to `episodes/<slug>`.
  - `tools/voiceover.mjs` — generates and places the voice lines (key from `FISH_API_KEY` or the
    gitignored `fish.env` at the repo root).
  - `tools/lipsync.mjs` — loudness per frame and one mouth beat per syllable for the avatar.
  - `tools/build-sfx.mjs` — writes each scene's sound cues into `index.html`.
  - `tools/cut-flipbook.py`, `tools/cut-expressions.py` — rebuild `assets/avatar` from the source sheets.
- `episodes/<slug>/` — one HyperFrames project per episode.
- `explorations/` — design explorations: the original storyboards, `narrator-auditions.html`, and the
  avatar test clips `avatar-peek` (v1), `avatar-peek-v2`, `avatar-peek-v3` (the chosen look).

## Rules

- Follow `studio/DESIGN.md` exactly: Eggshell palette, the Sanjay avatar as narrator, safe box x 90–950 /
  y 220–1500, motion through `Egg.*` helpers, one idea per scene, a weak and a better example for every tip.
- Every new episode is narrated by the Sanjay avatar in Sanjay's voice. Spark is retired: don't use it in
  new episodes. Stage the avatar only on empty paper (check each stop with snapshots); show Claude with
  the Claude logo, never with the avatar.
- Load the `/hyperframes` and `/hyperframes-core` skills before writing composition HTML.
- After any change: `node tools/lipsync.mjs` (if the voice changed), `node tools/build-sfx.mjs`, then
  `npx hyperframes check` (0 errors), then snapshot the changed scenes and look at them before rendering.
- FFmpeg is installed via winget; if a shell can't find it, prepend
  `%LOCALAPPDATA%\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin`
  to PATH.
- Feedback refers to scenes by slot and time, e.g. `s03 @ 4.2s · slower dot`.
