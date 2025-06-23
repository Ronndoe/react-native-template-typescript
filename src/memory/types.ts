// src/memory/types.ts (or directly in personality.ts for now)
export type ActivityContent = {
    steps: number;
    duration?: number;
};

export type VitalsContent = {
    heartRate: number;
    sleepQuality: number;
};

export type MemoryEntry = {
    id: number;
    type: 'activity' | 'sleep' | 'anomaly' | 'vitals' | string;
    content: Record<string, any>;
    timestamp: string;
};
