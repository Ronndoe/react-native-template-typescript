// src/ai/summarizer.ts
import { callLLM } from './llm_engine';
import { saveMemory } from 'memory/memory_store';
import { MemoryEntry } from 'memory/types';

export async function summarizeMemories(memories: MemoryEntry[], type?: string) {
    if (!memories.length) return '';

    const content = memories.map(m => `• ${m.timestamp}: ${JSON.stringify(m.content)}`).join('\n');

    const prompt = `Summarize the following ${type || 'user'} data:\n${content}`;

    const summary = await callLLM({ prompt, engine: 'gpt' });

    await saveMemory({
        type: 'summary',
        content: summary,
        timestamp: new Date().toISOString(),
        source: 'ai',
    });

    return summary;
}