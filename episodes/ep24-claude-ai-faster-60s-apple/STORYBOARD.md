# Episode 24 · How Claude made claude.ai 3× faster in two weeks, in under 60 seconds (55.24 s, avatar narrator)

*Under 60 seconds* series, W47 T7 (posting Mon Nov 23). Script, caption, YouTube title and fact list approved 2026-11-14
(`growth/topics/2026-W47-scripts.md`, T7). Facts only from that list; no source is cited in the voice. The voice says
"claude dot A I"; the screen shows claude.ai.

## Style · APPLE (base build)

ep21 apple look plus the W47 kit (end of `assets/apple.css`). Other looks: `node studio/tools/make-looks.mjs ep24-claude-ai-faster-60s`.

## Script (149 words, as placed)

| Slot | At (s) | Line |
|---|---|---|
| s01 | 0.10 | Here's how Claude made claude dot A I three times faster in two weeks, in under sixty seconds. |
| s02 | 6.51 | Say the message box is slow, because you can't type until the page loads. |
| s03 | 10.93 | First, someone reports the slow spot. Second, Claude builds a benchmark that reproduces it. Third, Claude opens small pull requests behind a flag, an on-off switch, and watches real-world timings. |
| s04 | 24.18 | The benchmark counts CPU instructions, not milliseconds, because clock timing is too noisy. |
| s05 | 30.09 | If it got faster, a daily job lowers the allowed count, and any pull request that raises it fails. If not, the flag goes off and Claude tries again. |
| s06 | 39.79 | One fix bakes an HTML copy of the message box into the page, so you can type while the rest loads. |
| s07 | 46.25 | Overall, the wait before you can type fell from three point one seconds to about half a second, and a person approved every change. |

## Scenes

| Slot | Time | What you see |
|---|---|---|
| s01 hook | 0–6.34 | Frame 0: the full title "How Claude made claude.ai 3× faster in two weeks" + big blue "60 seconds"; "3×" tints on "three times". |
| s02 slow | 6.34–10.76 | "The box is slow": claude.ai window (Claude mark) loading, the message box greyed "not ready"; a tap does nothing; load bar to 3.1 s, "Fresh load, until you can type". |
| s03 loop | 10.76–24.01 | "One slow spot, three steps": 1 the report, 2 Claude's benchmark (fresh load → first input, ✓ reproduced), 3 a small PR behind a flag (diff), the flag switch turns on; "watching: deploy + field data". |
| s04 cpu | 24.01–29.92 | "Instructions, not milliseconds": CPU instructions 1.90M every run (steady) vs 41 / 38 / 52 / 44 ms (noisy). |
| s05 ratchet | 29.92–39.62 | "The limit only goes down": ceiling 1.90M → 1.88M, daily job lowered ✓, a PR raising it to 1.93M → FAILED CI; if it isn't faster, the flag switches off, "Claude tries again". |
| s06 static | 39.62–46.08 | "Type while the rest loads": index.html with the static composer markup, then what it renders: two claude.ai windows on one throttled-4G clock. Before: a spinner until 2.93 s. With the HTML copy: the message box is live at 0.36 s and "Plan a 3-day trip to Lisbon" types in while the greeting, sidebar and send button load around it. |
| s07 result | 46.08–55.24 | "Time until you type": 3.1 s → 0.55 s (fresh load of claude.ai); the PR stamped "Approved by a person"; Employees → 1% of users → everyone; 3.1× faster on average across 13 measurements. Hard stop. |

## Illustrative parts

The report's wording, the flag name (static-composer / flags.staticComposer), the diff and the index.html markup, the
ceiling numbers (1.90M → 1.88M, 1.93M), the instruction and millisecond samples, the "Type a message" placeholder, and the rendered windows' contents ("Good evening", the recents list, "Plan a 3-day trip to Lisbon").
Everything else (3.1× over 13 measurements, 3.1 s → 0.55 s, 2.93 s → 0.36 s on throttled 4G, the loop, CPU instructions,
the daily ratchet, human approval, the rollout) comes from the article.
