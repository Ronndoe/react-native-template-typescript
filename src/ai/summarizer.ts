// Let GPT-4o or Gemini summarize recent memory states and generate insights.
// File: src/ai/summarizer.ts
import { callLLM } from './llm_engine';
import { saveMemory } from 'memory/MemoryProvider';
import { MemoryEntry } from 'memory/types';

export async function summarizeMemories(memories: MemoryEntry[], type?: string) {
    const content = memories.map(m => `• ${m.timestamp}: ${JSON.stringify(m)}`).join('\n');

    const prompt = `Summarize the following ${type || 'user'} data:
${content}`;

    const summary = await callLLM({ prompt, engine: 'gpt' });

    await saveMemory({
        type: 'summary',
        content: summary,
        timestamp: new Date().toISOString(),
        source: 'ai'
    });

    return summary;
}

// --- End summarizer.ts ---