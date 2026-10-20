# Episode 12 · Shot prompting · "Halftone" look (v2, 69.6 s)

Chosen look from the 2026-10-18 style trial (the other trial: `../ep12-shot-prompting-paper`). v2 after the user's
notes: colour-code user vs assistant turns, explain *why* and *where* each technique is used, more visuals (camera
zooms, callouts that point things out, varied transitions, new sound effects), "make it like you're teaching".
Render: `renders/ep12-shot-prompting-halftone-v2.mp4` (v1, same visuals as the trial: `renders/ep12-shot-prompting-halftone.mp4`).

## Look (`assets/halftone.css`, helpers in `assets/fx.js`)
White, ink, electric blue `#1f5bff`; Inter Tight headlines with Instrument Serif italic accents; Geist Mono labels;
chrome = "// 03 — zero-shot" + running timecode (fades while the camera is zoomed in).
**Turn colours:** system = grey, user = orange `#c2410c`, assistant = blue with the Claude logo. Introduced by the
"// who's talking" legend in s02 and repeated as a legend on the messages card.
**Teaching moves:** `FX.zoom` / `FX.unzoom` (camera on a `.cam` wrapper, modest scale ≤ 1.6, target kept in frame),
`FX.callout` (a ring draws around something + a label chip), `FX.arrow` (drawn arrows), `FX.hl` (highlight sweep).
Transitions: push-through (s01), push left (s02), blue wipe up (s03 → s04), blue wipe from the left (s05), blue lift (s07),
card flip (good fit → replies).
**Sound:** new synthesized set in `assets/sfx` (zoom-in, zoom-out, tick, blip, thud, swish, draw, riser) plus typing,
click, error, chime.
Sanjay: big beside the hook; an "// on air" card bottom right for s02–s06 that slides off-screen during every zoom
(ZOOMS in `compositions/narrator.html`, same windows in `chrome.html`); big again for the rule of thumb.

## Script (one Sanjay take, speed 1.05, 16 pauses trimmed to 0.22 s → 69.1 s; raw in `assets/vo/*.untrimmed.mp3`)
"[excited] Let's look at zero-shot, one-shot, and few-shot prompting, and when to use each. A shot is one example, an input paired with the output you want back. The model copies patterns from your prompt, so examples teach it your format and your labels. Say you're sorting support tickets into high, medium, or low. Zero-shot sends just your instruction and the ticket. It's the cheapest, and it works for tasks the model already knows, like summarizing. But it picks its own format, so one call returns a word, and the next returns a sentence that breaks your parser. One-shot adds one example before the real ticket. You write a user turn with a missing password reset email, then an assistant turn that answers low. That usually fixes the format, so use it when you need a set shape, like JSON. But the model has only seen low, so it has to guess where high begins. Few-shot uses three to five examples across the whole scale, so you add a payment outage marked high, and an invoice question marked medium. Use it for classifiers and data extraction, where your own categories matter. The labels get more consistent, but every request carries those examples, so the prompt gets longer. [excited] So start with zero-shot. Add one example when the format keeps changing, and add a few when the labels are inconsistent. Follow for more AI basics!"

## Scenes
| Slot | Time | What you see |
|---|---|---|
| s01 | 0–4.9 | "Zero-shot, one-shot, and *few-shot* prompting, *and when to use each.*" beside big Sanjay; push-through. |
| s02 | 4.9–13.85 | "A shot is *one example.*" // shot: user turn → assistant turn, ring "one shot"; // who's talking legend. "It copies *the pattern.*": the shot shrinks, an arrow carries it to a new ticket, reply in the same shape; rings "your format", "your labels". |
| s03 | 13.85–29.75 | "Sort every *ticket.*" + labels. "Zero-shot, *no examples.*" // prompt (system + user), "examples 0 · ~30 tokens" ringed "cheapest"; // good fit: summarizing, translating, rewriting; Run → flip to // replies; zoom in: call 1 High ("a word"), call 2 a sentence ringed "not a label", ValueError. |
| s04 | 29.75–45.35 | "One-shot, *one example first.*" // messages with legend; zoom in while the example slot fills (user → assistant Low), ring "one shot", "+1 example". // replies: High, High "same format", `{"label": "High"}` "a set shape". // scale 1 / 3, LOW ringed "only one seen"; zoom on the track while a ? hops. |
| s05 | 45.35–56.2 | Blue. "Few-shot, *the whole scale.*" + "3–5 examples". Example cards (user over assistant): Low, High, Medium; the camera visits High and Medium ("marked high", "marked medium"). // good fit: classifiers, data extraction, *where your own categories matter*. |
| s06 | 56.2–61.4 | Blue. "More consistent, *but longer.*" run 1–3 High; request bars with the example pairs (orange / blue) ringed "sent every time"; // prompt size ~30 → ~90 tokens, *on every request*. |
| s07 | 61.4–69.6 | "Start with *zero-shot.*" // rule of thumb: format keeps changing → add one example; labels are inconsistent → add a few. "AI basics" + Follow for more. |

Token counts are rough, illustrative estimates (shown with ~).
