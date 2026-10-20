"""ep12 · send the few-shot prompt from shots.py to Claude (not shown in the video).

Needs `pip install anthropic` and an API key (ANTHROPIC_API_KEY, or an `ant auth login` profile).
"""
import anthropic

from shots import few_shot

# Thinking is always on for this model, so leave room for it and keep effort low for a simple label.
# Server-side fallbacks re-run the request on another model if a safety classifier declines it.
reply = anthropic.Anthropic().beta.messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    output_config={"effort": "low"},
    betas=["server-side-fallback-2026-07-01"],
    fallbacks="default",
    messages=[{"role": "user", "content": few_shot}],
)
if reply.stop_reason == "refusal":
    print("Claude declined:", reply.stop_details)
else:
    print("Claude:", next(b.text for b in reply.content if b.type == "text"))
