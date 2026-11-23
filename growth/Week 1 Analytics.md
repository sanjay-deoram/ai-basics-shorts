# Week 1 Analytics: TikTok + YouTube Shorts + Instagram

**Period:** TikTok and YouTube Nov 16–22, 2026 · Instagram Nov 17–21 · **Pulled:** Nov 22, 2026 · **Videos:** 6 topics (none posted Nov 16)
**Sources:** TikTok Studio (@sanjay.deoram) · YouTube Data + Analytics API (channel "Sanjay Deoram", 813 subscribers) ·
Instagram Graph API (@sanjaycodingchamp, 4,940 followers)

> **How Instagram works here (from `PLAYBOOK.md`):** each topic goes out in all 6 styles (reel, apple, soft, mono,
> whiteboard, papercut) as **trial reels**. Trial reels are shown to non-followers only, and the playbook calls them
> "Manual" mode: they never go to your followers unless you share them yourself. One reel went to the **main feed**:
> Uber in the apple style (Nov 21). Instagram covers posts from **Nov 17–21**: 26 reels, 25 trials + 1 main. That's
> 4 full topics plus 2 of the 6 Anthropic sales styles. The Nov 22 posts are outside the window.
> **Hold at 3 s** = 100 − Instagram's skip rate (the share of viewers who stayed past 3 s), the playbook's main
> measure of the opening. Styles were matched from each reel's cover frame (blue 60 = apple, red 60 = reel,
> terracotta = mono, pastel = soft, handwriting = whiteboard, kraft paper = papercut).

Numbers are lifetime-to-date for each video, so newer videos have had less time to collect views.

> **Read this before comparing the two platforms**
> - **YouTube Analytics runs 1–3 days behind.** The Nov 21 and Nov 22 videos only have live counters (views, likes, comments) so far.
>   For the Nov 19 and Nov 20 videos, Analytics only covers the first day or two. Example: Nov 20 has 795 live views but 449 in Analytics.
> - **YouTube counts a Shorts "view" every time the video starts**, including quick swipes. "Engaged views" leaves out those quick swipes.
> - **YouTube's "average view duration" is measured on a different basis from TikTok's.** For a like-for-like comparison, use
>   **watch time ÷ views** (marked *per view* below).
> - **YouTube has no "saves".** The nearest equivalent is **added to playlist** (Watch Later and similar).
> - YouTube held back age, gender and most country data because the view counts are too small.

---

## Summary

| Metric | TikTok (6 videos) | YouTube (live counters) | YouTube (Analytics, 4 of 6 videos) | Instagram (26 reels, Nov 17–21) |
|---|---|---|---|---|
| Views | **1,267** | **1,075** | 575 (234 engaged) | **4,274** |
| Reach (accounts) | — | — | — | 3,656 (summed per reel) |
| Likes | 47 | 11 | 7 | 22 |
| Comments | 1 | 2 | 1 | 0 |
| Shares | 2 | — | 0 | 2 |
| Saves / playlist adds | 6 saves | — | 2 playlist adds | **23 saves** |
| Total watch time | 1h 37m | — | ~1h 58m | **4h 30m** |
| Watch time per view | 4.6 s | — | ~12 s | 3.8 s |
| Hold at 3 s | (see retention table) | — | — | median 19.6% |
| New followers / subs | 2 | — | 1 | not in the API for reels |

**TikTok account-wide, last 7 days** (includes old videos): 2.5K views (+177.6%), 30 profile views, 86 likes, 16K followers,
net −16 followers. Followers were most active **Nov 21 at 10am**.

---

## All videos at a glance

### TikTok

| Posted | Video | Length | Views | Likes | Comments | Shares | Saves | Watch time | Avg watch | Full watch | New followers |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Nov 22 | Why long Claude Code sessions got cheaper | 0:57 | 120 | 3 | 0 | 0 | 0 | 7m 18s | 3.78 s | 0% | 0 |
| Nov 21 | Anthropic's sales team AI agent | 0:51 | 214 | 4 | 1 | 0 | 1 | 12m 42s | 3.58 s | 1.4% | 0 |
| Nov 20 | Claude Code in the cloud | 0:54 | 206 | 8 | 0 | 1 | 1 | 16m 37s | 4.14 s | 1.7% | 1 |
| Nov 19 | Uber treats AI agents like insiders | 0:57 | **259** | 9 | 0 | 1 | 0 | **27m 24s** | **5.48 s** | **2.3%** | 0 |
| Nov 18 | Opus 5.5 as your daily driver | 0:56 | 209 | **12** | 0 | 0 | **2** | 13m 15s | 3.43 s | 0.4% | 0 |
| Nov 17 | What is an always-on agent? | 0:52 | **259** | 11 | 0 | 0 | **2** | 19m 49s | 4.42 s | 1.5% | 1 |

### YouTube Shorts

| Posted | YouTube title | Length | Live views | Engaged views | Likes | Comments | Shares | Playlist adds | Watch time | Per view | Avg view duration (YouTube's figure) | New subs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Nov 22 | Claude Code Costs: Why Long Sessions Got Cheaper | 0:58 | 70 | *pending* | 2 | 1 | *pending* | *pending* | *pending* | *pending* | *pending* | *pending* |
| Nov 21 | Anthropic's AI Sales Agent Explained in 60 Seconds | 0:52 | 76 | *pending* | 0 | 0 | *pending* | *pending* | *pending* | *pending* | *pending* | *pending* |
| Nov 20 | Claude Code in the Cloud Explained in 60 Seconds | 0:55 | **795** | 194 | **5** | 0 | 0 | 1 | 102 min | **13.6 s** | 28 s (51%) | **1** |
| Nov 19 | Uber's AI Insider Threat Program in 60 Seconds | 0:58 | 13 | 3 | 1 | 0 | 0 | 0 | ~1 min | ~6 s | 32 s (56%) | 0 |
| Nov 18 | Opus 5.5 as Your Daily Driver: 4 Habits in 60 Seconds | 0:57 | 74 | 24 | 1 | 1 | 0 | 1 | 11 min | 9.6 s | 27 s (48%) | 0 |
| Nov 17 | What Is an Always-On Agent? Explained in 60 Seconds | 0:53 | 47 | 13 | 2 | 0 | 0 | 0 | 4 min | 5.1 s | 17 s (34%) | 0 |

The engaged views, watch time and per-view figures cover only the days YouTube Analytics had data for, so they sit below the live counters.

### Instagram: per topic (all styles added together)

| Topic | Reels | Views | Reach | Hold at 3 s (weighted) | Avg watch | Total watch | Likes | Comments | Saves | Shares | Best style |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Nov 17 · Always-on agent | 6 | 1,094 | 979 | 13.6% | 2.48 s | 45m 12s | 2 | 0 | 5 | 0 | papercut |
| Nov 18 · Opus 5.5 daily driver | 6 | **1,215** | **1,028** | 20.7% | 4.57 s | **1h 32m** | **10** | 0 | 5 | 1 | papercut |
| Nov 19–21 · Uber AI agents | 6 (1 main) | 937 | 750 | 22.5% | 3.91 s | 1h 01m | 5 | 0 | 5 | 0 | papercut |
| Nov 20–21 · Claude Code in the cloud | 6 | 806 | 724 | 18.8% | 3.73 s | 50m 07s | 3 | 0 | **6** | 1 | papercut |
| Nov 21 · Anthropic sales agent (2 of 6 styles) | 2 | 222 | 175 | **29.8%** | **5.64 s** | 20m 53s | 2 | 0 | 2 | 0 | papercut |

### Instagram style tournament (playbook §6: rank the 6 styles within each topic by hold, then avg watch)

| Style | Always-on | Opus | Uber | Cloud | Sales | Avg rank (4 full topics) | Mean hold | Mean avg watch |
|---|---|---|---|---|---|---|---|---|
| **papercut** | **#1** | **#1** | **#1** | **#1** | **#1** | **1.00** | **26.4%** | **5.58 s** |
| reel | #2 | #3 | #5 | #4 | — | 3.50 | 19.2% | 3.97 s |
| mono | #6 | #4 | #4 | #2 | — | 4.00 | 18.5% | 3.36 s |
| whiteboard | #5 | #2 | #6 | #3 | #2 | 4.00 | 16.6% | 4.02 s |
| apple | #4 | #5 | #3 (main) | #5 | — | 4.25 | 18.0% | 3.89 s |
| soft | #3 | #6 | #2 | #6 | — | 4.25 | 16.1% | 3.48 s |

**Graduation check (playbook §6:** ≥ 72 h old, the topic's best style, and above the account median of **25.5% hold
and 6.2 s avg watch**, at most one per topic):

| Topic | Best style | Age | Hold | Avg watch | Graduate? |
|---|---|---|---|---|---|
| Opus 5.5 daily driver | papercut | 97 h | 29.1% ✅ | 8.07 s ✅ | **Yes: share `Df5v64gAOFy` to followers** |
| Always-on agent | papercut | 119 h | 19.8% ❌ | 2.98 s ❌ | No |
| Uber AI agents | papercut | 31 h | 30.6% ✅ | 5.92 s ❌ | No (too young, and watch is below 6.2 s); recheck Tue |
| Claude Code in the cloud | papercut | 24 h | 26.2% ✅ | 5.34 s ❌ | Not yet (too young); recheck Tue |
| Anthropic sales agent | papercut | 32 h | 30.8% ✅ | 7.42 s ✅ | **Likely**: recheck on Tue Nov 24, once it's 72 h old |

### Retention: % of viewers still watching

**TikTok** (measured from second-by-second data):

| Video | 1 s | 2 s | 3 s | 5 s | 10 s | 30 s | End |
|---|---|---|---|---|---|---|---|
| Nov 22 · Claude Code sessions cheaper | 45% | 35% | 28% | 15% | 8% | 1% | 0% |
| Nov 21 · Anthropic sales agent | 49% | 37% | 24% | 13% | 7% | 2% | 1% |
| Nov 20 · Claude Code in the cloud | 45% | 31% | 20% | 13% | 7% | 4% | 2% |
| Nov 19 · Uber AI agents | **53%** | **36%** | **31%** | **19%** | **11%** | 3% | **3%** |
| Nov 18 · Opus 5.5 daily driver | 42% | 29% | 21% | 12% | 5% | 2% | 0% |
| Nov 17 · Always-on agent | 48% | 34% | 22% | 15% | 8% | 2% | 1% |

**YouTube** (at points through the video; counts viewers who didn't swipe away, so values can go above 100% when people replay). In brackets: how the video compares with similar-length videos on YouTube (0 = worst, 1 = best, 0.5 = typical).

| Video | 1% in | 10% in | 25% in | 50% in | 75% in | End |
|---|---|---|---|---|---|---|
| Nov 20 · Claude Code in the cloud | 122% (0.57) | 106% (0.37) | 59% (0.43) | 44% (0.53) | 37% (0.72) | **24% (0.77)** |
| Nov 18 · Opus 5.5 daily driver | 117% (0.54) | 92% (0.27) | 50% (0.16) | 42% (0.20) | 33% (0.20) | 17% (0.24) |
| Nov 17 · Always-on agent | 108% (0.40) | 100% (0.28) | 38% (0.35) | 23% (0.12) | 15% (0.21) | 8% (0.22) |
| Nov 19 · Uber | too few views for a curve | | | | | |
| Nov 21–22 | *pending* | | | | | |

---

## Per-video detail

### 1. Why long Claude Code sessions got cheaper (Nov 22)

**TikTok** (posted 10:05 AM · 0:57)
- **Views** 120 · **Likes** 3 · **Comments** 0 · **Shares** 0 · **Saves** 0
- **Watch time** 7m 18s total · 3.78 s avg · 0% watched to the end · 0 new followers
- **Traffic:** For You 86.3% · Search 10.3% · Following 1.7% · Other 1.7%
- **Search queries:** still processing
- **Views by hour since posting (first 10 h):** 0, 36, 12, 7, 17, 10, 7, 4, 4, 15, 4
- **Viewers:** total and new vs returning still processing
- **Age:** 18–24 36% · 25–34 39% · 35–44 16% · 45–54 7% · 55+ 2% · **Gender:** Male 79% · Female 19% · Other 2%
- **Top locations:** Canada 38.1% · US 16.4% · Saudi Arabia 11.2% · Philippines 6.7% · Brazil 3.0%
- **Likes timing:** most likes came at 0:01

**YouTube**: *Claude Code Costs: Why Long Sessions Got Cheaper* (posted 4:02 PM ET · 0:58)
- **Live:** 70 views · 2 likes · 1 comment
- **Analytics:** not available yet (posted a few hours before the pull)

**Instagram**: posted Nov 22, so it's outside the Nov 17–21 window. It goes in next week's report.

### 2. How Anthropic's sales team rebuilt inbound with an AI agent (Nov 21)

**TikTok** (posted 10:05 AM · 0:51)
- **Views** 214 · **Likes** 4 · **Comments** 1 · **Shares** 0 · **Saves** 1
- **Watch time** 12m 42s total · 3.58 s avg · 1.4% watched to the end · 0 new followers
- **Traffic:** For You 89.1% · Search 5.2% · Other 4.7% · Following 0.5% · Personal profile 0.5%
- **Search queries:** still processing
- **Views by hour (first 34 h):** peak at hour 1 (31 views), then a steady 7–23 an hour until about hour 18, then near zero
- **Viewers:** total and new vs returning still processing
- **Age:** 18–24 29% · 25–34 54% · 35–44 9% · 45–54 5% · 55+ 3% · **Gender:** Male 80% · Female 20%
- **Top locations:** Canada 43.9% · US 11.5% · Philippines 10.6% · Thailand 3.4% · Malaysia 3.0%
- **Likes timing:** most likes came at 0:01

**YouTube**: *Anthropic's AI Sales Agent Explained in 60 Seconds* (posted 4:02 PM ET · 0:52)
- **Live:** 76 views · 0 likes · 0 comments
- **Analytics:** not available yet

**Instagram**: 2 trial reels by Nov 21; the other 4 styles went out Nov 22, outside the window
- **Total:** 222 views · 175 reach · 20m 53s watched · 2 likes · 0 comments · 2 saves · 0 shares
- **Best hold on Instagram all week:** papercut 30.8%, whiteboard 28.2%

| Posted (ET) | Style | Type | Views | Reach | Hold at 3 s | Avg watch | Total watch | Likes | Comments | Saves | Shares | Rank in topic |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Nov 21, 10:06 | whiteboard | trial | 82 | 72 | 28.2% | 4.93 s | 6m 25s | 0 | 0 | 0 | 0 | #2 |
| Nov 21, 12:08 | papercut | trial | 140 | 103 | **30.8%** | 7.42 s | 14m 28s | 2 | 0 | 2 | 0 | **#1** |

### 3. Claude Code in the cloud (Nov 20): best on YouTube

**TikTok** (posted 12:07 PM · 0:54)
- **Views** 206 · **Likes** 8 · **Comments** 0 · **Shares** 1 · **Saves** 1
- **Watch time** 16m 37s total · 4.14 s avg · 1.7% watched to the end · **1 new follower**
- **Traffic:** For You 88.9% · Other 5.8% · Search 3.3% · Following 0.8% · Personal profile 0.8% · DMs 0.4%
- **Search queries:** "Claude code", "claude code cx programming", "claude code explained", "software engineering" (25% each)
- **Viewers:** 111 unique · new 37% / returning 63% · non-followers 73% / followers 27%
- **Age:** 18–24 34% · 25–34 47% · 35–44 10% · 45–54 7% · 55+ 2% · **Gender:** Male 84% · Female 16%
- **Top locations:** Canada 54.2% · US 7.5% · Malaysia 4.6% · Philippines 3.7% · Brazil 2.9%
- **Likes timing:** most likes came at 0:01

**YouTube**: *Claude Code in the Cloud Explained in 60 Seconds* (posted 4:02 PM ET · 0:55)
- **Live:** **795 views** · 5 likes · 0 comments
- **Analytics (first day):** 449 views · 194 engaged views · 102 min watched · 13.6 s per view · avg view duration 28 s (51% of the video)
- **Engagement:** 4 likes · 0 comments · 0 shares · 1 playlist add · **+1 subscriber**, 0 lost
- **Traffic:** Shorts feed 365 (81%) · Other YouTube pages 70 (16%) · YouTube search 11 · Channel page 2 · Subscriber feed 1
- **Search terms:** "cloud code" · one unrelated Korean query
- **Subscribed vs not:** 447 non-subscribers / 2 subscribers (99.6% new people)
- **Top countries:** US 203 · Canada 35 · India 24 · Germany 19 · Australia 15
- **Retention:** 59% at 25% in · 44% at halfway · **24% watched to the end**. That's above typical for similar-length videos (0.72–0.77).

**Instagram**: 6 trial reels
- **Total:** 806 views · 724 reach · 50m 07s watched · 3 likes · 0 comments · **6 saves** (most of any topic) · 1 share
- **Hold at 3 s:** 18.8% weighted. Papercut best (26.2%), soft worst (9.6%).

| Posted (ET) | Style | Type | Views | Reach | Hold at 3 s | Avg watch | Total watch | Likes | Comments | Saves | Shares | Rank in topic |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Nov 20, 12:12 | whiteboard | trial | 131 | 118 | 18.5% | 4.13 s | 8m 32s | 1 | 0 | 2 | 0 | #3 |
| Nov 20, 17:04 | reel | trial | 164 | 146 | 17.3% | 4.17 s | 10m 26s | 0 | 0 | 0 | 1 | #4 |
| Nov 20, 21:02 | soft | trial | 132 | 121 | 9.6% | 2.35 s | 4m 54s | 1 | 0 | 1 | 0 | #6 |
| Nov 21, 00:24 | mono | trial | 125 | 113 | 24.3% | 3.69 s | 7m 04s | 0 | 0 | 1 | 0 | #2 |
| Nov 21, 04:24 | apple | trial | 117 | 107 | 17.1% | 4.31 s | 7m 58s | 0 | 0 | 1 | 0 | #5 |
| Nov 21, 20:16 | papercut | trial | 137 | 119 | **26.2%** | 5.34 s | 11m 13s | 1 | 0 | 1 | 0 | **#1** |

### 4. How Uber treats AI agents like insiders (Nov 19): best on TikTok

**TikTok** (posted 10:06 AM · 0:57)
- **Views** 259 · **Likes** 9 · **Comments** 0 · **Shares** 1 · **Saves** 0
- **Watch time** 27m 24s total · **5.48 s avg** · **2.3% watched to the end** · 0 new followers
- **Traffic:** For You 91.0% · Other 4.0% · Following 2.0% · Search 2.0% · Personal profile 1.0%
- **Search queries:** "safety investigation specialist uber" 75% · "Ai uber" 25%
- **Viewers:** 198 unique (+96 vs 1 day ago) · new 70% / returning 30% · non-followers 90% / followers 10%
- **Age:** 18–24 21% · 25–34 51% · 35–44 17% · 45–54 8% · 55+ 3% · **Gender:** Male 78% · Female 22%
- **Top locations:** Canada 61.3% · US 5.3% · Philippines 3.7% · Bahrain 3.3% · Brazil 2.0%
- **Likes timing:** most likes came at 0:00

**YouTube**: *Uber's AI Insider Threat Program in 60 Seconds* (posted 6:03 PM ET · 0:58)
- **Live:** 13 views · 1 like · 0 comments
- **Analytics:** 10 views · 3 engaged · ~1 min watched · avg view duration 32 s (56%) · 1 like · 0 shares · 0 subs
- **Traffic:** YouTube search 8 · Subscriber feed 1 · Shorts feed 1. **The Shorts feed barely showed it.**
- **Search terms:** "uber system design"
- **Subscribed vs not:** 9 non-subscribers / 1 subscriber
- **Retention:** too few views for a curve

**Instagram**: 5 trial reels + 1 on the main feed (apple)
- **Total:** 937 views · 750 reach · 1h 01m watched · 5 likes · 0 comments · 5 saves · 0 shares
- **Hold at 3 s:** 22.5% weighted. Papercut best (30.6%), whiteboard worst (14.2%).
- **Main-feed post (apple):** 172 views, 24.5% hold, 5.89 s avg watch. That's #3 of 6, and not clearly better than the trials,
  which only reach non-followers.

| Posted (ET) | Style | Type | Views | Reach | Hold at 3 s | Avg watch | Total watch | Likes | Comments | Saves | Shares | Rank in topic |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Nov 19, 14:04 | whiteboard | trial | 198 | 145 | 14.2% | 2.92 s | 8m 54s | 1 | 0 | 1 | 0 | #6 |
| Nov 19, 19:05 | reel | trial | 223 | 193 | 21.1% | 3.85 s | 13m 05s | 1 | 0 | 1 | 0 | #5 |
| Nov 21, 00:13 | apple | **main feed** | 172 | 123 | 24.5% | 5.89 s | 14m 08s | 2 | 0 | 1 | 0 | #3 |
| Nov 21, 00:24 | soft | trial | 127 | 102 | 28.6% | 5.44 s | 10m 09s | 1 | 0 | 1 | 0 | #2 |
| Nov 21, 09:21 | mono | trial | 111 | 91 | 22.5% | 2.98 s | 5m 04s | 0 | 0 | 1 | 0 | #4 |
| Nov 21, 13:22 | papercut | trial | 106 | 96 | **30.6%** | 5.92 s | 9m 40s | 0 | 0 | 0 | 0 | **#1** |

### 5. How to use Opus 5.5 as your daily driver (Nov 18)

**TikTok** (posted 6:03 PM · 0:56)
- **Views** 209 · **Likes** 12 · **Comments** 0 · **Shares** 0 · **Saves** 2
- **Watch time** 13m 15s total · 3.43 s avg · 0.4% watched to the end · 0 new followers
- **Traffic:** For You 86.6% · Other 8.2% · Personal profile 2.6% · Following 1.3% · Search 1.3%
- **Search queries:** "opus 5.5" 66.7% · "opus 5 5" 33.3%
- **Viewers:** 195 unique (+8 vs 1 day ago) · new 56% / returning 44% · non-followers 63% / followers 37%
- **Age:** 18–24 39% · 25–34 52% · 35–44 6% · 45–54 1% · 55+ 2% · **Gender:** Male 75% · Female 25%
- **Top locations:** Canada 29.0% · Malaysia 18.4% · Egypt 6.8% · Maldives 6.8% · Philippines 5.6%
- **Likes timing:** most likes came at 0:01

**YouTube**: *Opus 5.5 as Your Daily Driver: 4 Habits in 60 Seconds* (posted 2:04 PM ET · 0:57)
- **Live:** 74 views · 1 like · 1 comment
- **Analytics:** 69 views · 24 engaged · 11 min watched · 9.6 s per view · avg view duration 27 s (48%)
- **Engagement:** 1 like · 1 comment · 0 shares · 1 playlist add · 0 subs
- **Traffic:** Shorts feed 56 · YouTube search 7 · Other YouTube pages 5 · External link 1
- **Search terms:** "how to use opus 5.5"
- **Subscribed vs not:** 67 non-subscribers / 2 subscribers
- **Views by day:** Nov 18: 48 · Nov 19: 16 · Nov 20: 5
- **Retention:** 50% at 25% in · 42% at halfway · 17% to the end. That's below typical for similar-length videos (0.16–0.24).

**Instagram**: 6 trial reels (best topic on Instagram)
- **Total:** **1,215 views** · 1,028 reach · **1h 32m watched** · **10 likes** · 0 comments · 5 saves · 1 share
- **Hold at 3 s:** 20.7% weighted. Papercut best (29.1%, 8.07 s avg watch, the week's best), soft worst (13.4%).
- **Graduate:** papercut (`Df5v64gAOFy`) meets every playbook rule. Share it to followers.

| Posted (ET) | Style | Type | Views | Reach | Hold at 3 s | Avg watch | Total watch | Likes | Comments | Saves | Shares | Rank in topic |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Nov 18, 10:06 | apple | trial | 192 | 160 | 17.7% | 3.11 s | 9m 04s | 4 | 0 | 1 | 0 | #5 |
| Nov 18, 12:09 | soft | trial | 192 | 161 | 13.4% | 3.37 s | 10m 03s | 2 | 0 | 1 | 0 | #6 |
| Nov 18, 14:07 | mono | trial | 231 | 200 | 19.4% | 4.88 s | 17m 39s | 1 | 0 | 2 | 1 | #4 |
| Nov 18, 17:04 | whiteboard | trial | 210 | 182 | 22.9% | 5.86 s | 18m 22s | 1 | 0 | 0 | 0 | #2 |
| Nov 18, 19:04 | papercut | trial | 201 | 166 | **29.1%** | 8.07 s | 23m 08s | 1 | 0 | 1 | 0 | **#1** |
| Nov 18, 21:02 | reel | trial | 189 | 159 | 21.1% | 4.86 s | 14m 11s | 1 | 0 | 0 | 0 | #3 |

### 6. What is an always-on agent? (Nov 17)

**TikTok** (posted 12:05 PM · 0:52)
- **Views** 259 · **Likes** 11 · **Comments** 0 · **Shares** 0 · **Saves** 2
- **Watch time** 19m 49s total · 4.42 s avg · 1.5% watched to the end · **1 new follower**
- **Traffic:** For You 86.9% · Other 7.1% · Following 2.6% · Search 1.9% · Personal profile 1.5%
- **Search queries:** "best ai agents" 50% · "always on ai agent" 50%
- **Viewers:** 220 unique (+2 vs 1 day ago) · new 57% / returning 43% · non-followers 68% / followers 32%
- **Age:** 18–24 37% · 25–34 53% · 35–44 6% · 45–54 3% · 55+ 1% · **Gender:** Male 70% · Female 30%
- **Top locations:** Canada 50.9% · US 9.7% · Malaysia 5.6% · Philippines 4.1% · Indonesia 3.7%
- **Likes timing:** most likes came at 0:00

**YouTube**: *What Is an Always-On Agent? Explained in 60 Seconds* (posted 4:02 PM ET · 0:53)
- **Live:** 47 views · 2 likes · 0 comments
- **Analytics:** 47 views · 13 engaged · 4 min watched · 5.1 s per view · avg view duration 17 s (34%)
- **Engagement:** 1 like · 0 comments · 0 shares · 0 playlist adds · 0 subs
- **Traffic:** Shorts feed 38 · Other YouTube pages 6 · Subscriber feed 2 · YouTube search 1
- **Subscribed vs not:** 46 non-subscribers / 1 subscriber
- **Views by day:** Nov 17: 39 · Nov 18: 6 · Nov 19: 2
- **Retention:** 38% at 25% in · 23% at halfway · 8% to the end. That's below typical (0.12–0.35).

**Instagram**: 6 trial reels (weakest opening on Instagram)
- **Total:** 1,094 views · 979 reach · 45m 12s watched · 2 likes · 0 comments · 5 saves · 0 shares
- **Hold at 3 s:** 13.6% weighted, the lowest topic. Papercut best (19.8%), mono worst (7.8%). No style beat the graduation bar.

| Posted (ET) | Style | Type | Views | Reach | Hold at 3 s | Avg watch | Total watch | Likes | Comments | Saves | Shares | Rank in topic |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Nov 17, 10:06 | reel | trial | 187 | 164 | 17.3% | 3.01 s | 8m 40s | 0 | 0 | 0 | 0 | #2 |
| Nov 17, 12:06 | apple | trial | 178 | 163 | 12.7% | 2.24 s | 6m 09s | 0 | 0 | 0 | 0 | #4 |
| Nov 17, 14:05 | soft | trial | 183 | 156 | 12.9% | 2.77 s | 7m 51s | 2 | 0 | 3 | 0 | #3 |
| Nov 17, 17:02 | mono | trial | 181 | 167 | 7.8% | 1.9 s | 5m 18s | 0 | 0 | 0 | 0 | #6 |
| Nov 17, 19:05 | whiteboard | trial | 184 | 165 | 10.9% | 3.16 s | 8m 41s | 0 | 0 | 1 | 0 | #5 |
| Nov 17, 21:03 | papercut | trial | 181 | 164 | **19.8%** | 2.98 s | 8m 33s | 0 | 0 | 1 | 0 | **#1** |

---

## What stands out

1. **Each platform had a different winner.** On TikTok, Uber did best (most views, watch time and retention) but got only 13 views on YouTube,
   where the Shorts feed barely showed it. On YouTube, Claude Code in the cloud broke out (795 views, 24% watched to the end, +1 sub)
   but was average on TikTok. Don't judge a topic by one platform.
2. **YouTube viewers stay longer.** Watch time per view is about 5–14 s on YouTube against about 3.4–5.5 s on TikTok. On TikTok, half of
   viewers are gone by 1 s, so the opening frame and first line matter most there.
3. **YouTube views die after day 1** (Opus: 48 → 16 → 5; always-on: 39 → 6 → 2) unless the Shorts feed picks a video up, as it did
   with Claude Code in the cloud. TikTok views kept coming in for 18+ hours.
4. **Both audiences are almost entirely new people.** 87–91% of TikTok views come from For You, and 97–99% of YouTube views are from
   non-subscribers.
5. **Practical "how to" videos get saved most on TikTok** (Opus: 9.6 saves per 1k, always-on: 7.7 per 1k). On YouTube the only
   playlist adds were on Opus and Claude Code in the cloud.
6. **Audience by country differs.** TikTok skews to Canada (29–61%). YouTube's breakout video skewed to the US (45%), then Canada, India,
   Germany and Australia.
7. **Specific names bring search traffic on both platforms**: "opus 5.5", "how to use opus 5.5", "claude code explained", "uber system design".
8. **Comments are almost zero everywhere** (3 across about 6,600 views on all three platforms; 0 on Instagram).
9. **Instagram: papercut won every topic** (#1 in 5 of 5, mean hold 26.4% against 16–19% for the other styles, avg watch 5.6 s against 3.4–4.0 s).
   It's the clearest result of the week. Per the playbook it counts as a *Signal* (same direction in ≥ 3 topics), close to a *Rule*.
   Next by average rank: reel (3.5), then mono and whiteboard (4.0). Apple and soft (4.25) did worst.
10. **Instagram gets the most views and saves** (4,274 views and 23 saves from 26 reels), but each reel is held for less time
    than on the other platforms (median hold 19.6% and avg watch 4.0 s, both below the playbook's 25.5% and 6.2 s).
11. **Opus is the strongest topic on Instagram** (1,215 views, 10 likes, the best single reel). Always-on was the weakest opening
    (13.6% hold), though it ranked well on TikTok.

## Not available or still processing
- **YouTube Nov 21–22:** Analytics not in yet (live counters only). Nov 19–20 Analytics are partial too. Re-pull in 2–3 days.
- **YouTube age, gender and most countries:** held back because the view counts are too small.
- **TikTok Nov 21–22:** search queries and viewer breakdown still processing.
- YouTube doesn't show "saves". Playlist adds are the nearest equivalent.
- **Instagram:** follows and profile visits per reel aren't available through the API. Instagram doesn't give
  age, gender or country per trial reel, or a second-by-second retention curve, so hold at 3 s is the retention measure.
  The Nov 22 reels (sales ×4, cheaper long sessions) go in next week.
