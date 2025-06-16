# Extracts sentiment and emotional cues
def analyze_mood(text):
    # Placeholder: real model would use transformers or external API
    if any(word in text.lower() for word in ["sad", "tired", "overwhelmed"]):
        return "low"
    elif any(word in text.lower() for word in ["happy", "excited", "energized"]):
        return "high"
    return "neutral"
