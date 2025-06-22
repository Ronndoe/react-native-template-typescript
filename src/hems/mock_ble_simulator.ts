// File: src/hems/mock_ble_simulator.ts
// auto-streams synthetic vitals + activity data every 10s.
import { useEffect } from 'react';
import { receiveVitals } from './bio_sensor_service';
import { useMemory } from 'memory/MemoryProvider';

export function useMockBLESimulator() {
    const { saveMemory } = useMemory();

    useEffect(() => {
        const interval = setInterval(() => {
            const fakeVitals = {
                heartRate: Math.floor(Math.random() * 80) + 40,
                movement: Math.floor(Math.random() * 100),
                sleepQuality: Math.random() * 5,
                timestamp: new Date().toISOString(),
                source: 'sensor',
            };

            receiveVitals(fakeVitals);
            saveMemory({ type: 'vitals', ...fakeVitals });

            const fakeActivity = {
                steps: Math.floor(Math.random() * 200),
                duration: Math.floor(Math.random() * 30),
                timestamp: new Date().toISOString(),
                source: 'sensor',
            };

            saveMemory({ type: 'activity', ...fakeActivity });
        }, 10000);

        return () => clearInterval(interval);
    }, []);
}
