// File: SYNTHEOSCore/__tests__/summarizer.test.ts
import { summarizeMemories } from '../src/ai/summarizer';

const mockMemories = [
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
        content: { heartRate: 68, sleepQuality: 7.8 },
    },
];


test('summarizeMemories returns a summary string', async () => {
    const summary = await summarizeMemories(mockMemories, 'vitals');
    expect(typeof summary).toBe('string');
    expect(summary.length).toBeGreaterThan(0);
});
