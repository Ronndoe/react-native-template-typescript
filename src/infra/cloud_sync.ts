// File: src/memory/cloud_sync.ts
import axios from 'axios';
import { saveToRetryQueue, getRetryQueue, removeFromRetryQueue } from '../memory/retry_queue';

const CLOUD_ENDPOINT = 'https://api.syntheos.ai/memory/upload';

export async function syncMemoryToCloud(memoryEntries: any[]) {
    try {
        console.log('Syncing to cloud...', memoryEntries.length);
        const response = await axios.post(CLOUD_ENDPOINT, { payload: memoryEntries });

        return {
            status: 'success',
            response: response.data,
        };
    } catch (error) {
        console.warn('Cloud sync failed, saving to retry queue...', error);
        await saveToRetryQueue(memoryEntries);
        return {
            status: 'error',
            error,
        };
    }
}

export async function retryFailedSyncs() {
    const failedBatches = await getRetryQueue();

    for (const batch of failedBatches) {
        try {
            await axios.post(CLOUD_ENDPOINT, { payload: batch.data });
            await removeFromRetryQueue(batch.id);
        } catch (err) {
            console.log('Retry failed for batch', batch.id);
        }
    }
}
