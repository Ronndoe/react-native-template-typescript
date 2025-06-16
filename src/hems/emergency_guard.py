# Only discloses data during a verified emergency

import json

def authorize_emergency_release(trigger_type, vital_data):
    if trigger_type in ["bradycardia", "tachycardia", "no_response"]:
        return json.dumps({
            "authorized": True,
            "reason": trigger_type,
            "payload": vital_data
        })
    return json.dumps({ "authorized": False })
