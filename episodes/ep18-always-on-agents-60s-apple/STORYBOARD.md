# Episode 18 · What is an always-on agent? In under 60 seconds (52.59 s, avatar narrator)

*Under 60 seconds* series, W47 T1 (posting Tue Nov 17). Source: William Hu, *Building always-on agents*
(https://claude.com/resources/articles/building-always-on-agents, Nov 13 2026). Script approved 2026-11-14
(`growth/topics/2026-W47-scripts.md`, which also holds the caption, YouTube title and the full fact list).

## Style · APPLE (base build)

ep17 apple look plus the W47 kit at the end of `assets/apple.css` (text files `.a-txt`, table rows `.a-row`, buttons,
stamps, chips). The five other looks (`-reel`, `-soft`, `-mono`, `-whiteboard`, `-papercut`) are generated from this
folder by `node studio/tools/make-looks.mjs ep18-always-on-agents-60s` (themes in `studio/looks/`).

## Script (150 words, as placed)

| Slot | At (s) | Line |
|---|---|---|
| s01 | 0.10 | What is an always-on agent? Here's the answer, in under sixty seconds. |
| s01 | 4.66 | It's not actually always on. It sleeps, wakes for a short run to do one job, saves what happened, and goes back to sleep. |
| s02 | 12.37 | Say you want an agent that chases a customer who hasn't answered your quote. |
| s03 | 17.26 | First, everything that wakes it, like your request, goes into one inbox. |
| s04 | 21.92 | Second, a timer makes it proactive. The agent sets itself a follow-up timer for Wednesday, and when it's due, an event lands in the inbox. |
| s05 | 30.23 | Third, memory lives in files, so it outlives each run. The agent keeps an instructions file, a progress file for each task, and a record of what you've already been told. |
| s06 | 40.92 | Last, a risky step like sending the follow-up waits for your approval. |
| s06 | 45.22 | You get the outcome, not a live stream, so a good one starts quiet and earns more of your attention. |

Voice: Fish Audio "sanjay", normal speed. Timeline laid out from the measured lengths (0.28 s between lines, 0.45 s
across a cut, 1.6 s hold after the last word).

## Scenes

| Slot | Time | What you see |
|---|---|---|
| s01 hook | 0–12.2 | Frame 0: "What is an always-on agent?" + big blue "60 seconds"; "always-on" tints, the 60 punches. Title clears; an "Always on" switch flips off ("mostly asleep"); the loop draws: Asleep → 1 Event arrives → 2 Run · one job → 3 Saves what happened, the blue dot travels it with the voice and dozes ("z z"). Avatar large below. |
| s02 ask | 12.2–17.09 | "Chase a quiet customer": you type "Chase Acme about the quote if they haven't replied by Wednesday."; it becomes the task card Acme quote (progress/acme-quote.md, waiting on Acme). Avatar to the corner. |
| s03 inbox | 17.09–21.75 | "1 · Inbox": You / Webhooks / Scheduled jobs feed INBOX · a database table; ev-101 · you · "Chase Acme about the quote…" lands; one worker, "One worker per inbox". |
| s04 timer | 21.75–30.06 | "2 · Timer": the timers file types `follow-up · acme-quote · due Wed 09:00`; the Mon–Thu strip runs to Wed 09:00; ev-102 · timer lands in the inbox; "A follow-up is a deadline the agent sets for itself." |
| s05 memory | 30.06–40.75 | "3 · Memory is files": agent-memory/ outlives each run; instructions.md, progress/acme-quote.md, reported.md open as named, with their real lines. |
| s06 approve | 40.75–52.59 | "4 · Approval": send_email(to: "Acme") paused; "Send this to Acme?" card, Approve tapped; OUTBOX "Followed up with Acme. Waiting on a reply."; "live stream" struck; "Start quiet. Earn more of your attention." Hard stop. |

## Facts and illustrative parts

See the T1 "Facts used" list in `growth/topics/2026-W47-scripts.md`. Illustrative (the article has no example): the
Acme quote scenario, Dana's studio, the file contents, event ids, the timer time, the follow-up wording and the outbox line.
