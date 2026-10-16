"""ep10 · The ReAct loop, runnable.

TOOLS below is exactly the code card in s03 (tools.py), and agent() is exactly the code card in s05
(agent.py), as it reads after the "cap the steps" edit. The trace in s04 is what one run of it looks like.

Run it for real:   python react_agent.py          (needs ANTHROPIC_API_KEY or `ant auth login`)
Test it offline:   python react_agent.py --fake   (a scripted stand-in for Claude, no API calls)

Simplified for the video:
- The answer is read from the last content block (content[-1]), which is right on a normal end_turn.
  The robust form is next(b.text for b in resp.content if b.type == "text"); a refusal with empty
  content, or a max_tokens stop that ends on a thinking or tool_use block, breaks content[-1].
- No error handling: a tool that raises crashes the loop (in production, return a tool_result with
  "is_error": True instead).
- No streaming, no explicit output_config.effort (Opus 5.5 defaults to medium), and no server-side
  refusal fallbacks, all of which production code on claude-opus-5-5 should have.
- The "Think" lines in the s04 trace paraphrase Claude's reasoning. On Opus 5.5 that reasoning comes
  back as thinking blocks whose text is empty unless you ask for thinking.display "updates".
"""
import sys
from types import SimpleNamespace as NS

MODEL = "claude-opus-5-5"


# ---- the tools (example data: the meeting and the weather are made up) ----
def next_meeting():
    return "3 pm, Toronto"


def get_weather(city):
    return "Rain, 12°C"


# ---- on screen (s03, tools.py) ----
TOOLS = [
    {"name": "next_meeting",
     "description": "The user's next meeting",
     "input_schema": {"type": "object",
                      "properties": {}}},
    {"name": "get_weather",
     "description": "Weather forecast for a city",
     "input_schema": {"type": "object",
                      "properties": {"city": {
                          "type": "string"}},
                      "required": ["city"]}},
]
# ---- end of on-screen code ----
FUNCTIONS = {"next_meeting": next_meeting, "get_weather": get_weather}


def run(block):
    """Act: run the tool Claude asked for and wrap the output as a tool_result."""
    out = FUNCTIONS[block.name](**block.input)
    return {"type": "tool_result", "tool_use_id": block.id, "content": out}


# ---- on screen (s05, agent.py) ----
def agent(ask):
    messages = [{"role": "user", "content": ask}]
    for step in range(10):
        resp = client.messages.create(
            model=MODEL, max_tokens=16000,
            tools=TOOLS, messages=messages)
        if resp.stop_reason != "tool_use":
            return resp.content[-1].text
        messages.append({"role": "assistant",
                         "content": resp.content})
        results = [run(b) for b in resp.content
                   if b.type == "tool_use"]
        messages.append({"role": "user",
                         "content": results})
    return "Stopped after 10 steps"
# ---- end of on-screen code ----


class FakeClaude:
    """Plays the s04 trace: think + call next_meeting, think + call get_weather, then answer.
    Checks every request has the shape the real API needs."""

    def __init__(self, loop_forever=False):
        self.calls = 0
        self.loop_forever = loop_forever
        self.messages = self  # so client.messages.create(...) works

    def create(self, model, max_tokens, tools, messages):
        assert messages[0]["role"] == "user"
        for a, b in zip(messages, messages[1:]):
            assert a["role"] != b["role"], "roles must alternate"
        if self.calls:  # every tool_use in the last turn has a matching tool_result
            asked = {b.id for b in messages[-2]["content"] if b.type == "tool_use"}
            got = {r["tool_use_id"] for r in messages[-1]["content"]}
            assert asked == got, (asked, got)
        self.calls += 1
        text = lambda t: NS(type="text", text=t)
        use = lambda i, n, inp: NS(type="tool_use", id=i, name=n, input=inp)
        if self.loop_forever:
            return NS(stop_reason="tool_use", content=[use(f"t{self.calls}", "next_meeting", {})])
        if self.calls == 1:
            return NS(stop_reason="tool_use", content=[text("Where is the meeting?"), use("t1", "next_meeting", {})])
        if self.calls == 2:
            assert messages[-1]["content"][0]["content"] == "3 pm, Toronto"
            return NS(stop_reason="tool_use", content=[text("Weather in Toronto?"), use("t2", "get_weather", {"city": "Toronto"})])
        assert messages[-1]["content"][0]["content"] == "Rain, 12°C"
        return NS(stop_reason="end_turn", content=[text("Yes, bring one! Your 3 pm is in Toronto, and it's raining.")])


if __name__ == "__main__":
    ask = "Do I need an umbrella for my next meeting?"
    if "--fake" in sys.argv:
        client = FakeClaude()
        print(agent(ask))
        assert client.calls == 3, client.calls  # three trips round the loop, as in s04
        client = FakeClaude(loop_forever=True)
        print(agent(ask))
        assert client.calls == 10, client.calls  # the cap stops it
        print("ok")
    else:
        import anthropic

        client = anthropic.Anthropic()
        print(agent(ask))
