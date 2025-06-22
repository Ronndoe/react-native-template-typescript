import { initMemory, queryMemory, summarizeMemory } from 'memory';
import { triggerVoiceCommand } from 'ui/VoiceButton';
import { uploadToCloud } from 'infra/cloud_sync';

test('E2E flow: Memory > Summarize > Voice > Cloud', async () => {
    await initMemory();

    await triggerVoiceCommand('log 10,000 steps');
    const results = await queryMemory({ type: 'activity' });
    expect(results.length).toBeGreaterThan(0);

    const summary = await summarizeMemory();
    expect(summary).toMatch(/summary/i);

    const uploaded = await uploadToCloud(summary);
    expect(uploaded.status).toBe('success');
});
