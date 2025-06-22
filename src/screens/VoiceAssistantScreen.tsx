import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { callLLM } from 'ai/llm_engine';
import { buildPersonalityPrompt } from 'ai/personality_context';

const VoiceAssistantScreen = () => {
const [response, setResponse] = useState('Ask me something...');
const [loading, setLoading] = useState(false);

const triggerGemini = async () => {
    setLoading(true);
    const prompt = await buildPersonalityPrompt('How am I doing today?');
    const res = await callLLM({ prompt, engine: 'gemini' });
    setResponse(res);
    setLoading(false);
};

return (
    <View style={styles.container}>
    <Text style={styles.header}>🎙️ Syntheos Assistant</Text>
    <Button title="Ask Gemini" onPress={triggerGemini} disabled={loading} />
    <Text style={styles.output}>{loading ? 'Thinking...' : response}</Text>
    </View>
);
};

const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: '#000', padding: 20 },
header: { fontSize: 22, color: '#00FFAA', marginBottom: 12 },
output: { color: '#eee', fontSize: 16, marginTop: 20, lineHeight: 24 },
});

export default VoiceAssistantScreen;
