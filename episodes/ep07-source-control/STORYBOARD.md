# Episode 07 · Why did Anthropic replace git? (182.4 s, avatar narrator)

A full explainer of the Anthropic Engineering post *Redesigning source control at Anthropic* (Nick G. and the
source control team, 2026-10-13, anthropic.com/engineering/redesigning-source-control): why they moved off git,
what Scion is, how it works, how it's used, and the tradeoffs. That post is the only source; nothing on screen or in
the voice comes from anywhere else. Every term is explained in plain words the first time: git (the tool that tracks
every version of code), a copy / checkout, a mirror, a snapshot, a cache ("a local copy of what it already fetched", s07), a changeset, merging, and each
cache layer (s10).

Six chapters, named in each eyebrow: 1 · Why they left git → 2 · What Scion is → 3 · How it works → 4 · How it's used
→ 5 · The tradeoffs → 6 · How they built it.

The first cut (45.6 s, 7 scenes) is kept as `renders/ep07-source-control-45s.mp4`.

## Facts used (checked against the post on 2026-10-13)

| On screen / in the voice | The post says |
|---|---|
| s02: 2,500 → 30,000+ changes merged a day, May → September 2026; bars to scale (50 px : 600 px) | "In May 2026, Anthropic averaged around 2,500 code changes merged per day; as of September, we merged over 30,000 per day." |
| s02: "With Claude"; the bottleneck became tools built for humans | "coding is no longer the bottleneck … The bottleneck, now, is all of the developer infrastructure built for human scale: source control, builds, and CI." |
| s03: git gives every copy the whole project and its history; works offline; perfect for most projects | "every clone is a complete, self-contained repository that can compute diffs, read history and blame, and check out any revision while fully offline. For the vast majority of repositories, this is the right design" |
| s04: one giant project (monorepo); ~100 GB of history; each copy 25 GB+; 25 million checkouts a day; 600 million GB a day if fetched naively | "The history of our main branch alone is almost 100 GB, and a compressed working copy is over 25 GB. We perform on the order of 25 million code checkouts per day for CI … Fetched naively, that would be over 600 PB of git traffic per day." (600 PB = 600 million GB.) |
| s05: hundreds of git mirrors and snapshots bought time but got harder to run; snapshots fall behind | "at our peak, we operated several hundred internal git mirrors … This bought us time, but they became harder to operate as our merge rate increased. Seeds fell further from the tip of main between refreshes" |
| s06: one main copy; almost every user an agent or automated job, always online; why a full copy each? | "we were using git as a centralized system with one authoritative copy, but nearly all of our clients were agents and jobs that are online by definition" |
| s07: Scion, their own version control system; the server holds the code and does history, commits, merges; clients keep a small cache and ask | "we built Scion, an in-house version control system"; "the server answers questions about file history and blame, creates commits, performs merges and rebases … The client maintains a bounded local object cache" |
| s08: a changeset lists only the files that changed, with links (content-addressed pointers) to their contents in storage; same content → same address, never changes, any cache can keep it | "a changeset stores a list of the files that changed relative to its first parent, along with content-addressed pointers to the compressed file contents in blob storage"; "All source control data is content-addressed, so a piece of data never changes once it's stored, and any server can cache it without checking with the others." |
| s09: the client asks only for the folders it needs, from the top; some files arrive only when read | "Starting from a root tree, the client checks its local store for missing trees and requests them recursively, then repeats the process for blobs"; "sparse checkouts, which only contain the directories the client asks for, and virtualized checkouts, which materialize files on demand" |
| s10: a job looks nearest first: scion-daemon, one cache on its machine shared by every job there → scion-cache, servers in the same region that keep data ready in memory → the main scion servers, the source of truth, reading from the database and cloud storage; each layer 99%+ | "the client talks over a socket to a daemon, scion-daemon, that stores objects for the whole node … jobs on the same node reuse most of the same objects … talks only to the tree and blob cache servers in its region, called scion-cache. These cache servers stream objects directly from memory … When a cache is missing an object, it asks the authoritative scion-servers, which read from Spanner or cloud storage as needed"; "Each tier of this system maintains a cache hit rate of over 99%" |
| s11: 200× less CPU and memory than the old git mirrors (squares to scale by area, 420 vs 30 px = 196×); checkouts in seconds, not minutes; CI got 25% of its CPU back | "200x smaller than our previous git mirroring infrastructure in terms of CPU and memory requirements … in seconds rather than minutes … CI alone realized a 25% CPU capacity win" |
| s12: jobs ask the server instead of copying ("what changed in this commit?"); tools that find and undo bad changes work the same way | "all of the source control queries the client uses are also exposed via API, so in many cases jobs don't need a local repository at all. Many internal tools, such as our automated bisect and revert pipelines, wouldn't be practical at scale without this"; "a CI job that needs the diff between a commit and its merge base … can ask the server for it" |
| s13: no lock on the merge queue; changes land first, tests run after; Claude usually fixes clashes before a human would notice | "We haven't been able to effectively replicate the industry standard of a global repository lock on the merge queue, so instead, we've invested in post-merge and pre-deploy automated testing. This does mean that concurrent changes can conflict, but Claude can typically fix these conflicts faster than humans can even identify them." |
| s14: gave up working without the server, branches (mostly), git's tools (review, search, testing); got far less data per copy, growth by adding machines, checkouts in seconds | "It can compute very little on its own but, in exchange, it requires much less data locally"; "discourages refs (pointers to commits, such as branches and tags), except for the main ref or release branches"; "it requires its own code review, code search, and CI"; "every component is independently scalable" |
| s15: not for most teams, only giant codebases with swarms of agents; ideas git could borrow (smarter servers, server-side API, partial copies that work together) | "Scion is by no means a suitable replacement for git for general use … only make sense for truly enormous monorepos, with either tens of thousands of engineers or swarms of agents"; "novel server architectures … comprehensive server-side RPCs … the various sparse and shallow features in git can be made to compose well" |
| s16: 7 people, 5 months, with Claude | "A team of seven people built both Scion and Antique … and fully migrated to them in five months" |

Example file names, fingerprints (9f2c…, 41ab…) and the diff in s08, s09 and s12 are illustrative and labelled
"example" where they could be mistaken for real data.

Left out for length (all in the post): derived data (blame, path history, commit-graph skip lists), Spanner ref
compare-and-swap, Antique, code search and IAM, directory-level permissions and semantic approvals, Claude Mythos
Preview's rewrite of the ingestion pipeline (20× less memory, 4× faster), Claude "superfans" watching each component,
hermetic simulations and fuzzing, engineers telling Claude "no" (cut at the user's request), prior art (Google's
Piper, Meta's Sapling).

## Scenes

| Slot | Time | Chapter | What you see |
|---|---|---|---|
| s01 | 0–4.7 | Hook | "Why did Anthropic replace git?" (git highlighted) · Git: the tool that tracks every version of code. |
| s02 | 4.7–16.3 | 1 | Bars to scale: May 2,500 → Sep 30,000+, Claude logo · "The bottleneck: tools built for humans." |
| s03 | 16.3–24.9 | 1 | Three laptops, each holding the whole project and its history · Works offline (struck wifi) · "For most projects, that's perfect." |
| s04 | 24.9–38.5 | 1 | One giant project (~100 GB of history) fans out into 25 GB+ copies × 25,000,000 checkouts a day = 600 million GB a day. |
| s05 | 38.5–45.5 | 1 | A grid of git mirrors; a snapshot left behind as the newest code races away; the grid shudders · "Bought time, but harder and harder to run." |
| s06 | 45.5–54.5 | 1 | One main copy wired to agents and jobs, lights blinking "Always online"; a full 25 GB copy crossed out · "So why give each one a full copy?" |
| s07 | 54.5–69.7 | 2 | "Scion" · the SCION rack; History / Commits / Merges pop out; clients with small caches · "Cache: a local copy of what it already fetched" · files ride the wires into the caches · "The server does the work. Clients just ask." |
| s08 | 69.7–82.5 | 3 | Example changeset card (only the changed files) → links to storage; contents → fingerprint → 9f2c… · "Same content, same address: it never changes." · copies land in three caches. |
| s09 | 82.5–90.9 | 3 | A dashed folder tree on the server; the client's path turns solid from the top (all code → api); a program reads server.py and only that file arrives · "Download only what you read." |
| s10 | 90.9–116.2 | 3 | Whiteboard, three rows, nearest first, each named and explained: a computer whose jobs share one cache drum (On the same machine · scion-daemon) → "Not there?" → a building of servers (In the same region · scion-cache) → "Not there?" → a rack and a database (The main servers · scion-servers). A request dot walks down as each is named, then returns to the machine as "99%+ answered here" pops on each row · "So very few requests reach the main servers." |
| s11 | 116.2–123.8 | 3 | 200× (big square vs tiny square) · Checkouts: minutes → seconds · CI: 25% of its CPU back. |
| s12 | 123.8–134.2 | 4 | A test job with no copy asks SCION "What changed in this commit?" and gets the answer · tools: find the bad change, undo it · "Just ask. No copy needed." |
| s13 | 134.2–146.0 | 4 | Changes pile up at a locked gate; the lock opens, they all land, each gets a test tick; two clash, the Claude logo fixes it · "Land first, test after. Claude fixes the clashes." |
| s14 | 146.0–160.6 | 5 | A balance scale tips as items appear: gave up (working without the server, branches mostly, git's tools) vs got (far less data per copy, grows by adding machines, checkouts in seconds). |
| s15 | 160.6–171.2 | 5 | Codebases from small to giant: "Most teams: git is the right fit" vs "Scion: giant codebases, swarms of agents" · ideas git could borrow. |
| s16 | 171.2–175.8 | 6 | Seven figures, "7 people · 5 months", the Claude logo, "with Claude". |
| s17 | 175.8–182.4 | End | Git copies everything · Scion's server does the work · Fetch only what you read · Built for agent-scale code · follow pill · source. |

## Voiceover (Sanjay; source of truth: voiceover.json)

| Scene | At (s) | Line |
|---|---|---|
| s01 | 0.2 | Why did Anthropic stop using git, and what did they build instead? |
| s02 | 0.1 / 4.1 / 7.6 | In May, they merged 2,500 code changes a day. · With Claude, by September: over 30,000. · The bottleneck became tools built for humans, like git. |
| s03 | 0.1 / 4.15 | Git gives every copy the whole project and its entire history. · So you can work offline. For most projects, that's perfect. |
| s04 | 0.1 / 6.65 | But all of Anthropic's code lives in one giant project, with almost 100 gigabytes of history. · Each copy is over 25 gigabytes, and test jobs check out code 25 million times a day. |
| s05 | 0.1 | Hundreds of git mirrors and snapshots bought them time, but got harder to run as merges sped up. |
| s06 | 0.1 / 5.95 | Then they noticed: almost every user was an agent or an automated job, always online. · So why give each one a full copy? |
| s07 | 0.1 / 3.45 / 8.4 | So they built Scion, their own version control system. · The server holds the code and does the heavy work: history, commits, merges. · Each client keeps a small cache, a local copy of what it already fetched, and asks the server for the rest. |
| s08 | 0.1 / 6.15 | Every change is saved as a changeset: just the files that changed, with links to their contents. · Each link is made from the content itself, so the data never changes and any cache can keep it. |
| s09 | 0.1 / 4.1 | A client asks only for the folders it needs, starting from the top. · Some files arrive only when a program reads them. |
| s10 | 0.1 / 3.4 / 9.15 / 14.35 / 20.25 | When a job needs data, it looks nearest first. · First, scion-daemon: a cache on its own machine, shared by every job running there. · Next, scion-cache: servers in the same region that keep data ready in memory. · Last, the main scion servers: the source of truth, reading from the database and cloud storage. · Each layer answers over 99 percent of requests itself. |
| s11 | 0.1 / 3.9 | It needs 200 times less computing than their old git mirrors, · and checkouts take seconds, not minutes. |
| s12 | 0.1 / 5.8 | Many jobs never copy the code. They just ask the server, like: what changed in this commit? · Tools that find and undo bad changes work the same way. |
| s13 | 0.1 / 3.85 / 6.8 | With so many changes, making each one wait its turn doesn't work. · So changes land first, and tests run after. · If two clash, Claude usually fixes it before a human would notice. |
| s14 | 0.1 / 3.6 / 8.75 | The catch: a Scion client can't do much without the server. · Branches are discouraged, and code review, search and testing had to be rebuilt. · In return: far less data per copy, and a system that grows by adding machines. |
| s15 | 0.1 / 6.5 | So Anthropic says Scion isn't for most teams, only for giant codebases with swarms of agents. · Instead, they're sharing ideas that git could borrow. |
| s16 | 0.1 | Seven people built it in five months, with Claude. |
| s17 | 0.1 | Git copies everything. Scion asks only for what it needs. Follow for more AI basics. |

Each scene keeps its line starts in a `V` table at the top of its script; beats sit on the words, measured from the
pauses in each take (whisper isn't installed here). The narrator keeps the scene starts it needs in `START` / `LEN`
(it can't read the host slots at runtime): update them with index.html.

## Avatar

title peek (s01) → corner (s02–s16; only eyebrows and captions, left of x 830, above y 485) → end (s17). Doubt on the
hook and on "harder to run" (s05); smiles on "So they built Scion" (s07), on "with Claude" (s16) and on the end card. Every scene's finished state and both glides checked with snapshots.

## History

- 2026-10-13, first cut: 45.6 s, 7 scenes (growth, copies, Scion, results, team). Kept as `-45s.mp4`.
- 2026-10-13, full explainer at the user's request ("doesn't give enough information on why they made the switch, the
  tradeoffs, what Scion actually is and how it works … we can make the video longer"): 17 scenes in six chapters,
  166.9 s. CLI pin bumped 0.8.137 → 0.8.153 for this episode.
- 2026-10-13, user notes: drop "their job was telling Claude no" (s16 is now just 7 people, 5 months, with Claude);
  the three cache layers as a whiteboard drawing instead of numbered isometric blocks, each layer explained in plain
  words (s10 grew to 25.3 s); "cache" itself defined in s07. 182.4 s.
