# Episode 20 · Why Uber treats AI agents like insiders, in under 60 seconds (57.6 s, avatar narrator)

*Under 60 seconds* series, W47 T3 (posting Thu Nov 19). Source: *Uber's CISO on building an insider threat program for
AI* (interview with Philip Martin, https://claude.com/resources/articles/uber-s-ciso-on-building-an-insider-threat-program-for-ai,
Oct 13 2026). Script approved 2026-11-14 (`growth/topics/2026-W47-scripts.md`: caption, YouTube title, full fact list).
Uber is named as text only: no Uber logo anywhere.

## Style · APPLE (base build)

ep17 apple look plus the W47 kit (end of `assets/apple.css`). Other looks: `node studio/tools/make-looks.mjs ep20-uber-agent-insiders-60s`.

## Script (149 words, as placed)

| Slot | At (s) | Line |
|---|---|---|
| s01 | 0.10 | Here's why Uber treats A I agents like insiders, in under sixty seconds. |
| s02 | 4.79 | Every company watches its people for insider threats, because staff sometimes act outside their role. Frontier models, the most capable A I, carry the same risk. |
| s03 | 15.44 | Say an agent is about to send customer data to a site Uber doesn't want. |
| s04 | 19.82 | First, every request passes through a gateway, a perimeter that controls how A I gets used. |
| s05 | 25.77 | Second, safeguards built with Anthropic check what the models produce, and Uber decides what happens when one fires. |
| s06 | 32.79 | Third, a system called A I Detection and Response watches in real time and catches the agent acting outside its bounds. |
| s07 | 41.59 | It steps in, close to the person typing, with a nudge like, you probably don't want to do that. |
| s08 | 47.12 | Then analysts hunt for behavior nobody expected and feed it back into the safeguards. |
| s08 | 52.21 | But new limits create new behavior, so the loop never ends. |

Timeline: 0.24 s after each line before a cut (tighter than usual so the 9 lines fit), 1.6 s hold at the end.

## Scenes

| Slot | Time | What you see |
|---|---|---|
| s01 hook | 0–4.62 | Frame 0: "Why Uber treats AI agents like insiders" + big blue "60 seconds"; a counter runs to 40,000,000+ "trips and delivery orders a day at Uber" (not spoken). Avatar large below. |
| s02 insiders | 4.62–15.27 | "Insider threats · Same risk": Employees (badge, activity logged, data retained, monitored) stamped INSIDER THREAT PROGRAM; a dot steps out of "their role"; AI agents (frontier models) "?" then the same chips and stamp. |
| s03 request | 15.27–19.65 | "An agent sends data out": the tool call (tool: upload, file: customers.csv, to: unknown-site.example), illustrative; the .csv heads out of the Uber box toward unknown-site.example. |
| s04 gateway | 19.65–25.6 | "1 · Every request, one gateway": chat app, IDE agent, upload customers.csv → LLM gateway → Frontier models; the dashed perimeter, "controls how AI is used inside Uber". |
| s05 safeguards | 25.6–32.62 | "2 · Safeguards check the output": Enterprise Frontier Safeguards · built with Anthropic reads the upload and fires (destination not on the allowed list); "Uber decides": allow · warn · block (illustrative), block; "Anthropic can't see Uber's data without permission." |
| s06 detect | 32.62–41.42 | "3 · AI Detection and Response": safeguards as one data source, "real time"; the ADR telemetry feed; the upload row goes red, "Caught: the agent acted outside its bounds." |
| s07 nudge | 41.42–46.95 | "It steps in, right where you type": the request typed in Agent chat; ADR's nudge "You probably don't want to do that."; UPLOAD STOPPED; "As close as possible to the person typing." |
| s08 loop | 46.95–57.6 | "A loop that never ends": Analyst + an LLM (Claude mark) finds "agent splits the file into small uploads" (illustrative); it becomes rule 2 in the safeguards; the loop spins, "Constraints create new behaviors." Hard stop. |

## Illustrative parts

The customers.csv upload, unknown-site.example, allow/warn/block, the telemetry rows, the "splits the file" pattern and
rule 2. The scenes show nothing the article doesn't cover (no identity, scoping, baselines or kill switches).
