import { receiveVitals } from './bio_sensor_service';
import { saveMemory } from 'memory/MemoryProvider';

export function streamBLEVitals(vital: any) {
    receiveVitals(vital);
    saveMemory({ type: 'vitals', ...vital, source: 'sensor' });
}
