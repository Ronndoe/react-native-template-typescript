import sqlite3
import time

def log_interaction(user_id, tone):
    conn = sqlite3.connect("persona_memory.db")
    c = conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS tone_memory (user_id TEXT, tone TEXT, timestamp REAL)")
    c.execute("INSERT INTO tone_memory VALUES (?, ?, ?)", (user_id, tone, time.time()))
    conn.commit()
    conn.close()

def get_recent_tone(user_id):
    conn = sqlite3.connect("persona_memory.db")
    c = conn.cursor()
    c.execute("SELECT tone, timestamp FROM tone_memory WHERE user_id=? ORDER BY timestamp DESC LIMIT 5", (user_id,))
    tones = c.fetchall()
    conn.close()
    return tones
