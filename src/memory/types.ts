// src/memory/types.ts (or directly in personality.ts for now)
export type ActivityContent = {
    steps: number;
    duration?: number;
};

export type MemoryEntry = {
    id: number;
    type: 'activity' | 'sleep' | 'anomaly' | string;
    content: ActivityContent;
    timestamp: string;
};
