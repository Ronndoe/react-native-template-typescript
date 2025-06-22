// File: src/hems/ble_streamer.ts
import { receiveVitals } from './bio_sensor_service';
import { memoryEngine } from 'memory/memoryStore';
import { saveMemory } from 'memory/memory_store';

export function streamBLEVitals(vital: any) {
    receiveVitals(vital);

    const timestamp = new Date().toISOString();

    // Add to in-memory store
    memoryEngine.add({
        id: crypto.randomUUID(),
        type: 'vitals',
        payload: vital,
    });

    // Save to persistent SQLite with explicit timestamp and source
    saveMemory({
        ...vital,        // spread vital first
        type: 'vitals',
        timestamp,       // this will override vital.timestamp if it exists
        source: 'sensor',
    });
}
