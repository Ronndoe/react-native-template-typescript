// File: src/memory/types.ts

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
    type: 'activity' | 'sleep' | 'anomaly' | 'vitals' | 'summary';
    content: Record<string, any>;
    timestamp: string;
};

export interface ActivityData {
    type: 'activity';
    steps: number;
    timestamp: number;
}

export interface SleepData {
    type: 'sleep';
    durationMinutes: number;
    quality: 'poor' | 'fair' | 'good';
    timestamp: number;
}

export interface AnomalyData {
    type: 'anomaly';
    code: string;
    message: string;
    detectedAt: number;
}

export interface SummaryData {
    type: 'summary';
    content: string;
    timestamp: string;
}

export type MemoryData = ActivityData | SleepData | AnomalyData | SummaryData;
