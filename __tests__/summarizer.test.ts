import { summarizeMemory } from '../src/ai/summarizer';

test('summarizeMemory returns summary string', async () => {
    const summary = await summarizeMemory();
    expect(typeof summary).toBe('string');
});