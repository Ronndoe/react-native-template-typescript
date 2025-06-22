// File: src/screens/HealthReportScreen.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Button, StyleSheet } from 'react-native';
import { getHealthReport } from '../hems/health_reporter';
import { getAllMemories } from 'memory/sqlite';
import { MemoryEntry, VitalsMemoryEntry } from 'types/memory';
import { callLLM } from 'ai/llm_engine';
import { buildPersonalityPrompt } from 'ai/personality_context';

const HealthReportScreen = () => {
const [structuredReport, setStructuredReport] = useState<any>(null);
const [summary, setSummary] = useState<string>('Loading vitals...');
const [aiSummary, setAiSummary] = useState<string>('Fetching insights...');

const loadSummary = async () => {
const all: MemoryEntry[] = await getAllMemories();
const vitals = all.filter((e): e is VitalsMemoryEntry => e.type === 'vitals');

const lines = vitals.slice(-5).map(v => {
    const { heartRate, sleepQuality } = v.content;
    return `❤️ ${heartRate} bpm, 🛌 ${sleepQuality.toFixed(1)} sleep, at ${v.timestamp}`;
});

setSummary(lines.join('\n'));
};

const loadStructured = () => {
    const rep = getHealthReport();
    setStructuredReport(rep);
};

const loadAISummary = async () => {
    const prompt = await buildPersonalityPrompt("Give a friendly summary of recent vitals.");
    const result = await callLLM({ prompt, engine: 'gemini' });
    setAiSummary(result);
};

useEffect(() => {
    loadSummary();
    loadStructured();
    loadAISummary();
}, []);

return (
    <ScrollView style={styles.container}>
    <Text style={styles.title}>📊 SYNTHEOS Health Summary</Text>

    <Text style={styles.label}>🤖 AI Insight:</Text>
    <Text style={styles.ai}>{aiSummary}</Text>

    <Text style={styles.label}>📝 Raw Vitals Log:</Text>
    <Text style={styles.block}>{summary}</Text>

    <View style={{ marginTop: 20 }}>
        <Text style={styles.subtitle}>🧠 Activity:</Text>
        {structuredReport?.activity?.map((entry: any, i: number) => (
        <Text key={i} style={styles.line}>
            • {entry.steps} steps in {entry.duration} mins
        </Text>
        ))}

        <Text style={styles.subtitle}>🛌 Sleep:</Text>
        {structuredReport?.sleep?.map((entry: any, i: number) => (
        <Text key={i} style={styles.line}>
            • {entry.duration} hrs (Quality: {entry.quality.toFixed(2)})
        </Text>
        ))}

        <Button
        title="🔄 Refresh Report"
        onPress={() => {
            loadSummary();
            loadStructured();
            loadAISummary();
        }}
        />
    </View>
    </ScrollView>
);
};

const styles = StyleSheet.create({
container: { padding: 20, backgroundColor: '#000', flex: 1 },
title: { fontSize: 22, color: '#00FFAA', marginBottom: 10 },
subtitle: { fontSize: 18, color: '#00FFAA', marginTop: 16 },
label: { color: '#00FFAA', marginTop: 12, fontSize: 16 },
block: { color: '#eee', fontSize: 15, lineHeight: 24, marginBottom: 10 },
ai: { color: '#ccc', fontSize: 16, fontStyle: 'italic', marginBottom: 8 },
line: { color: '#ccc', fontSize: 14, marginVertical: 2 },
});

export default HealthReportScreen;
