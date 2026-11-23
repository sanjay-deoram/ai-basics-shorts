# What's working, what isn't

Updated at every weekly review. Each finding carries its evidence and a confidence label: *Hunch* (one topic),
*Signal* (same direction in ≥ 3 topics), *Rule* (≥ 6 topics, then moved into `studio/DESIGN.md` or `/under-60`).
Platform is marked on every number (IG / TT / YT). Full per-post numbers: `ledger.csv` and
`growth/Week 1 Analytics.md`.

**Last review:** 2026-11-22 (week 47, the first full week: 6 topics, 6 TT + 6 YT posts, 26 IG reels).

---

## The verdict on week 47, in five lines

1. **The look is close to settled: papercut.** It won all 5 IG topics this week, and the W46 skill test before that. Nothing
   else was close. It has never been posted to TikTok or YouTube, which is the next thing to fix.
2. **The opening is the problem, on every platform.** TT loses about half its viewers before 1 s and three quarters by 3 s.
   IG hold fell from the 25.5 % baseline to a 19.6 % median. Every W47 script opened with the same filler: "Here's how/why…".
3. **"Why [named company] does [surprising thing]" hooks best on TT and IG. "[Product] explained" is what YouTube spreads.**
   It's the same video. Only the title and caption should change per platform.
4. **News recaps get held but not saved.** IG saves fell from 15.1 to 6.3 per 1k reach, and shares from 4.9 to 0.5. The
   W46 tutorial ("create a Claude skill") got saved; W47's "here's what company X did" topics mostly didn't.
5. **The body leaks too.** Average watch is 3.4–5.5 s (TT) and 4 s (IG) on a 55 s video. YouTube watches longer
   (24 % to the end on the cloud video), so the body works once people get past the opening.

---

## The format we're converging on (house format v0.1)

The thing to stick to, built from what's working so far. A line marked *test* isn't proven yet. Change one line per
week and keep the rest fixed, so we can tell what moved the numbers.

| Part | v0.1 | Status |
|---|---|---|
| Look | **papercut** | Rule on IG (6/6 topics). Testing on TT / YT from W48. |
| Topic | (a) **why a named company or team does something surprising**, or (b) **a tutorial the viewer can use today** in a tool they already have. Few pure news recaps. | (a) Signal, (b) Signal (weak) |
| Frame 0 | Full title + big 60 (series rule), **with something already moving under it** (the Uber trip counter). Never a still text slide. | *test* |
| Line 1 (0–2 s) | Start on the subject, not on "Here's": "**Uber treats AI agents like insiders.** Here's why, in under sixty seconds." The title rule still holds: the voice says the title at once. | *test* (W48 hook test) |
| Line 2 (2–5 s) | The surprise or the payoff promise (an open loop), **not a definition**. "Every company watches its people for insider threats" is a definition, and that's where viewers leave. | *test* |
| Body | One concrete "Say you…" example carried through every beat (keep). Real file contents on screen (keep). | Keep |
| End | The payoff line. The question goes in the caption, not the voice. | Keep |
| YouTube title | **Product or keyword first**, and words people search for ("Claude Code in the Cloud Explained"). No corporate jargon ("Insider Threat Program"). | Hunch |
| TT / IG caption | Tension first, the same wording as line 1. | Hunch |

---

## Baselines (use these to judge next week)

| Platform | Period | Posts | Median views | Hook | Avg watch | Saves / 1k | Other |
|---|---|---|---|---|---|---|---|
| IG (old baseline) | to Nov 13 | 24 | 360 | 25.5 % hold at 3 s | 6.2 s | 15.1 (reach) | shares 4.9 / 1k |
| IG trials | W47 | 26 | ~180 | 19.6 % hold at 3 s | ~4.0 s | 6.3 (reach) | shares 0.5 / 1k, 0 comments |
| IG papercut only | W47 | 5 | 140 | **29.1 %** | **5.9 s** | — | the bar the other styles have to beat |
| TT | W47 | 6 | 210 | 23 % still watching at 3 s | 4.0 s | 4.7 (views) | 1–4 % at 30 s; 0–2.3 % watched to the end |
| YT | W47 | 6 | 72 live | — | ~10 s per view | — | one breakout (795); the rest 13–76 |

The old IG baseline mixes main-feed posts and one viral reel (the git one). Trial reels only reach non-followers, so they
hold less by nature. **From now on, compare IG trials with the W47 trial row**, and keep 25.5 % / 6.2 s only as the
graduation bar.

---

## Working: keep doing, test harder

| # | Finding | Evidence | Confidence |
|---|---|---|---|
| W1 | **"Why [named company] does [surprising thing]" hooks best on TT and IG.** | Git reel: 50.1 % IG hold. W47 TT at 3 s: Uber **31 %** (best), sales 24 %, against 20–22 % for the how-to and what-is topics. IG papercut by topic: sales 30.8 %, Uber 30.6 %, Opus 29.1 %, cloud 26.2 %, always-on 19.8 %. Uber also had the best TT avg watch (5.48 s) and completion (2.3 %). | **Signal** (git, Uber, sales; 2 platforms). Exception: YouTube, see W9. |
| W2 | **"What is X?" only works when people already know and search for X.** | "What is an embedding?": 33 % hold and 37 saves. "What is an always-on agent?": the worst IG topic (13.6 % hold, papercut only 19.8 %, 2.98 s watch) and below typical on YT (8 % to the end). "Always-on agent" is a new, coined term, so nobody is curious about it yet. | Revised: Signal for known terms; a new or coined term in a "What is" title is a Hunch *against*. |
| W3 | **Tutorials a viewer can use today get saved. Recaps of what a company did don't.** | W46 skill tutorial: 19.3 saves / 1k reach (soft alone 67 saves). W47 Opus "4 habits": the most TT saves (9.6 / 1k), 10 IG likes (the most), a YT playlist add. Cloud: the most IG saves (6) and a YT playlist add. Uber: 0 TT saves. IG saves overall fell to 6.3 / 1k in a week of mostly news recaps. | **Signal** (weak: small counts). |
| W4 | **Papercut is the look.** | IG #1 in **5 of 5** W47 topics: mean hold 26.4 % against 16–19 % for the rest, mean avg watch 5.6 s against 3.4–4.0 s. The best IG reel of the week was papercut Opus (29.1 %, 8.07 s). It also won hold in the W46 skill test (31.9 %, 10.5 s). It won from many posting slots (12:08 to 21:03) and even when posted 1–2 days after its topic's other styles, so the slot can't explain it. Why it likely works: it looks handmade and has texture, so it stands out from the clean, slide-like, "AI-made" shorts around it (apple and soft came last). | **Rule on IG** (6 topics). Not yet tested on TT or YT. Don't write it into `DESIGN.md` until TT / YT agree (W48 test A). |
| W5 | **YouTube is hit-driven: either the Shorts feed picks a video up or it dies on day 1.** | Cloud: 795 live views, 81 % from the Shorts feed, 24 % watched to the end (better than 77 % of similar-length videos), +1 sub. The other 5: 13–76 views, with day-1 → day-3 decay like 48 → 16 → 5. 97–99 % of viewers are non-subscribers. | Signal. Replaces the old W5 ("YouTube gives more views"), which no longer holds for a typical post. |
| W6 | **Reel beats apple on all three platforms.** | IG average style rank: reel 3.5, apple 4.25. TT (reel days vs apple days): 3 s hold 25.7 % vs 23.0 %, avg watch 4.49 s vs 3.78 s. YT median views: reel 74 vs apple 47 (the reel days include the breakout). | Hunch (the topic differs from day to day). Enough to drop apple as a main look. |
| W7 | **On TT, viewers like the opening, not the payoff.** | "Most likes came at 0:00–0:01" on all 6 TT posts. Likes are a reaction to the title card, so the title earns the tap and the body doesn't add to it. | Hunch. Line 2 needs a reason to stay (open loop). |
| W8 | **Product names bring search traffic on both TT and YT.** | TT searches: "opus 5.5", "claude code explained", "always on ai agent", "safety investigation specialist uber". YT searches: "how to use opus 5.5", "cloud code", "uber system design". | Signal. Put the exact product name in the title and the first line. |
| W9 | **YouTube spreads keyword titles; TT and IG spread tension titles.** | "Claude Code in the Cloud Explained in 60 Seconds" → 795 views. "Uber's AI Insider Threat Program in 60 Seconds" → 13 views (8 of them from search, 1 from the Shorts feed), yet that same video was #1 on TT. Its 10 YT viewers watched 56 % on average, so the video was fine and the title / feed test failed. | Hunch (1 pair). Test: YT titles keyword-first, TT / IG captions tension-first. |

## Not working: fix or stop

| # | Finding | Evidence | Fix we're testing |
|---|---|---|---|
| N1 | **The first second loses half the audience. This is still the biggest lever.** | TT: 42–53 % still there at 1 s, 20–31 % at 3 s. IG median hold 19.6 % (trials). All 7 W47 scripts open with "Here's how/why X, in under sixty seconds", so the first word says nothing and the topic lands late. The frame-0 card reads like a slide. The week's best TT opening (Uber, 53 % at 1 s) was the one with motion under the title (a running counter). | W48 test B: start on the subject ("Uber treats AI agents like insiders. Here's why…"), and from W49 test motion on frame 0. Both stay inside the title-on-frame-0 rule. |
| N2 | **The body leaks.** | TT: 12–19 % left at 5 s, 5–11 % at 10 s, 1–4 % at 30 s. IG avg watch ~4 s. Line 2 is usually a definition or the setup of the example. | Line 2 = the surprise or the payoff promise. Move definitions later, or show them on screen without saying them. |
| N3 | **TT reach is flat, and the account's followers don't watch.** | Every TT post got 120–260 views whatever the topic. Followers were only 10–37 % of viewers. The 16K-follower account lost a net 16 followers this week. Most followers likely came for older content, not these shorts. | Keep posting daily (consistency is fixed). Judge TT on 3 s hold and avg watch, not views, until one post breaks out. |
| N4 | **Comments are zero, and the caption question didn't change that.** | 3 comments in ~6,600 views across all platforms, 0 on IG. Every W47 caption ended with a question ("Which habit will you try first?"). | Pin the question as the first comment on TT and YT instead, and make it a pick-one question ("Haiku or Opus for code review?") rather than an open one. |
| N5 | ~~Captions vary between style variants~~ **Fixed in W47.** | Same caption for every style variant (see the scripts). | — |
| N6 | ~~Posting gaps~~ **Fixed in W47.** | Posted every day Nov 17–22 on all three platforms. | Keep it up. |
| N7 | **Saves and shares fell hard on IG.** | 6.3 saves and 0.5 shares per 1k reach, against the 15.1 and 4.9 baseline. Only 2 shares from 26 reels. | More tutorial topics (W3). Each one should leave the viewer with something to copy: a command, a prompt, a setting. |
| N8 | **Apple and soft lose on IG.** | Average rank 4.25 for both. Soft was the worst style 3 times, including the week's lowest hold (9.6 %, cloud). | Dropped from the tournament (see below). |

---

## How each platform behaves (so far)

| | TikTok | YouTube Shorts | Instagram trials |
|---|---|---|---|
| Where views come from | 87–91 % For You | 81 % Shorts feed on the hit; search on the misses | Non-followers only (trial) |
| Typical views | 200–260, flat | 13–76, plus the occasional hit (795) | ~110–230 per reel, flat |
| What decides reach | The first 1–3 s | Whether the Shorts feed picks it up on day 1 (title + early retention) | Hold at 3 s |
| Attention | 3.4–5.5 s avg watch | ~10–14 s per view; up to 24 % to the end | ~4 s; papercut ~6 s |
| Who | 18–34, ~80 % male, Canada 29–61 % | US first, then Canada, India, Germany | not given for trials |
| Lifespan | Keeps getting views for ~18 h | Mostly day 1 | — |
| Won this week | Uber (tension, named company) | Claude Code in the cloud (product keyword) | Opus 5.5 (tutorial), papercut every time |

**What that means:** make one video and change the packaging per platform. TT and IG: tension-first caption. YT: a
keyword-first title. Judge each platform on its own hook measure, and don't drop a topic because one platform ignored it.

---

## Decisions from this review

1. **Graduate now:** Opus 5.5 papercut (`Df5v64gAOFy`), which beats the bar on both hold (29.1 %) and avg watch (8.07 s).
2. **Recheck on Tue Nov 24 (72 h):** sales papercut (30.8 % / 7.42 s, likely to graduate), Uber papercut and cloud papercut
   (hold passes, avg watch is below 6.2 s for now).
3. **Style tournament result (PLAYBOOK §6, keep 3):** **papercut, reel, mono.** Mono and whiteboard tied on average rank
   (4.00); mono wins on mean hold (18.5 % vs 16.6 %) and had the bigger W46 reach (2,334 vs 282). Apple and soft are dropped.
   Whiteboard is parked: it's the other handmade look, so if test A shows "handmade" is what works, it comes back.
4. **Apple is no longer a main look** (W6). TT and YT alternate **papercut and reel** from W48.

## Tests for week 48 (one change per test)

| Test | What changes | Where | Measure | Call it when |
|---|---|---|---|---|
| **A · papercut off IG** | TT and YT alternate papercut and reel by day (opposite to each other, as in PLAYBOOK §3) instead of reel and apple. | TT, YT | TT 3 s hold and avg watch; YT Shorts-feed share and % to the end | Papercut ahead on both TT measures on ≥ 4 of 7 days → Signal; then it becomes the main look in `make-looks` (build papercut first). |
| **B · line 1 hook** | Same video, a new first line only. A = "Here's why X, in under sixty seconds." (control) · B = "X. Here's why, in under sixty seconds." (subject first) · C = the title as a question with the tension in it ("Why does Uber treat AI agents like insiders?"). On-screen title wording matches the line. | IG trials, **papercut only**, plus reel A and mono A for the tournament: 5 reels a day | Hold at 3 s, within each topic | 7 topics × 3 = 21 reads. A variant ahead in ≥ 5 of 7 topics → Rule straight into `/under-60`. |
| **C · topic mix** | Of the 7 topics: at least 3 tutorials (something a viewer can do today in Claude / Claude Code), 2 named-company "why" stories, and at most 2 news recaps. | all | Saves per 1k (IG reach, TT views); YT playlist adds | Tutorials ahead on saves in the week → keep the mix. |
| **D · comments** | A pinned pick-one question as the first comment on TT and YT. | TT, YT | Comments per 1k views | Any lift above ~0.5 / 1k. |
| **E · YT titles** | Keyword-first: product name + "explained" or "how to", no jargon. | YT | Shorts-feed share on day 1 | Compare with W47's 5 non-breakout posts. |

Test B is the most important: hold at 3 s caps everything else. It needs one extra voice line per variant (two short
Fish Audio lines per topic) and a re-render of s01 only.

---

## Open questions

1. ~~Which of the 6 styles wins across topics?~~ **Answered:** papercut by a wide margin; papercut, reel and mono kept (decision 3).
2. Does a question or company-angle title lift hold on the frame-0 title card? **Partly answered** (W1: company angle, yes).
   The wording itself is tested in test B.
3. ~~Reel vs apple on TT and YT~~ **Answered enough:** reel (W6). Now papercut vs reel (test A).
4. ~~Does a question at the end of the caption bring comments?~~ **No** (N4). Trying a pinned pick-one question instead.
5. Our own best time slots: keep rotating until week 50. TT followers were most active Nov 21 at 10:00.
6. **Does TT hold back a 2nd or 3rd version of the same topic?** Still unanswered: the ep16 (×2) and ep17 (×3) posts from
   Nov 13–15 aren't in the W1 pull. Pull their TT / YT views and For You share at the next review.
7. **New:** is "handmade" the thing that works (papercut, whiteboard) or is it papercut specifically? Test A first; if
   papercut holds on TT, try whiteboard against it later.
8. **New:** does motion on frame 0 (under the title) lift the 1 s number on TT? Queued for W49, after test B.

## Data notes (read before comparing)

- Numbers are lifetime-to-date on posts of different ages. Use the 72 h reads (`ledger.mjs --min-age 3`) for decisions.
- The sales topic's IG average (29.8 % hold) is flattering: only its two best styles were in the window.
- IG styles were matched from cover frames. Name the files by style in Buffer so this isn't needed.
- YT Analytics lags 1–3 days: re-pull Nov 19–22 on Tue before reading YT.
- `ledger.csv` has no W47 TT or YT rows yet (no Metricool TT / YT pull in `raw/2026-11-22/`), and `labels.csv` lacks
  those posts. Add both at the next review so the ledger covers every platform.
