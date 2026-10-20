import anthropic
from tickets import TICKET, Priority

EX_LOW = "My password reset email hasn't arrived."
EX_HIGH = "The payment system is down."
EX_MED = "A question about my invoice."

client = anthropic.Anthropic()
reply = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    system="Label the ticket High, Medium or Low.",
    messages=[
        {"role": "user", "content": EX_LOW},
        {"role": "assistant", "content": "Low"},
        {"role": "user", "content": EX_HIGH},
        {"role": "assistant", "content": "High"},
        {"role": "user", "content": EX_MED},
        {"role": "assistant", "content": "Medium"},
        {"role": "user", "content": TICKET},
    ],
)
label = reply.content[-1].text
print(Priority(label))
