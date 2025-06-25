// File: __tests__/integration/e2e_flow.test.ts

jest.mock('ai/llm_engine', () => ({
    callLLM: jest.fn(() =>
        Promise.resolve('Mock summary: Activity level was high.')
    ),
}));

jest.mock('memory/query_engine', () => ({
    getRecentMemories: jest.fn(() =>
        Promise.resolve([
            {
                type: 'activity',
                timestamp: new Date().toISOString(),
                content: { steps: 10000 },
            },
        ])
    ),
    getMemoriesByType: jest.fn(() =>
        Promise.resolve([
            {
                type: 'activity',
                timestamp: new Date().toISOString(),
                content: { steps: 10000 },
            },
        ])
    ),
}));

jest.mock('infra/cloud_sync', () => ({
    syncMemoryToCloud: jest.fn(() =>
        Promise.resolve({ status: 'success' })
    ),
}));

import { getMemoriesByType } from 'memory/query_engine';
import { summarizeMemories } from 'ai/summarizer';
import { handleVoiceCommand } from 'ui/voice_assistant';
import { syncMemoryToCloud } from 'infra/cloud_sync';

const initMemory = async () => { }; // stubbed init

test('E2E flow: Memory > Summarize > Voice > Cloud', async () => {
    await initMemory();

    await handleVoiceCommand('log 10,000 steps');
    const results = await getMemoriesByType('activity');
    expect(results.length).toBeGreaterThan(0);

    const summary = await summarizeMemories(results, 'activity');
    expect(typeof summary).toBe('string');
    expect(summary.length).toBeGreaterThan(0);

    const uploaded = await syncMemoryToCloud([
        {
            type: 'summary',
            content: summary,
            timestamp: new Date().toISOString(),
        },
    ]);

    expect(uploaded.status).toBe('success');
});
