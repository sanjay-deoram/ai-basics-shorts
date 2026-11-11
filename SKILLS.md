# Skills used

Claude Code skills invoked while building these shorts (see `CLAUDE.md` for how they are used):

- `/hyperframes` — entry point for every video request; routes to the right HyperFrames workflow
- `/hyperframes-core` — composition contract (`data-*` timing, tracks, sub-compositions); loaded before writing any scene HTML
- `/claude-api` — Claude API reference
- `/under-60 <topic>` — this repo's own skill (`.claude/skills/under-60/SKILL.md`): makes an *Under 60 seconds*
  short, e.g. `/under-60 vector embeddings`

The HyperFrames skills install with `npx hyperframes skills update`.
