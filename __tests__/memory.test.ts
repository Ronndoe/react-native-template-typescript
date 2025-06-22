// File: src/__tests__/memory.test.ts
// Tests cloud sync fallback queue using saveToRetryQueue() and getRetryQueue().
import { uploadToCloud } from 'infra/cloud_sync';
import { saveToRetryQueue, getRetryQueue } from 'memory/retry_queue';

describe('Cloud Sync', () => {
    it('queues failed uploads', async () => {
        const mockData = [{ type: 'activity', steps: 100, timestamp: Date.now() }];
        await saveToRetryQueue(mockData);
        const queue = await getRetryQueue();
        expect(queue.length).toBeGreaterThan(0);
    });
});