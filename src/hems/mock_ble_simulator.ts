// Simulates BLE ring sending bio data every 10s
import { receiveVitals } from "./bio_sensor_service";

setInterval(() => {
    const fakeVitals = {
        heartRate: Math.floor(Math.random() * 80) + 40,
        movement: Math.floor(Math.random() * 100),
        sleepQuality: Math.random() * 5,
        timestamp: new Date().toISOString()
    };
    receiveVitals(fakeVitals);
}, 10000);
