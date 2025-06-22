// File: src/screens/HealthReportScreen.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Button, StyleSheet } from 'react-native';
import { getHealthReport } from '../hems/health_reporter';
import { getAllMemories } from 'memory/sqlite';

const HealthReportScreen = () => {
const [structuredReport, setStructuredReport] = useState<any>(null);
const [summary, setSummary] = useState<string>('Loading...');

const loadSummary = async () => {
    const all = await getAllMemories();
    const vitals = all.filter(e => e.type === 'vitals').slice(-5);
    const lines = vitals.map(
    v => `❤️ ${v.heartRate} bpm, 🛌 ${v.sleepQuality?.toFixed(1)} sleep, at ${v.timestamp}`
    );
    setSummary(lines.join('\n'));
};

const loadStructured = () => {
    const rep = getHealthReport();
    setStructuredReport(rep);
};

useEffect(() => {
    loadSummary();
    loadStructured();
}, []);

return (
    <ScrollView style={styles.container}>
    <Text style={styles.title}>📊 SYNTHEOS Health Summary</Text>
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

        <Button title="🔄 Refresh Report" onPress={() => {
        loadSummary();
        loadStructured();
        }} />
    </View>
    </ScrollView>
);
};

const styles = StyleSheet.create({
container: { padding: 20, backgroundColor: '#000', flex: 1 },
title: { fontSize: 22, color: '#00FFAA', marginBottom: 10 },
subtitle: { fontSize: 18, color: '#00FFAA', marginTop: 16 },
block: { color: '#eee', fontSize: 16, lineHeight: 24 },
line: { color: '#ccc', fontSize: 14, marginVertical: 2 },
});

export default HealthReportScreen;
