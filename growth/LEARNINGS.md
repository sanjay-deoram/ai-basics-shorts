# What's working, what isn't

Updated at every weekly review. Each finding carries its evidence and a confidence label: *Hunch* (one topic),
*Signal* (same direction in ≥ 3 topics), *Rule* (≥ 6 topics, then moved into `studio/DESIGN.md` or `/under-60`).
Numbers are Instagram unless marked otherwise; the full table is `ledger.csv`.

**Account baseline (2026-11-13, 24 Instagram reels):** median 360 views, **25.5 % still watching at 3 s**, 6.2 s
avg watch (~10 % of a 60 s video), 15 saves and 5 shares per 1k reach. Comments are close to zero on every post.

## Working: keep doing, test harder

| # | Finding | Evidence | Confidence |
|---|---|---|---|
| W1 | **A curiosity question about a named company** holds viewers far better than an explainer. | "Why did Anthropic stop using git?": 50.1 % hold (2× median), 29.9 s avg watch (5×), 2,031 views, 17 shares. | Hunch (1 post, huge effect). ep17 "How the Claude Code team does code review" uses the same angle: read it next week. |
| W2 | **"What is X?" for a foundational term** beats "how X works". | Median hold 29.2 % across 7 "what is" posts vs 18.3 % across 4 "how it works" posts; "What is an embedding?" 2,164 views, 33 % hold, 37 saves. | Signal (weak: the posts are from different weeks and eras). |
| W3 | **How-to topics get saved.** | Claude skill reels: median 19.3 saves per 1k reach (soft 25, mono 24.8) vs 15.1 account median. | Hunch (1 topic, 7 variants). |
| W4 | **Style test #1 (Claude skill, 7 looks):** papercut held best; soft and mono reached furthest. | papercut 31.9 % hold, 10.5 s watch; soft 3,137 views, 67 saves; mono 2,334 views; sketch 1,437; apple 608; reel 559; whiteboard 282 views and 4.2 s watch (weakest). | Hunch: 1 topic, captions differed, posts were 1–2 days old. The tournament (PLAYBOOK §5) is what settles it. |
| W5 | YouTube gave the same video more views than the other platforms. | RAG, Oct 15: YouTube 711, Instagram 229, TikTok 122. YouTube median 259 over 5 posts. | Hunch. |

## Not working: fix or stop

| # | Finding | Evidence | Fix we're testing |
|---|---|---|---|
| N1 | **The first 3 seconds lose 3 of every 4 viewers.** This is the biggest lever. | Median hold 25.5 %; "How RAG works in 60 seconds" was the worst at 13.9 % hold and 2.9 s watch. | Hook tests inside the series rules: the title stays on frame 0, but the wording becomes a question or names a company or tension ("Anthropic stopped using git. Here's why…"). |
| N2 | People who stay still leave early. | 6.2 s median avg watch on ~60 s videos. | Earlier payoff tease in the "name it" beat; watch % watched by scene once we have more data. |
| N3 | TikTok barely moved. | 4 posts in October: 122–308 views, 1.9–4.1 s avg watch. No TikTok posts from Oct 20 until Nov 13. | Post consistently (3/week) for 4 weeks before judging. |
| N5 | Captions vary between variants and contain typos, which muddies the style tests. | Skill reels had 7 different captions, one with "clause skill". | Same caption across a topic's variants. |
| N6 | Posting gaps. | Nothing posted Oct 20 – Nov 9. | Fixed weekly cadence. |

## Open questions (tests queued)

1. Which of the 6 styles wins across topics? (Instagram trial tournament, 2 weeks.)
2. Does a question or company-angle title lift hold on the frame-0 title card? (Hook tests from week 3.)
3. Reel vs apple on TikTok and YouTube (alternated, PLAYBOOK §2).
4. Does a question at the end of the caption bring comments?
5. Our own best time slots (4 weeks of rotation).
6. **Does TikTok hold back a second or third version of the same topic?** No policy says restyled versions of your own
   video are penalised. TikTok's "unoriginal content" rules target reposting other people's work. But TikTok has said its
   For You feed removes duplicated content and avoids showing two videos in a row with the same sound
   ([TechCrunch, 2020](https://techcrunch.com/2020/06/18/tiktok-explains-how-the-recommendation-system-behind-its-for-you-feed-works)),
   and our variants share the same voice track. Test already running: ep16 goes out twice and ep17 three times on
   TikTok and YouTube (Nov 13–15). Compare views and For You share of copy 1 vs 2 vs 3.
