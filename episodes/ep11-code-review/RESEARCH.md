# Episode 11 · Code review on the Claude Code team · research notes (internal)

Source: one engineering article, "How the Claude Code team does code review" (Oct 15, 2026), read in full on
2026-10-16. Internal only: the video never names or links the source. Every fact below has a short verbatim quote
for the fact-checker. Facts marked **[used]** are in the narration or on screen; the rest are kept for reference.

## Why review had to change

- **[used]** Claude writes about 90% of Claude Code's own code. "Claude writes about 90 percent of Claude Code's own code."
- **[used]** The article opens on the question of who reads it. "Does anyone read code anymore? And if something breaks, who catches it?"
- **[used]** Review wasn't removed; the reading moved to machines. "We didn't remove review. But we did move most of the reading to machines, optimized for human time and attention, and invested heavily in making it fast and easy to undo mistakes."
- Results, June to September: "merged pull requests to Claude Code's codebase more than doubled while the share that had to be reverted fell by more than 40 percent."
- Monorepo volume: "changes landing per day went from about 2,500 in May to more than 30,000 in September this year."
- Line-by-line review doesn't scale: "manual, line-by-line code review is incredibly difficult if not impossible."
- Two jobs of review: "Find and fix issues before they ship" and "Build shared context and codebase understanding across the team".
- The reframed question: "'did a human read the code?' is an imprecise proxy for 'what could go wrong with this change, and which check—automated or human—is the right one to catch it?'"
- Review moved earlier: "Now, review runs continuously, more like spellcheck while you write." / "Most changes have been reviewed and fixed by Claude at least once before a human is asked to look."
- Goal: "most pull requests ... merge with at most one human in the loop, who can be the author, with no increase in reverts or incidents."
- Guardrail: "Revert and incident rates are the guardrail: if they rise, we haven't saved human time, we've only moved it."

## The review, step by step (in the order a change goes through it)

Order per the article's "life of a change" figure: verified before the PR → required CI → Claude code review →
security review → risk-based approval → merge queue → flag / internal use → gradual release → watch, fix forward or roll back.

### 1. Before the pull request

- **[used]** Claude runs checks and shows the output. "We give Claude something it can run—like tests, a build or a screenshot to compare against the design—and ask it to show the output instead of saying it's done."
- **[used]** Figure label: "Claude runs the tests, build and linter; a second agent reviews the diff in a fresh context"
- **[used]** "Then a subagent reviews the diff with fresh context."
- Most review is now here: "Most review now happens before a PR exists."
- Internal skills before a PR: "one hunts for bugs, one simplifies the diff, and one checks the behavior end to end."
- Verification matters most: giving Claude a way to verify its work is "probably the most important thing for getting good results"; "two to three times better".
- Repeated findings get fixed at the source: "When the automated reviewer keeps flagging the same thing, we fix it at the source: in the skill, with a lint rule, or with updates to instructional files"
- CLAUDE.md: "tells Claude what the project is: the stack, the conventions, the goals and the non-goals. Every review loads it"
- REVIEW.md: "written by code owners, tells the reviewer what matters in their part of the code." Good ones "cap the nits, list paths to skip, and ask for a file and line as evidence instead of a guess from a name."

### 2. Required CI

- Lint, types, tests, build; red blocks. "Lint, types, tests across platforms, build and packaging. Red blocks the merge"
- "A typical CLI pull request may run dozens of checks before anyone looks at it."
- PR template: "asks how the change was tested and how to undo it. Claude can fill that in, but the person who asked for the change signs off on it."

### 3. Claude code review on every PR

- **[used]** Every PR is reviewed by Claude first. "Every pull request gets a Claude review before a person looks."
- **[used, on screen]** What it checks: "It reads the diff against the whole repo and the PR's stated intent, and asks: does the change solve its problem, fit the system, or break something else?"
- **[used]** Parallel bug hunt: "Several agents look for bugs at the same time." Figure: "Agents hunt for bugs in parallel, verifiers vote on each finding, survivors ranked by severity"
- **[used]** Voting: "Then a separate group votes on each finding, and it only gets posted if enough of them agree it's real."
- **[used, on screen]** Filter: "Findings that are only about style, diagnostics, or cleanup get dropped." ("We A/B tested those filters on our own PRs before keeping them.")
- **[used]** Output and tags: "What's left shows up as inline comments sorted by severity. Each is tagged Important, Nit, or Pre-existing, so a bug the PR didn't introduce doesn't look like the author's fault."
- **[used]** Every finding answered: "Every finding has to be answered. You either fix it or resolve the thread with a reason."
- Overnight fixes: "Often an agent picks up the fix overnight, so the author comes back to a PR that's already been through another round."
- Bug fixes: "On a bug fix, it looks for the root cause."
- Depth setting: "Admins set each repo to Quick, Standard, or Deep."
- Impact: "the share of internal PRs getting substantive review comments went from 16% to 54%." / "Most PRs over 1,000 lines get findings, and most small ones come back clean."
- Product: "Code Review for Claude Code, is now generally available on Team and Enterprise plans, and /code-review runs a lighter version locally."

### 4. Security review that can block

- **[used]** "Security gets its own automated review too."
- **[used]** "A PR can't merge while any finding from the bug review or the security review is still open."
- Clearing: "You either fix it or close the thread with a short reason, which is how you clear a false positive." / "If a later commit fixes the issue, the finding clears on its own."

### 5. Human approval, scaled by risk

- **[used]** Classifier sets the tier: "A classifier reads the change and picks its risk tier." Figure: "A classifier sets the tier: no person, one, or two. Some paths always need a person"
- **[used, on screen]** Tier table: Low "Docs, copy, internal-only features, additive changes behind a flag" → "None required once automated review and security checks are green"; Medium "Ordinary product changes, and changes to sensitive areas such as caching, the auto-updater, or system prompts" → "One person"; High "The highest-risk code, plus a small set of paths that always need two people" → "Two people".
- **[used, on screen]** "The change sets the tier, not the author."
- **[used]** "An agent's approval never counts as a person's, either. Automated review can clear a low-risk change, but it can't fill a slot that calls for a human."
- Second classifier: "asks whether this particular change needs another person even when its tier says it doesn't."
- Always a person: "anything owners have listed as sensitive and any CI workflow file."
- Trusted authors: "Only authors on the repo's trusted list get the lighter paths".
- Prompter is accountable: "the person directing the agent counts as one of the required reviewers".
- "An approval covers one specific commit."

### 6–7. Merge and after

- Merge queue: "re-runs every check against main with the change applied, so two PRs that pass separately can't combine into a broken main."
- Flags and internal use: "New behavior usually ships behind a flag to Anthropic employees first".
- Release channels: "Public releases go to the latest channel first. The stable channel trails it."
- Rollback: "Flags turn off without a deploy." / "Claude Code has a weekly on-call rotation, and incident reviews ask which layer should have caught the issue."
- Layers, not a gate: "Each layer catches some problems and misses others. Few get through all of them, and rollback handles the rest."

## Making the reviewer better (not used)

- Incidents as evals: "The reviewer runs against that set daily."
- Noise: "We sort every comment the reviewer leaves by how the person on the PR responded".
- Runaway loops: "One CLI PR went through more than fifty rounds of review and fixes overnight before its author stopped it."
- Fixes: "A round cap. After three rounds, the reviewer asks the author to step back and reconsider the approach." / "Diff-only re-review after the first few passes." / "Flag the class of bug" / "No repeats of findings already posted."
- Results: five or more rounds "8.9%" → "1.5%"; mean reviews to pass "2.08" → "1.32".

## Where humans stay (not used)

- "Should we build this at all?", "Risky code such as billing, the auto-updater and CI workflows.", "Architecture that sets a pattern others will copy.", "Reading the evidence.", "Owning the outcome."
- Culture: "You land it, you own it" / "Blast radius sets the bar."

## Example data in the video (not from the article)

- The diff (`getItems`, the `<=` off-by-one), the comment texts, the test counts (`48 passed`), the security finding
  text and the reply texts are illustrative. They show what the article describes; they are not quoted from it.

## Style notes: how the article writes

- **Opens on blunt questions, then answers them.** It poses the reader's worry outright and spends the article
  answering it: "So how do we review code at the volume we produce it? Does anyone read code anymore? And if
  something breaks, who catches it?"
- **Short declarative sentences, often in contrast pairs.** A denial, then the real move: "We didn't remove review.
  But we did move most of the reading to machines." / "The change sets the tier, not the author."
- **Before / now framing for transitions.** "Before, review was a gate at the end of the road: write the code, open a
  PR, wait for your colleague." then "Now, review runs continuously, more like spellcheck while you write."
- **Concrete, plain, a little dry.** Numbers and specifics instead of adjectives; no hype words. "Most PRs over 1,000
  lines get findings, and most small ones come back clean." / "A person can wave off a nit in seconds. An agent
  fixes it, which means another commit and another round of review."
- **Rules stated as flat facts, colon then the detail.** "Every finding has to be answered. You either fix it or
  resolve the thread with a reason." / "Review has to converge."
- Applied to the narration: questions in the hook, a "didn't X. But Y." turn, one plain sentence per step with a
  concrete noun (tests, diff, finding, merge), colons before lists, no exclamation-driven hype in the body.
