# Episode 12 · Zero-shot vs one-shot vs few-shot prompting (68.0 s, sketchbook format, avatar narrator)

Built 2026-10-18 (render: `renders/ep12-shot-prompting.mp4`). The first episode in the **sketchbook** look the user
asked to try: everything is drawn on one spiral sketch pad with wobbly hand-drawn lines, marker colours and
hand-lettered type, with camera zooms and pans around the page. It deliberately departs from the Eggshell palette
in DESIGN.md (user request); the Sanjay avatar still narrates in Sanjay's voice.

## v2 (2026-10-18, user feedback)

"A lot of things aren't in the frame; code can be in an IDE/terminal; the sketching noise is overdone; the circles
around Low / High / Medium are offset; polish it further; replace the camera/photo thing." Changes:
- **Framing:** every camera move is `Sk.frame(box)`, which fits the target inside the safe box (x 90–950,
  y 250–1480) and caps zoom at 1.3, so whatever is framed is fully in view.
- **Calmer lines:** single-stroke rough.js lines (roughness 0.75, no double strokes), no line boil, lighter grain.
- **Rings and underlines live inside the word** (`Sk.ring`, `Sk.underline`: an SVG stretched over the element), so
  they are always centred whatever the word's width.
- **Sticky notes instead of the camera/polaroids:** each example ("shot") is a coloured sticky note stuck onto the
  prompt card (`Sk.promptCard`): three note spots, empty and dashed for zero-shot, one filled for one-shot, three for
  few-shot. The same notes appear in the hook and the recap.
- **s06 is a real editor + terminal** (dark IDE window, not drawn): `code/shots.py` exactly, run in the terminal
  (zero-shot 109 characters, few-shot 273). `code/ask_claude.py` (off screen) sends the few-shot prompt to Claude.
- Avatar: a small "low" place under the editor in s06.

## The sketch kit (this episode only, for now)

- `assets/sketch.css`: paper, ink and marker colours (High red / Medium orange / Low green; zero-shot blue,
  one-shot purple, few-shot teal), Kalam / Patrick Hand / Caveat (local woff2, from @fontsource 5.3.0), polaroids.
- `assets/rough.js` (roughjs 4.6.6, vendored) draws every shape with a fixed seed, so renders are identical.
- `assets/sketch.js` (`Sk.*`): `shape`, `arrow`, `highlight`, `bubble`, `sparkle`; `draw` (strokes draw on via
  `pathLength=1` + dash offset), `write` (left-to-right hand-written reveal), `pop`, `slap` (paper thrown onto the
  page), `focus` / `home` / `punch` (camera), `boil` (line boil: displacement noise reseeded 8×/s), `pageOut`
  (the sheet tears off between scenes).
- `compositions/chrome.html`: the spiral binding, a paper band the camera scrolls under, a pencil progress line,
  and paper grain over everything. The narrator's soft glow is replaced by a scribbled highlighter blob.
- New sounds `pencil`, `pencil-short`, `page`, `shutter` were synthesised with ffmpeg (see `assets/sfx/CREDITS.md`).

## Facts used (checked 2026-10-18; internal only, never cited in the video)

- IBM, "Zero-shot vs. few-shot prompting" (ibm.com/think/topics/zero-shot-vs-few-shot-prompting): zero-shot = a
  task with no examples; few-shot = a handful of examples, typically 3–5; few-shot gives more consistent results and
  anchors format, at the cost of a longer prompt; start zero-shot and add examples when outputs are inconsistent.
  The running example (classify a customer issue as High / Medium / Low; the password-reset, payment-outage and
  invoice examples; "I can't access my account and need to submit a report by end-of-day") is IBM's, lightly shortened.
- IBM, "One-shot prompting": exactly one example.
- The two replies in s03 and the "Priority: High" replies are illustrative, not real model output.
- s06 terminal: the real output of `python3 code/shots.py` (zero-shot 109 characters, few-shot 273).

## Script review

Drafted, then reviewed in a fresh context by a second agent (2026-10-18). Applied: softened claims ("much more likely
to answer high"), examples voiced as "marked low / high / medium" so they don't sound like facts, the one-shot
weakness spelled out ("it has to guess what counts as high"), the cost trade-off added, a vague code line dropped.

## Voice

One Sanjay take at speed 1.0 (69.6 s raw, `assets/vo/s01-ba317b34.untrimmed.mp3`); the 13 pauses longer than 0.4 s
were trimmed to 0.3 s with ffmpeg, giving 66.6 s (`s01-ba317b34.mp3`). Word timings: `assets/vo/transcript.json`.

"[excited] What's the difference between zero-shot, one-shot, and few-shot prompting? A shot is just an example you put in your prompt. With zero-shot, you give the AI a task and no examples. Say you ask it to rate a customer issue as high, medium, or low priority, and the issue says, I can't access my account, and my report is due today. It will probably say high, but it picks its own format, so one reply might be a single word, and the next might be a whole paragraph. With one-shot, you first show it one example, like a missing password reset email, marked low. Now it copies your format, but it has only seen low, so it has to guess what counts as high. With few-shot, you give it a handful, usually three to five. You add a payment system that's down, marked high, and an invoice question, marked medium. Now it sees your whole scale, so it's much more likely to answer high, and in the same format. Examples make the prompt longer, so start with zero-shot, and add them when the answers aren't consistent. [excited] So zero-shot means no examples, one-shot means one example, and few-shot means a handful. Follow for more AI basics!"

## Scenes

| Slot | Time | Scene | What you see |
|---|---|---|---|
| s01 | 0–4.45 | Hook | "Prompting:" highlighted; Zero-shot / One-shot / Few-shot written in their colours with circled 0 / 1 / 3+; camera pulls back. Avatar: title. |
| s02 | 4.45–7.2 | What a shot is | Camera doodle flashes ("click!"), a polaroid "an example" slides out; "1 shot = 1 example"; it drops into a "your prompt" card. |
| s03 | 7.2–27.05 | Zero-shot | Prompt card with an empty dashed example slot; zoom to the instruction (High / Medium / Low light up), to the issue as it's written; arrow → AI; reply 1 "High" ("one word"), reply 2 a paragraph ("a whole paragraph!"). Avatar: corner 7.35–11.0. |
| s04 | 27.05–37.95 | One-shot | Example strip #1 clicks into the slot, "Low" circled; reply "Priority: High" linked by a dotted "same format ✓" arrow; pan to the scale: Low ✓, Medium ?, High ? wobbles, "has to guess!". Avatar: corner 27.15–29.0. |
| s05 | 37.95–52.55 | Few-shot | Three slots; #1 taped in, badge 3–5; #2 payment system → High, #3 invoice → Medium (each clicks in); the scale ticked all across; reply "Priority: High" ✓ circled, "same format ✓". Avatar: corner 38.05–41.75. |
| s06 | 52.55–58.3 | In code | `code/shots.py` lines 1–8; prompt-length bars (zero-shot vs few-shot); shots scribbled out ("start here"), then rubbed out, bracketed "+" and the long bar circled. Avatar: br. |
| s07 | 58.3–68.0 | Recap | 0 Zero-shot · no examples / 1 One-shot · one example / 3–5 Few-shot · a handful of examples, each ticked; "Follow for more" pill. Avatar: end, smiling. |
