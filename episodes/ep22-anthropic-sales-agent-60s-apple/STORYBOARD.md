# Episode 22 · How Anthropic's sales team rebuilt inbound with an agent, in under 60 seconds (51.91 s, avatar narrator)

*Under 60 seconds* series, W47 T5 (posting Sat Nov 21). Script, caption, YouTube title and fact list approved 2026-11-14
(`growth/topics/2026-W47-scripts.md`, T5). Facts only from that list; no source is cited in the voice.

## Style · APPLE (base build)

ep21 apple look plus the W47 kit (end of `assets/apple.css`). Other looks: `node studio/tools/make-looks.mjs ep22-anthropic-sales-agent-60s`.

## Script (150 words, as placed)

| Slot | At (s) | Line |
|---|---|---|
| s01 | 0.10 | Here's how Anthropic's sales team rebuilt inbound with an agent, in under sixty seconds. |
| s01 | 5.45 | Inbound means the people who contact sales first. |
| s02 | 8.62 | Say you fill in the Contact Sales form. A rep qualifies you, then passes you on, and you could wait days. |
| s03 | 14.97 | With tens of thousands of requests a month, the team couldn't keep up, yet most questions were simple, like what a plan costs. |
| s04 | 22.45 | So one engineer built a buying agent. It asks what you're trying to solve, then answers from the docs. It recommends a plan, sometimes the Team plan instead of Enterprise. |
| s05 | 32.54 | Every conversation ends one of three ways. You can buy at checkout, get a quick answer, or be handed to a person, with the full conversation and the reason it escalated. |
| s06 | 42.81 | Those hand-offs become real sales opportunities more than twice as often as the old form's leads, and they close about five days faster. |

## Scenes

| Slot | Time | What you see |
|---|---|---|
| s01 hook | 0–8.45 | Frame 0: the full title + big blue "60 seconds"; "inbound" tints. At 5 s the title clears, the avatar glides to the corner, "Inbound · the people who contact sales first": three people walk into a Contact Sales card. |
| s02 form | 8.45–14.80 | "The old way": the Contact Sales form (Name, Work email, How can we help? → "What does a plan cost?"), Submit; the question card moves Form → Sales rep (qualifies you) → Account exec; "waiting: multiple days". |
| s03 backlog | 14.80–22.28 | "Tens of thousands a month": the requests inbox fills; "Sales team · can't keep up"; plan cost, seat minimum and HIPAA get "in the docs". |
| s04 agent | 22.28–32.37 | "1 · The buying agent": built by one engineer from the prompt, the tools, the knowledge base; "Talk to the buying agent" / "Talk to a rep"; the chat (Claude mark) asks what you're solving, answers from docs + knowledge base, suggests Team, not Enterprise (struck). |
| s05 endings | 32.37–42.64 | "2 · Three endings": 1 Checkout (Buy Team), 2 Quick answer (plan cost ✓), 3 Hand-off to a person: to account exec, the full conversation attached, reason. |
| s06 results | 42.64–51.91 | "More than twice as often": bars 1× vs 2×+ (became opportunities), time to close −5 days; foot "Conversations that needed a person to close: down about half". Hard stop. |

## Illustrative parts

The form's field values (Dana Lee, dana@northwind.io), the inbox's other requests and ids, the buyer's "team of 15" reply,
the agent's recommendation wording, the escalation reason ("needs a custom security review"), the "to: account exec" line,
the Contact Sales card's sub-labels, and the bar lengths in s06 (the "time to close" bars are not to scale; only the
"about 5 days" difference and "more than 2×" come from the article). Everything else: the article.
