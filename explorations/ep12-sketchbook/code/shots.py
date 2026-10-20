examples = [
    ("My password reset email hasn't arrived.", "Low"),
    ("The payment system is down.", "High"),
    ("A question about my invoice.", "Medium"),
]
issue = ("I can't access my account, "
         "and my report is due today.")

def build_prompt(shots):
    lines = ["Rate this issue: High, Medium or Low."]
    for text, label in shots:
        lines += [f"Issue: {text}", f"Priority: {label}"]
    lines += [f"Issue: {issue}", "Priority:"]
    return "\n".join(lines)

zero_shot = build_prompt([])
few_shot = build_prompt(examples)
print("zero-shot:", len(zero_shot), "characters")
print("few-shot:", len(few_shot), "characters")
