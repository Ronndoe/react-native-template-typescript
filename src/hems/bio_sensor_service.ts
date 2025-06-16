// Receives real-time vitals from wearable device (mocked)
export interface BioReading {
    heartRate: number;
    movement: number;
    sleepQuality: number;
    timestamp: string;
}

export function receiveVitals(data: BioReading) {
    console.log("Received vitals:", data);
}
