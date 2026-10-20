"""ep12 s06: the JSON body each script sends, in bytes (no API call). Shows the examples riding along every time."""
import json
from tickets import TICKET

SYSTEM = "Label the ticket High, Medium or Low."
EXAMPLES = [
    ("My password reset email hasn't arrived.", "Low"),
    ("The payment system is down.", "High"),
    ("A question about my invoice.", "Medium"),
]


def body(n):
    messages = []
    for text, label in EXAMPLES[:n]:
        messages += [{"role": "user", "content": text}, {"role": "assistant", "content": label}]
    messages.append({"role": "user", "content": TICKET})
    return {"model": "claude-opus-5-5", "max_tokens": 1024, "system": SYSTEM, "messages": messages}


for n, name in [(0, "zero-shot"), (1, "one-shot"), (3, "few-shot")]:
    b = body(n)
    print(f"{name}: {len(b['messages'])} messages, {len(json.dumps(b).encode())} bytes")
