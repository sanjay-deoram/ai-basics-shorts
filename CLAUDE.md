# AI basics shorts

Vertical (1080×1920, ≤ 60 s) animated shorts that teach AI basics in plain language, built with
HyperFrames (HTML + GSAP → MP4).

## Layout

- `studio/` — the kit and the sample episode (ep00). `studio/DESIGN.md` is the design system and
  episode recipe; read it before writing or editing any scene.
  - `assets/eggshell.css`, `assets/eggshell.js` — shared styles and the `Egg.*` motion helpers.
  - `assets/fonts/`, `assets/sfx/` — local fonts and sound effects (renders must not hit the network).
  - `compositions/` — one sub-composition per scene; the sample has one of each block.
  - `tools/new-episode.mjs` — copies the kit to `episodes/<slug>`.
  - `tools/build-sfx.mjs` — writes each scene's sound cues into `index.html`.
- `episodes/<slug>/` — one HyperFrames project per episode.
- `explorations/` — the original design and storyboard explorations (published as an artifact).

## Rules

- Follow `studio/DESIGN.md` exactly: Eggshell palette, Spark mascot, safe box x 90–950 / y 220–1500,
  motion through `Egg.*` helpers, one idea per scene, a weak and a better example for every tip.
- Load the `/hyperframes` and `/hyperframes-core` skills before writing composition HTML.
- After any change: `node tools/build-sfx.mjs`, then `npx hyperframes check` (0 errors), then
  snapshot the changed scenes and look at them before rendering.
- FFmpeg is installed via winget; if a shell can't find it, prepend
  `%LOCALAPPDATA%\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin`
  to PATH.
- Feedback refers to scenes by slot and time, e.g. `s03 @ 4.2s · slower dot`.
