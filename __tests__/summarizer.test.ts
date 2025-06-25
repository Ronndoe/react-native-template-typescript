// __tests__/summarizer.test.ts
import { summarizeMemories } from 'ai/summarizer';
import { MemoryEntry } from 'memory/types';

jest.mock('memory/memory_store', () => ({
    saveMemory: jest.fn(),
}));

jest.mock('ai/llm_engine', () => ({
    callLLM: jest.fn(() => Promise.resolve('summary: average heart rate is 70, sleep is 8 hrs')),
}));

const mockMemories: MemoryEntry[] = [
    {
        id: 1,
        type: 'vitals',
        timestamp: new Date().toISOString(),
        content: { heartRate: 72, sleepQuality: 8.5 },
    },
    {
        id: 2,
        type: 'vitals',
        timestamp: new Date().toISOString(),
        content: { heartRate: 68, sleepQuality: 7.5 },
    },
];

test('summarizeMemories returns a summary string', async () => {
    const summary = await summarizeMemories(mockMemories, 'vitals');
    expect(typeof summary).toBe('string');
    expect(summary.length).toBeGreaterThan(0);
    expect(summary).toMatch(/summary/i);
});