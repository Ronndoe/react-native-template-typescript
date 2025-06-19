import { receiveVitals } from './bio_sensor_service';
import { useEffect } from 'react';
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
            };

            receiveVitals(fakeVitals);

            // Save bio data to memory
            saveMemory({ type: 'vitals', ...fakeVitals });

            // Simulate activity event
            const fakeActivity = {
                steps: Math.floor(Math.random() * 200),
                duration: Math.floor(Math.random() * 30),
                timestamp: new Date().toISOString(),
            };

            saveMemory({ type: 'activity', ...fakeActivity });
        }, 10000);

        return () => clearInterval(interval);
    }, []);
}
