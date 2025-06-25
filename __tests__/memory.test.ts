// File: SYNTHEOSCore/__tests__/memory.test.ts

import { getRetryQueue, saveToRetryQueue } from 'memory/retry_queue';
import { ActivityData } from 'memory/types';

describe('Cloud Sync Retry Queue', () => {
    it('queues failed activity uploads', async () => {
        const mockData: ActivityData[] = [
            {
                type: 'activity',
                steps: 100,
                timestamp: Date.now(),
            },
        ];

        await saveToRetryQueue(mockData);

        const queue = await getRetryQueue();

        const item = queue.find(q => q.type === 'activity') as ActivityData | undefined;

        expect(item).toBeDefined();
        expect(item!.steps).toBe(100);
        expect(typeof item!.timestamp).toBe('number');
    });
});
