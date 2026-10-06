# AI basics shorts

Vertical (1080×1920, ≤ 60 s) animated shorts that teach AI basics in plain language, built with
[HyperFrames](https://hyperframes.heygen.com) (HTML + GSAP → MP4). See `CLAUDE.md` for the layout and
rules, and `studio/DESIGN.md` for the design system and episode recipe.

## Episodes

| Episode | Video |
| --- | --- |
| 01 · What is a token? | [`ep01-tokens.mp4`](episodes/ep01-tokens/renders/ep01-tokens.mp4) |
| 01 · What is a token? (with narrator) | [`ep01-tokens-narrator.mp4`](episodes/ep01-tokens-narrator/renders/ep01-tokens-narrator.mp4) |

## Setup on a new machine

1. Install [Node.js](https://nodejs.org) (LTS) and FFmpeg (`winget install Gyan.FFmpeg`), then open a
   new terminal so both are on `PATH`.
2. `git clone https://github.com/Sanjay-Deoram/ai-basics-shorts.git`
3. Work inside an episode folder; the HyperFrames CLI runs through `npx`, so there is nothing to install:

   ```sh
   cd episodes/ep01-tokens
   npm run dev       # preview in the browser
   npm run check     # lint + validate (expect 0 errors)
   npm run render    # writes renders/*.mp4
   ```

4. New episode: `node studio/tools/new-episode.mjs <slug>` (see `studio/DESIGN.md`).
5. Voiceover audio is committed, so renders work offline. Generating new lines needs a Fish Audio key
   in the environment only: `FISH_API_KEY=… node tools/voiceover.mjs` (never commit the key).

For Claude Code, install the HyperFrames skills (`/hyperframes`, `/hyperframes-core`) on the new machine
too; `CLAUDE.md` expects them.

Local preview state (`.hyperframes/`, `.thumbnails/`, `.waveform-cache/`) and all renders except the
two episode videos above are git-ignored.
