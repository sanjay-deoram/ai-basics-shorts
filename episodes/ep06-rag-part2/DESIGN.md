---
version: 2.0
name: Eggshell Studio — AI basics shorts
description: >
  Frame-scale design system for a series of vertical (1080×1920) animated shorts that teach AI
  basics in plain language. Warm eggshell paper, black ink, whisper-weight headlines, and one
  narrator: the stippled Sanjay avatar, who talks, reacts and moves around the frame. Color appears
  only in his glow and the things that come alive (the isometric dot, token tints, the highlighter);
  everything else, the avatar included, is ink on paper.
unit: the frame — 1080×1920 portrait, 30 fps, 60 s maximum
principle: ink on paper · one idea per scene · color only where something comes alive

colors:
  eggshell: "#fdfcfc"     # canvas, cards
  taupe: "#f5f3f1"        # quiet secondary surface (weak answers, iso left face)
  stone: "#ebe8e4"        # hairlines, progress track, iso right face
  btn-border: "#e5e5e5"   # chip and pill borders
  ink: "#000000"          # text, strokes, dark pill
  graphite: "#44403b"     # strong secondary text
  smoke: "#777169"        # body, captions, kickers (lightest text allowed: 4.6:1)
  ash: "#a59f97"          # decoration only, never text (fails contrast)
  violet: "#0447ff"       # avatar glow, iso dot, token tints
  ember: "#ff4704"        # avatar glow, iso dot, token tints
  blush: "#ff7ac0"        # avatar glow, token tints, highlighter
  claude: "#D97757"       # the Claude logo only (assets/claude-logo.svg)
  good: "#157f3c"         # CLEAR stamp only
  good-tint: "#e7f3eb"
  bad: "#b42318"          # VAGUE stamp only
  bad-tint: "#fbe9e7"

typography:  # canvas pixels on the 1080 frame
  display: { fontFamily: "Inter Tight", px: 112, weight: 300, lineHeight: 1.02, tracking: "-0.02em" }
  title:   { fontFamily: "Inter Tight", px: 84,  weight: 300, lineHeight: 1.06, tracking: "-0.02em" }
  label:   { fontFamily: "Inter Tight", px: 64,  weight: 300, lineHeight: 1.2,  tracking: "-0.02em", align: center }
  check:   { fontFamily: "Inter Tight", px: 60,  weight: 300, lineHeight: 1.15, tracking: "-0.02em" }
  iso-label: { fontFamily: "Inter Tight", px: 54, weight: 400, tracking: "-1px" }
  body:    { fontFamily: "Inter", px: 40, weight: 400, lineHeight: 1.4, color: smoke }
  answer:  { fontFamily: "Inter", px: 34, weight: 400, lineHeight: 1.38 }
  caption: { fontFamily: "Inter", px: 44, weight: 500, lineHeight: 1.25 }
  prompt:  { fontFamily: "Geist Mono", px: 38, weight: 400, lineHeight: 1.45 }
  eyebrow: { fontFamily: "Geist Mono", px: 30, weight: 400, tracking: "0.08em", upper: true, color: smoke }
  chip:    { fontFamily: "Geist Mono", px: 28, weight: 400, tracking: "0.06em", upper: true }
  kicker:  { fontFamily: "Geist Mono", px: 24, weight: 400, tracking: "0.08em", upper: true, color: smoke }

radii:
  pill: "9999px"
  card: "44px"
  answer: "36px"

spacing:
  safe-top: "220px"
  safe-bottom: "420px"
  safe-left: "90px"
  safe-right: "130px"
  stack-gap: "26–56px"
  card-pad: "40px 44px"

components:
  egg-card:   { background: eggshell, border: "2px solid stone", radius: card, shadow: whisper, description: "Prompt card. Kicker top-left, stamp top-right, Geist Mono text." }
  egg-card.taupe: { background: taupe, border: none, shadow: none, description: "Weak or neutral answer." }
  egg-stamp:  { radius: pill, description: "VAGUE (bad, ✕ icon) or CLEAR (good, ✓ icon). Lands rotated −4° with a card shake." }
  egg-chip:   { radius: pill, border: "2px solid btn-border", description: "Tip label: 'TIP · BE SPECIFIC'." }
  egg-pill-dark: { background: ink, text: eggshell, description: "The only filled button: the follow CTA." }
  egg-hl:     { description: "Blush highlighter that sweeps under the one key phrase of a good prompt." }
  egg-progress: { description: "6px ink bar on a stone track at y 186, fills across the whole episode." }
  egg-checks: { description: "End-card takeaways: ink circle with an eggshell tick, 60px whisper text." }

motion:
  enter: "power3.out · 0.55s · fade up 36px · 0.08s stagger"
  exit: "power2.in · 0.35s · fade up −20px; scenes end with their content gone"
  pop: "back.out(2.2) · 0.55s · scale 0→1"
  rise: "back.out(1.4) · 0.8s · iso blocks rise 90px"
  draw: "power2.inOut · 0.7s per stroke · 0.4s between strokes"
  type: "34–42 characters per second"
  stamp: "back.out(3) · 0.32s · scale 1.8→1, −12°→−4°, card shake 0.32s"
  zoom: "power2.inOut · 0.6s · scale ≤ 1.04, then back"
  move: "power2.inOut · 1.0s · the iso dot between blocks"
---

# Eggshell Studio — AI basics shorts

The design system for every video in the series. Read it before writing a scene. When a rule here
and a habit from somewhere else disagree, this file wins. When this file changes, update
`assets/eggshell.css` / `assets/eggshell.js` to match in the same change.

## 1. The series

- **Who it's for:** curious people who aren't engineers. Assume no jargon.
- **Voice:** plain, short, friendly sentences. Say "AI" or "Claude", explain any other term the
  first time it appears ("tokens: small word pieces").
- **One idea per scene.** If a scene needs two sentences to explain, it's two scenes.
- **Show, then say.** The drawing, block or prompt appears first; the label confirms it.
- **Every lesson has an example.** Prompting tips always show a weak prompt and a better one, with
  the weak answer and the better answer.

## 2. The frame

- 1080 × 1920, 30 fps, **60 s maximum**. Most episodes land at 30–50 s.
- **Social-safe box:** x 90–950, y 220–1500. Shorts, Reels and TikTok cover the top, the bottom
  420 px (caption, handle, music) and the right edge (like/comment buttons). Text and key drawings
  stay inside the box; the narrator avatar's face does too, though his hair, shoulders and glow may
  peek past the right edge. Backgrounds and decoration may bleed.
- The progress bar sits just above the box at y 186.
- No letterboxing, no frames-within-frames. The paper is the whole screen.

## 3. Color

- The page is 97% achromatic: eggshell, taupe, stone, ink, graphite, smoke.
- **Violet, ember and blush live only where something comes alive:** the soft glow behind the
  narrator avatar, the isometric dot and its landing glow, and the highlighter under a key phrase.
- Green and red are reserved for the CLEAR and VAGUE stamps. Never use them for decoration.
- **Token chips** use soft tints of those three (`--tok-1/2/3`: violet 12%, blush 24%, ember 14%), cycling
  in order. Tokens are what the AI reads and writes, so they get the living colors. Never use the tints for
  anything that isn't a token or a token amount (the context-window squares count).
- Text is ink, graphite or smoke. **Ash is never text** (it fails contrast at 2.6:1).
- **Claude terracotta (#D97757)** appears only in the Claude logo, when a scene shows Claude itself.
- No other colors. No gradients except the avatar's glow and the iso dot.

## 4. Type

- **Inter Tight 300** for anything 54 px and up: hooks, titles, labels, takeaways. Never bold it.
  The whisper weight is the brand.
- **Inter 400/500** for answers, body and captions.
- **Geist Mono** for prompts (they are things you type), eyebrows, chips, kickers and stamps.
- Headlines and labels use balanced wrapping. Hooks are 8 words or fewer.
- Minimum sizes on the 1080 frame: 34 px for anything the viewer must read, 24 px for kickers.
- Fonts are shipped locally in `assets/fonts/`. Never load them from the network at render time.

## 5. The narrator: the Sanjay avatar

A stippled, Pixar-style 3D cut-out of Sanjay (halftone black and white: curly hair, clear glasses,
beard, grey suit, dark tie) narrates every episode. He is the person explaining; he is never the AI.
Spark, the gradient sphere of episodes 01 and 02, is retired: don't use it in new episodes (its helpers
stay in `eggshell.js` only so those cuts rebuild).

**Art** (`assets/avatar/`). Cut from two Gemini sheets that share the same rest face, so every part lines
up: `source-flipbook.jpg` (talking frames, `tools/cut-flipbook.py`) and `source-expressions.jpg` (smile,
doubtful brows, `tools/cut-expressions.py`). The face is always `f1.png`; only feathered patches change
on top of it, so the hair, glasses and stipple never flicker.

| Layer           | File(s)                              | When                                |
| --------------- | ------------------------------------ | ----------------------------------- |
| Rest            | `f1.png`                             | always                              |
| Slightly parted | `mouth-2.png`                        | ee, eh, ah syllables                |
| Small round     | `mouth-7.png`                        | oo, oh, er syllables                |
| Lips pressed    | `mouth-8.png`                        | m, b, p (before or after the vowel) |
| Doubt           | `brows-doubt.png`, `mouth-doubt.png` | one brow up, flat mouth             |
| Smile           | `mouth-smile.png`                    | closed smile                        |

Keep the mouth small: the sheet's open mouths (3–6) read as shouting at narrator size and are not
used. The sheets are 1024 × 1024 (about 220 px per face), so he is a little soft up close; for a
sharper avatar, regenerate both sheets larger in the same pose and re-run the two cut scripts
(re-check their `REG` offsets and the mouth/brow ellipses).

**Talking.** `Egg.avatarTalk` reads `assets/lipsync.js`. `node tools/lipsync.mjs` splits each voice line
in `voiceover.json` into written syllables, gives each a sound (ee/ah/oh) and its m/b/p closures, and
places one mouth beat per syllable on the loudness peaks of that line (where speech runs syllables
together, the widest stretch is split evenly). The mouth half-closes at each hand-off, so every
syllable reads. Rerun it after any voice change.

**Expressions** (`EXPR` in `compositions/narrator.html`, episode seconds, 0.15 s fades). `doubt` on a
wrong, weak or "is it exact?" moment; `smile` on a clear answer, a key insight and the end card. A
talking mouth wins over an expression's mouth; the doubtful brows stay while he talks. One or two
per scene at most.

**Staging.** One narrator overlay covers the whole episode (`compositions/narrator.html`, track 2). He
moves into whatever space the scene leaves empty at that moment:

| Place    | Box top-left, scale (540 × 629 box) | Use                                             |
| -------- | ----------------------------------- | ----------------------------------------------- |
| `title`  | 620, 800, 1.0                        | large peek from the right, under the hook       |
| `tr`     | 760, 188, 0.6                        | top right, beside the eyebrow                   |
| `corner` | 864, 196, 0.46                       | smaller top right, when labels need room        |
| `br`     | 600, 1050, 0.72                      | bottom right, inside the safe box               |
| `bl`     | 90, 1050, 0.72                       | bottom left (faces right)                       |
| `end`    | centred, 196, 0.7                    | above the end-card recap                        |

- **Only park him on empty paper.** Most scenes fill the top first and the bottom last, so the bottom
  spots are free early: move him up or out before the closing line lands. Check every stop with
  `npx hyperframes snapshot` at the times he arrives and leaves.
- **Moves:** glide 0.8 s power2.inOut (he turns to face the content mid-move); slide in 0.55 s
  back.out(1.4); slide out 0.32 s power2.in. A soft `whoosh-short` (0.1–0.16) on each move.
- **Never glide across content**: slide out one edge and back in at the new place instead.
- **Face the content:** mirrored (looking left) on the right half, unmirrored on the left half.
- **Step out** while a scene's pointer is on screen, or when a scene fills the whole box.
- A soft blush/violet glow sits behind him; it is the only gradient on the page besides the iso dot.

**Pointer** (`Egg.pointer`, `Egg.pointTo`, `Egg.pointerHide`). When something on screen needs explaining
step by step, a small flying head of the avatar (about 120 px) hovers about 230 px above the spot, a
dotted ink leader runs down to a dot on it, and a short outlined mono label (≤ 26 chars) sits beside
the head on the side with room. The head glides 0.45 s between stops and turns toward the screen
centre; give each stop at least 0.9 s. Its mouth talks with the voice
(`Egg.lipsync(tl, P.spark, Egg.sceneStart(id), from, to)`). The narrator steps out meanwhile. Variant:
`Egg.pointer(layer, labels, { origin: { x: 912, y: 352 } })` draws the leader from beside the corner
narrator's chin instead (no flying head), with each label at `opts.label { x, y, side }`. Get target
positions from fixed layout or canvas text metrics, never the DOM.

**Claude.** When a scene shows Claude itself (a prompt sent to Claude, Claude answering), use the
Claude logo (`assets/claude-logo.svg`) at the scene's actor spot: it pops in, pulses as the prompt
lands, and turns slowly while Claude answers. The logo file is a drawn stand-in for the Claude mark;
replace it with the official SVG at the same path when available.

## 6. Scene blocks

Every scene is one sub-composition in `compositions/`. The sample episode (`index.html`) contains
one of each; copy the closest one to start a new scene.

| Block                 | File (sample)         | Length      | Use it for                                          |
| --------------------- | --------------------- | ----------- | --------------------------------------------------- |
| Title (hook)          | `s01-title.html`      | 3–4 s       | The question the episode answers                    |
| Whiteboard drawing    | `s02-whiteboard.html` | 6–8 s       | A concept you can picture (library, tokens, wheel)  |
| Isometric steps       | `s03-steps.html`      | 8–12 s      | Anything with 2–5 steps in order                    |
| Prompt before/after   | `s04-prompt.html`     | 8–9 s       | Each prompting tip: weak prompt → better prompt     |
| End card              | `s05-end.html`        | 4–5 s       | 2–4 takeaways and the follow pill under the avatar; holds, no fade |
| Narrator (overlay)    | `narrator.html`       | whole video | The Sanjay avatar: places, moves, expressions, mouth (§5) |
| Chrome (overlay)      | `chrome.html`         | whole video | Progress bar; set `duration` via `data-variable-values` on its host |

More blocks, built for episodes 01–02 (copy from `../episodes/ep01-tokens/compositions/` and
`../episodes/ep02-embeddings-part*-avatar/compositions/`; the ep01 ones still contain Spark: remove it
and stage the narrator avatar instead):

| Block                 | File                  | Length | Use it for                                                    |
| --------------------- | --------------------- | ------ | ------------------------------------------------------------- |
| Token split + zoom    | `s02-pieces.html`     | 8–9 s  | Showing how text breaks into pieces; camera push in and out   |
| Input / output flow   | `s03-inout.html`      | 9 s    | Things going into the AI and coming back out, with counters    |
| Zoom-out grid         | `s04-context.html`    | 7 s    | Comparing sizes: start zoomed on the small one, pull back     |
| Comparison bars       | `s05-prices.html`     | 9 s    | Prices, speeds, sizes across models; bars drawn to scale      |
| Receipt / live math   | `s06-math.html`       | 8 s    | Worked numbers that add up, then a scale-up total             |
| Chat, behind the scenes | `s07-chat.html`     | 11 s   | A real back-and-forth: messages split into tokens, replies stream token by token, Reads/Writes counters, re-read box that scans every earlier token, bars per turn |

**Whiteboard rules:** one drawing per scene, black strokes only (`class="ink"`), no fills, no
hand, no clip art. Draw inside x 150–930, y 520–1200. Each stroke gets `data-draw="n"` for its
order and optional `data-dur`. Every stroke finishes at least 1.5 s before the scene ends; the
label fades in after the last stroke.

**Isometric rules:** steps are `{ title ≤ 26 chars, sub ≤ 22 chars }`; only the last step may have
`repeat: true` (draws a loop arrow and the dot circles it). Blocks alternate left/right and are
generated by `Egg.isoBuild`, so never hand-place them. No shadows, no camera spins, no particles.

**Prompt rules:** weak prompt under 40 characters, better prompt under 110, one highlighted key
phrase (`<span class="egg-hl">`) that is the actual fix. Answers are 1–3 short lines.

## 7. Motion language

All motion is GSAP on one paused timeline per scene, built with the helpers in
`assets/eggshell.js` (`Egg.*`). Use the helper rather than writing a new tween, so timing stays
the same across episodes.

| Move         | Helper                 | Timing                                        | Sound            |
| ------------ | ---------------------- | --------------------------------------------- | ---------------- |
| Enter        | `Egg.fadeUp`           | 0.55 s, power3.out, 36 px, 0.08 s stagger     | —                |
| Exit         | `Egg.fadeOut`          | 0.35 s, power2.in; starts 0.35 s before scene end | —            |
| Pop          | `Egg.pop`              | 0.55 s, back.out(2.2)                         | `pop`            |
| Draw         | `Egg.draw`             | 0.7 s per stroke, 0.4 s apart                 | `click-soft` (every other stroke) |
| Type on      | `Egg.typeOn`           | 34–42 chars/s                                 | `typing` (trimmed to the typing time) |
| Highlight    | `Egg.highlight`        | 0.45 s sweep                                  | `sparkle`        |
| Stamp        | `Egg.stamp`            | 0.32 s, back.out(3), shakes its card          | `error` (VAGUE) / `chime` (CLEAR) |
| Zoom punch   | `tl.to(wrap, scale)`   | 0.6 s to ≤ 1.04, back 0.6 s later             | —                |
| Iso rise     | `Egg.isoAnimate`       | 0.8 s, back.out(1.4)                          | `pop` when the dot lands |
| Dot travel   | `Egg.isoAnimate`       | 1.0 s, power2.inOut                           | `whoosh-short`   |
| Checklist    | `Egg.checks`           | 0.34 s apart                                  | `click`          |
| Token split  | `Egg.tokens`           | cuts 0.12 s apart, then tints 0.1 s apart     | `key-press` per cut |
| Count up     | `Egg.count`            | 1.0–1.3 s, power2.out (seek-safe text)        | `pop` when it appears |
| Meter        | `Egg.meter`            | a counter that changes several times in one scene (Reads 9 → 0 → 18) | `typing` while it counts |
| Token stream | (in `s07-chat.html`)   | one token every 0.15 s, tinted as it appears  | `typing`         |
| Re-read scan | (in `s07-chat.html`)   | each earlier token outlined in turn over ~1.1 s while the meter counts | `typing` |
| Bars         | `Egg.bars`             | 0.7–0.9 s, power3.out, 0.12 s stagger         | `whoosh-short`   |
| Zoom in/out  | `tl.to(cam, scale)`    | 0.7–1.0 s, power2.inOut; push ≤ 1.15, pull-back reveals from 2.0 | `whoosh` |
| Avatar moves | `narrator.html` PATH   | glide 0.8 s / in 0.55 s / out 0.32 s (§5)     | soft `whoosh-short` per move |
| Avatar talk  | `Egg.avatarTalk`       | one mouth beat per syllable (§5)              | —                |
| Pointer      | `Egg.pointTo`          | 0.45 s glide, power2.inOut; label fades in at 60% | soft `whoosh-short` per move |
| Word split   | (in ep01 `s02-pieces.html`) | sentence reads whole first; one cut every 0.9 s; pieces slide apart by transform | `click` per cut |

Pacing: something visibly changes at least every 1.5 s. Hold each finished state for at least
1.2 s before it exits so it can be read.

## 8. Sound

- Sound effects come from `assets/sfx/` (Pixabay license, free for commercial use; credits in
  `assets/sfx/CREDITS.md`).
- Volume 0.2–0.35. SFX sit under any voiceover or music.
- Each scene lists its cues in its `<head>` as `<script type="application/json" class="sfx-cues">`
  with scene-local times. `node tools/build-sfx.mjs` writes them into `index.html` at episode time
  and spreads them across tracks so none overlap. Rerun it after any timing change.
- **Voiceover:** short, plain lines in Sanjay's voice, about 2–3 words per second, written per scene
  in `voiceover.json` (`scene`, `at` seconds from scene start, `text`). The voice is picked by name
  from `voices` (`"voice": "sanjay"` by default; `sheldon` is kept as an alternative); each voice's takes
  are stored side by side, so `node tools/voiceover.mjs --voice=sheldon --place` switches with no API
  calls. `node tools/voiceover.mjs`
  generates each line with Fish Audio (`s2.1-pro-free` unless the account has API credit), measures it,
  flags lines that run past their scene or into the next line, and places them on track 20 at volume 1.
  Unchanged lines are cached. Fix overlaps by moving `at` first, shortening text second.
- Sync the voice to the picture: say a word as it appears (the token split says each piece on its cut).
  The voice adds to the on-screen text; it doesn't need to read every label aloud.
- After the voice, `node tools/lipsync.mjs` (mouth beats for the avatar), then `node tools/build-sfx.mjs`.
- The Fish Audio key is read from `FISH_API_KEY` in the environment, or from `fish.env` (`FISH_API_KEY=…`) at
  the repo root. `fish.env` is gitignored: keep the key on the machine, never commit it.
- No music yet. Captions are not needed while the on-screen text carries the lesson.

## 9. Episode recipe (≤ 60 s)

1. **Hook (3–4 s)**: title card with the question.
2. **Idea (6–8 s)**: a whiteboard drawing that sets up the concept.
3. **How it works (8–12 s)**: isometric steps, or a second drawing.
4. **Lessons (8–9 s each)**: prompt before/after scenes, one per tip; 2–3 per episode.
5. **Recap (4–5 s)**: end card with 2–4 takeaways and the follow pill.

Leave 0 s gaps between scenes; each scene fades its own content out and the paper never changes.

## 10. Making an episode

```bash
node tools/new-episode.mjs ep01-prompting   # copies this kit to ../episodes/ep01-prompting
cd ../episodes/ep01-prompting
# edit compositions/*.html and the scene slots in index.html; write voiceover.json
node tools/voiceover.mjs                     # generate + place the voice (Sanjay)
node tools/lipsync.mjs                       # mouth beats for the avatar
# stage the avatar: PLACES / PATH / EXPR in compositions/narrator.html (set LEN to the episode length)
node tools/build-sfx.mjs                     # place sound cues
npx hyperframes check                        # must pass with 0 errors
npx hyperframes snapshot --at 2,8,15        # look at real frames
npx hyperframes preview --background         # scrub and edit in Studio
npx hyperframes render -o renders/ep01.mp4   # final 1080x1920 MP4
```

**Feedback IDs:** refer to a scene by its slot and a time, e.g. `s03 @ 4.2s · slower dot`, or to a
block by file, e.g. `s04-prompt · swap the answer text`.

## 11. Do / Don't

Do
- Keep every frame readable as a still: a viewer can pause anywhere and understand it.
- Let one thing move at a time; stagger rather than move everything together.
- Use real, correct examples. Check facts in answers.
- Record every fact an episode states, with its source and the date checked, at the top of the
  episode's `STORYBOARD.md`. Prices and model limits change: date them on screen (a small footnote).
- Label illustrative examples as examples on screen (e.g. "Example split").
- Prefer real worked examples with real numbers. If a provider API isn't available, count tokens with an open
  tokenizer (e.g. OpenAI's GPT-4o tokenizer via npm `gpt-tokenizer`) and price with that same model's public price;
  name the model and tokenizer on screen.
- `Egg.count` / GSAP round tiny decimals while tweening. Count money in millionths of a dollar and divide in `fmt`.

Don't
- Add colors, gradients or shadows outside the avatar's glow, the iso dot, cards and the whisper card shadow.
- Bring back Spark, make the avatar play Claude, or open his mouth wider than mouth 2.
- Park the avatar on content, even for a moment; snapshot every stop.
- Bold Inter Tight, use ash for text, or put text outside the safe box.
- Tween `opacity`/`visibility` on a `.clip` element, use `Math.random()`, or fetch at render time.
- Animate layout properties (margin, width, padding of laid-out text) for motion; they snap to whole
  pixels and stutter in the render. Move things with transforms (x, y, scale) and opacity.
- Measure layout (`getBoundingClientRect`, `offsetTop`, `getComputedStyle`) to place or color animated
  elements; scenes are hidden while they build, so measurements come back empty. Use fixed
  coordinates for anything that flies.
