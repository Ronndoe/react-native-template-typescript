// src/types/memory.ts

export interface BaseMemoryEntry {
id: string | number; // Accepts both string and number
timestamp: string;
type: 'vitals' | 'activity' | string;
content: any;
source?: 'sensor' | 'ai' | string;
}

// Strongly typed vitals content
export interface VitalsContent {
heartRate: number;
sleepQuality: number;
}

// Strongly typed activity content
export interface ActivityContent {
steps: number;
duration: number;
}

// Specialized entries
export interface VitalsMemoryEntry extends BaseMemoryEntry {
type: 'vitals';
content: VitalsContent;
}

export interface ActivityMemoryEntry extends BaseMemoryEntry {
type: 'activity';
content: ActivityContent;
}

export type MemoryEntry = VitalsMemoryEntry | ActivityMemoryEntry | BaseMemoryEntry;
