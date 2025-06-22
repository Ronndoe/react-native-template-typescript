// src/ui/VoiceButton.tsx
import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { useVoiceCommand } from "../voice/voice_command_handler";

export default function VoiceButton() {
const { startListening } = useVoiceCommand();

return (
    <TouchableOpacity style={styles.button} onPress={startListening}>
    <Text style={styles.text}>🎤</Text>
    </TouchableOpacity>
);
}

const styles = StyleSheet.create({
button: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 100,
    position: "absolute",
    bottom: 40,
    right: 20,
    elevation: 5,
},
text: {
    fontSize: 24,
    color: "#00FFAA",
},
});
