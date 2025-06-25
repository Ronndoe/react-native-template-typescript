// File: src/core/retry.ts
import {
    processRetryQueue,
    monitorNetworkAndRetrySync,
    bootRetryOnStart
} from 'memory/retry_queue';

import { MemoryData } from 'memory/types';

async function uploadToCloud(data: MemoryData): Promise<void> {
    let endpoint = '';

    switch (data.type) {
        case 'activity':
            endpoint = 'https://your.api/activity';
            break;
        case 'sleep':
            endpoint = 'https://your.api/sleep';
            break;
        case 'anomaly':
            endpoint = 'https://your.api/anomaly';
            break;
        default:
            throw new Error(`Unsupported data type: ${(data as any).type}`);
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Upload failed for ${data.type}`);
    }
}

// Call this on app start
export function initRetrySync() {
    bootRetryOnStart(() => processRetryQueue(uploadToCloud));
    monitorNetworkAndRetrySync(() => processRetryQueue(uploadToCloud));
}
