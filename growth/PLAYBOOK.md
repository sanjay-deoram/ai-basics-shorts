# Growth loop: playbook (v1, 2026-11-14)

How we post the *Under 60 seconds* shorts, measure them and feed what we learn back into the next batch.
Free plans only: Buffer publishes to TikTok and YouTube, Instagram gets trial reels, Metricool measures, and this
folder remembers (the free tiers forget after about 30 days).

| File | What it is |
|---|---|
| `PLAYBOOK.md` | This file: cadence, weekly rhythm, slot plan, publishing, decision rules. |
| `LEARNINGS.md` | **What's working and what isn't**, with evidence and a confidence label. Updated every review. |
| `reports/<YYYY>-W<nn>.md` | One report per weekly review: scoreboard, test results, what to graduate, next week's plan. |
| `ledger.csv` | One row per post per platform, with its latest numbers. Built by the tool below, never edited by hand. |
| `labels.csv` | What the platforms don't know: topic, style, kind (main / trial), hook type. Edited by hand. |
| `topics/<YYYY>-W<nn>.md` | The week's 7 topics (T1–T7, one per posting day), with links and notes. |
| `raw/<date>/` | The raw pulls from each review (Buffer and Metricool), kept as they came. |
| `tools/ledger.mjs` | Merges every `raw/` snapshot with the labels into `ledger.csv` and prints the scoreboard. |

**Settled (2026-11-14):**

- Instagram posts always go out as trial reels in **Manual** mode (never shared to followers automatically; we share
  the winners ourselves). They're saved as Buffer drafts that you schedule. No own publisher for now.
- Phase 1 (1 topic a day) starts in week 47, with the first posts on Tue Nov 17. The review is every **Sunday**, and you
  send the week's 7 topics the same day.
- Every episode gets **all-new animations**. No reusable scene library.
- Videos are hosted on this repo's GitHub Releases. The ep16 and ep17 posts already queued stay as they are.

## 1. Cadence: ramp up to 3 topics a day

Each topic gets **reel** and **apple** (you approve these) plus **soft, mono, whiteboard, papercut** (no approval).
TikTok and YouTube get one variant per topic. Instagram gets the topic in several styles as trial reels.

| Phase | Topics a day | TikTok and YouTube (each) | Instagram trials a day | Renders a day | Move on when |
|---|---|---|---|---|---|
| 1 (from week 47) | 1 | 1 a day | 6 (all 6 styles) | 6 | a week's episodes all ship on time, with a day to spare |
| 2 | 2 | 2 a day | 6 (2 topics × best 3 styles) | ~8 | a week's episodes all ship on time, with a day to spare |
| 3 | 3 | 3 a day | 9 (3 topics × best 3 styles) | ~12 | — |

We ramp instead of starting at 3 a day for three reasons:

1. **Production is the bottleneck.** Every episode gets all-new animations (series rule; no reusable scene library).
   3 a day means 21 brand-new episodes a week, so the speed of building new scenes sets the pace. Expect Phase 1 to
   last several weeks.
2. **Instagram caps trial reels per day** and doesn't say where. Reports range from about 5 to 20 a day, and going over
   can block trial reels for more than 24 hours. We stay at 6–9 a day and log any "almost reached the limit" notice.
3. **Buffer holds 10 scheduled posts per channel.** At 1 a day, TikTok and YouTube fit in two batches a week.
   Instagram trials wait as drafts (unlimited on the free plan), and you schedule each day's 6 the evening before.

At 1 topic a day the style tournament (§6) finishes in a single week (7 topics × 6 styles), so Phase 2 already runs on the best 3 styles.

## 2. Weekly rhythm (Phase 1)

| When (ET) | Who | Step |
|---|---|---|
| Sun | Claude | Review: pull Buffer + Metricool, `node growth/tools/ledger.mjs`, write the report, update `LEARNINGS.md`. |
| Sun | You (10 min) | Read the report. Graduate the trial reels it lists (Instagram app → trial reel → Share to followers). Send the week's 7 topics (articles, links, notes), in chat or in `topics/<YYYY>-W<nn>.md`. |
| Sun–Mon | Claude → you | All 7 scripts in one batch (`/under-60`, applying `LEARNINGS.md`). You OK them in one sitting (voice costs Fish Audio credits). |
| Mon | Claude → you | **Batch 1** (Tue–Fri topics): voice, build, render 6 styles each. You approve reel + apple; I schedule TikTok and YouTube and save the Instagram drafts. |
| Thu | Claude → you | **Batch 2** (Sat–Mon topics): same. |
| Every evening | You (2 min) | Schedule the next day's 6 Instagram drafts: *Trial reel: Manual*, then Schedule. |

## 3. Daily slot plan

**TikTok and YouTube:** one post a day each. They alternate reel and apple by day, opposite to each other, so that
reel vs apple is compared fairly:

| | Tue | Wed | Thu | Fri | Sat | Sun | Mon |
|---|---|---|---|---|---|---|---|
| TikTok | reel 12:00 | apple 18:00 | reel 10:00 | apple 12:00 | reel 10:00 | apple 10:00 | reel 18:00 |
| YouTube | apple 16:00 | reel 14:00 | apple 18:00 | reel 16:00 | apple 16:00 | reel 16:00 | apple 14:00 |

Times rotate within the peaks of Metricool's best-time grid. The grid reflects general audience activity, not our own
followers: weekdays peak at 10:00–12:00 and 18:00 on TikTok and 15:00–16:00 on YouTube, and weekends get about half
the activity. After 4 weeks we replace these slots with our own numbers.

**Instagram:** the day's topic in all 6 styles as trial reels (Manual), at 10:00, 12:00, 14:00, 17:00, 19:00 and 21:00. The
style order shifts by one each day so that no style always goes first. All 6 have the **same caption and hashtags**: only
the look differs.

## 4. Publishing mechanics

1. **Hosting: GitHub Releases on this public repo.** One release per week (`media-2026-W47`), with the MP4s uploaded by
   `gh release upload`. GitHub sets no limit on a release's total size or bandwidth (2 GiB per file). We don't commit the
   MP4s: at ~40 videos a week that would add ~200 MB a week to every clone on both machines, for good. `gh` is logged in
   as `sanjay-deoram` on this Mac. **Tested 2026-11-14:** a Buffer draft made from a release URL followed the redirect
   to GitHub's file server, read the file as `video/mp4` (59.8 s) and made a thumbnail. Keep the assets in the release
   after posting, in case Buffer fetches the file again at publish time.
2. **TikTok and YouTube:** Buffer `create_post`, `customScheduled`, automatic. YouTube needs a title (≤ 60 characters,
   keyword first) and a category (`28` Science & Technology).
3. **Instagram trial reels (Manual):**
   - Buffer's API has no trial switch (its Instagram post settings have none). I save each trial as a **Buffer draft**
     with the video, caption and time; drafts are unlimited on the free plan. Every evening you open the next day's 6,
     set *Trial reel: Manual* and click Schedule (about 2 minutes). It has to be daily: at 6 a day, the 10-post limit
     holds less than two days of trials.
   - **Own publisher: not for now (decided 2026-11-14).** If the daily step becomes a chore, Instagram's official API
     has accepted `graduation_strategy: MANUAL` since 3 Dec 2025, so a GitHub Actions job could publish from
     `growth/queue/instagram.json` with no queue limit.
   - **Not Metricool:** its free plan publishes 20 posts a month (counted per network), and its MCP can't choose manual or
     auto. Instagram doesn't allow changing that after the trial is created, so a wrong default would share to followers
     with no way back.
4. **Tag every post** in Buffer by topic and style, and keep `labels.csv` in step (videos named like
   `ep17-code-review-60s-apple.mp4` label themselves).

## 5. Captions, titles, hashtags

- Lead with the phrase people search for: "How Claude Code reviews code, explained in 60 seconds". No typos (an earlier
  caption read "clause skill").
- One line of value, then optionally a question that invites a comment ("Which model do you use for code review?"). The
  video itself still ends on the payoff line (series rule); the question lives only in the caption.
- 3–5 hashtags: 1 broad (`#ai`), 2 niche (`#claudecode`, `#aiagents`, `#rag`, …), 1 audience (`#softwareengineer`,
  `#learntocode`). Rotate niche tags by topic. On Instagram, keywords in the caption do more for reach than hashtags.
- Same caption across all style variants of a topic.
- YouTube: title ≤ 60 characters, keyword first; description of 1–2 lines + 3 hashtags.

## 6. How we decide

Single posts are noisy (views follow a power law), so we judge **rates within a topic** and only promote a finding
once it repeats.

| Metric | Source | Why | What it changes |
|---|---|---|---|
| Hold at 3 s (`hold_3s_pct`) | Metricool IG "reel view rate" (= 100 − skip rate) | Measures the hook. Our biggest lever. | Title wording, first spoken line, first frame. |
| Avg watch (s) and % watched | Metricool / Buffer | Measures the body of the video. | Payoff tease, length of the setup, scene order. |
| Shares and saves per 1k reach | Buffer / Metricool | Instagram's strongest distribution signals. | Topic choice, how concrete the example is. |
| TikTok full-watch %, For You share | Metricool TikTok | TikTok's equivalents. | The same, for TikTok. |
| YouTube avg view duration | Metricool YouTube | YouTube's equivalent. | The same, for YouTube. |
| Views / reach | all | Outcome. Compare medians, never single posts. | Nothing directly: it's the result. |

**Confidence labels in `LEARNINGS.md`:** *Hunch* (one topic) → *Signal* (same direction in ≥ 3 topics) → *Rule* (≥ 6
topics; then it goes into `studio/DESIGN.md` or the `/under-60` skill).

**How a finding reaches the videos.**
- A *Hunch* or *Signal* becomes a test: one change at a time, built into next week's scripts or trial slots.
- A *Signal* is also applied to the TikTok and YouTube posts.
- A *Rule* is written into `/under-60` (script, hook, pacing) or `studio/DESIGN.md` (look), so every later episode
  inherits it, and `LEARNINGS.md` marks it as moved.
- Decisions happen only at the Sunday review, never mid-week.

**Style tournament (Instagram trials):** rank the 6 styles within each topic by hold, then avg watch. After 7 topics,
keep the 3 with the best average rank. From then on, spend the spare trial slots on **hook tests** (same style,
different title wording and first line).

**Graduation (Manual mode, the Sunday list):** a trial is graduated when it is ≥ 72 hours old, is the topic's best
variant, and beats the account median on both hold and avg watch (today: 25.5 % and 6.2 s). At most one per topic. If
none qualifies, none is graduated.

**Time slots:** rotate for 4 weeks before judging. For a small account, posting time moves the numbers far less than
the hook does.

## 7. Free-plan limits we design around

| Tool | Limit | How we handle it |
|---|---|---|
| Buffer | 3 channels; 10 scheduled posts per channel at a time (drafts unlimited) | TikTok and YouTube: two batches a week. Instagram: drafts, scheduled one day ahead. |
| Buffer | Analytics only for the last 31 days | Weekly snapshot into `raw/`. |
| Buffer API | No trial-reel switch; media by public URL only | Drafts for trials; GitHub Releases for hosting. |
| Metricool | 1 brand; 20 published posts a month, counted per network; 30 days of analytics history | Analytics only; weekly snapshot. |
| Metricool | TikTok and YouTube were connected on 2026-11-13 and had no data yet | Buffer covers them until it syncs. |
| Instagram | Undisclosed daily cap on trial reels (reports: ~5–20); graduating to followers is done in the app only | 6–9 trials a day; you graduate from the Sunday list. |

## 8. Review runbook (for Claude)

1. `mcp__buffer__list_posts` (org `SanjayDeoram`, `includeMetrics: true`, `first: 100`). The result is large and
   gets saved to a file; trim it into `growth/raw/<date>/buffer-posts.json` with
   `jq '[.edges[] | .node | {id, service: .channelService, status, sentAt, dueAt, text, videoTitle: (.assets[0].video.title // null), durationMs: (.assets[0].video.durationMs // null), link: .externalLink, metricsUpdatedAt, metrics: ((.metrics // []) | map({key: .type, value: .value}) | from_entries)}]'`
   (this drops the author's email).
2. `mcp__metricool__getAnalyticsDataByMetrics` (brand `8096901`, last 30 days):
   - Instagram reels `IGRE02, IGRE06, IGRE03, IGRE23, IGRE11, IGRE24, IGRE28, IGRE30, IGRE12, IGRE21, IGRE10, IGRE07`
     → `metricool-ig-reels.json` (field names as in the 2026-11-13 file).
   - TikTok `TKPO02, TKPO03, TKPO05, TKPO07, TKPO11, TKPO13, TKPO15, TKPO16, TKPO08, TKPO09, TKPO10` and YouTube
     `YTVV02, YTVV05, YTVV17, YTVV06, YTVV08, YTVV09, YTVV11, YTVV12` → `metricool-tiktok.json` /
     `metricool-youtube.json` (normalised names, see the header of `tools/ledger.mjs`).
3. Add any new posts to `labels.csv`.
4. `node growth/tools/ledger.mjs` (add `--min-age 3` for the 72-hour reads), then write `reports/<YYYY>-W<nn>.md` from
   the scoreboard and update `LEARNINGS.md`.
5. `mcp__metricool__getBestTimeToPostByNetwork` once a month; replace it with our own slot results once 4 weeks of
   rotation exist.

## Open decisions

1. AI label: posts currently go out with `isAiGenerated: false`. The voice is your own cloned voice and the avatar is a
   cartoon, so it is likely not required, but it is your call.
