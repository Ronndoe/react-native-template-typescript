import { getMemoriesByType } from '../../src/memory/query_engine';
import { summarizeMemories } from '../../src/ai/summarizer';
import { handleVoiceCommand } from '../../src/ui/voice_assistant';
import { syncMemoryToCloud } from '../../src/infra/cloud_sync';

const initMemory = async () => {}; // stubbed init

test('E2E flow: Memory > Summarize > Voice > Cloud', async () => {
    await initMemory();

    await handleVoiceCommand('log 10,000 steps');
    const results = await getMemoriesByType('activity');
    expect(results.length).toBeGreaterThan(0);

    const summary = await summarizeMemories(results, 'activity');
    expect(summary).toMatch(/summary/i);

    const uploaded = await syncMemoryToCloud([{ type: 'summary', content: summary, timestamp: new Date().toISOString() }]);
    expect(uploaded.status).toBe('success');
});
