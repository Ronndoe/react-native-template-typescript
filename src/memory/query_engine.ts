// Traverse stored memory entries and extract relevant past events.

// File: src/memory/query_engine.ts
import { openDatabase } from 'react-native-sqlite-storage';
import { MemoryEntry } from './types';

const db = openDatabase({ name: 'syntheos.db' });

export const getMemoriesByType = (type: string): Promise<MemoryEntry[]> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM memories WHERE type = ? ORDER BY timestamp DESC',
                [type],
                (_, { rows }) => resolve(rows._array),
                (_, err) => reject(err)
            );
        });
    });
};

export const getRecentMemories = (count: number): Promise<MemoryEntry[]> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM memories ORDER BY timestamp DESC LIMIT ?',
                [count],
                (_, { rows }) => resolve(rows._array),
                (_, err) => reject(err)
            );
        });
    });
};

export const getMemoriesInRange = (start: string, end: string): Promise<MemoryEntry[]> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM memories WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp ASC',
                [start, end],
                (_, { rows }) => resolve(rows._array),
                (_, err) => reject(err)
            );
        });
    });
};

export const searchMemories = (keyword: string): Promise<MemoryEntry[]> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM memories WHERE json LIKE ? ORDER BY timestamp DESC',
                [`%${keyword}%`],
                (_, { rows }) => resolve(rows._array),
                (_, err) => reject(err)
            );
        });
    });
};

// --- End query_engine.ts ---
