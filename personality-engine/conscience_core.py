# SYNTHEOS Conscience Engine
def generate_reflection(recent_tones):
    low_count = sum(1 for t, _ in recent_tones if t == "low")
    if low_count >= 3:
        return "You've seemed a bit down recently. Want to talk or take a break?"
    return None
