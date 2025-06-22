// File: src/components/VoiceAssistantButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { callLLM } from "ai/llm_engine";
import { buildPersonalityPrompt } from "ai/personality_context";
import * as Speech from "expo-speech"; // or any TTS you prefer

const VoiceAssistantButton = () => {
const handleVoice = async () => {
    const prompt = await buildPersonalityPrompt(
    "Give me a quick health update."
    );
    const reply = await callLLM({ prompt, engine: "gemini" });
    Speech.speak(reply);
};

return (
    <TouchableOpacity style={styles.button} onPress={handleVoice}>
    <Text style={styles.text}>🎙️ Ask Syntheos</Text>
    </TouchableOpacity>
);
};

const styles = StyleSheet.create({
button: {
    backgroundColor: "#00FFAA",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
},
text: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
},
});

export default VoiceAssistantButton;
