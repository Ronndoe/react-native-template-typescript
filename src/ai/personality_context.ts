// File: src/ai/personality_context.ts
import { getAllMemories } from 'memory/sqlite';

const personality = {
    name: 'Syntheos',
    tone: 'calm and encouraging',
    focus: 'wellness, learning, performance, memory',
};

function getSystemPrompt(): string {
    return `
You are ${personality.name}, an AI with a ${personality.tone} tone.
Always speak like a coach focused on ${personality.focus}.
`;
}

export async function buildPersonalityPrompt(userInput: string): Promise<string> {
    const memories = await getAllMemories();
    const recentVitals = memories.filter(m => m.type === 'vitals').slice(-3);
    const summaryLines = recentVitals.map(v => {
    const content = v.content as { heartRate?: number; sleepQuality?: number };
    const hr = content.heartRate ?? '–';
    const sleep = content.sleepQuality?.toFixed?.(1) ?? '–';
    return `• HR: ${hr} bpm, Sleep: ${sleep} at ${v.timestamp}`;
});

    const context = `Recent user vitals:\n${summaryLines.join('\n')}`;

    return `${getSystemPrompt()}
${context}`;
}
