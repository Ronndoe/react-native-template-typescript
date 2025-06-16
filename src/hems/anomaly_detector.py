# Detects anomalies like high/low heart rate

def detect_anomaly(heart_rate):
    if heart_rate < 40:
        return "bradycardia"
    elif heart_rate > 120:
        return "tachycardia"
    return "normal"
