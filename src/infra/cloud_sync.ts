// File: src/infra/cloud_sync.ts
import axios from 'axios';
import { getRetryQueue, removeFromRetryQueue, saveToRetryQueue } from '../memory/retry_queue';
import { MemoryData } from '../memory/types';

const CLOUD_ENDPOINT = 'https://api.syntheos.ai/memory/upload';

export async function syncMemoryToCloud(memoryEntries: MemoryData[]) {
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

// Batch retry of saved failures
export async function retryFailedSyncs() {
    const failedBatches = await getRetryQueue();

    for (const item of failedBatches) {
        try {
            await axios.post(CLOUD_ENDPOINT, { payload: [item] });
            await removeFromRetryQueue(item.id);
        } catch (err) {
            console.log('Retry failed for memory item', item.id);
        }
    }
}
