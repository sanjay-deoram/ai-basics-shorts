import anthropic
from tickets import TICKET, Priority

EX_LOW = "My password reset email hasn't arrived."

client = anthropic.Anthropic()
reply = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    system="Label the ticket High, Medium or Low.",
    messages=[
        {"role": "user", "content": EX_LOW},
        {"role": "assistant", "content": "Low"},
        {"role": "user", "content": TICKET},
    ],
)
label = reply.content[-1].text
print(Priority(label))
