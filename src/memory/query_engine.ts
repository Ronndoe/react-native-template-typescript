// Traverse stored memory entries and extract relevant past events.
// File: src/memory/query_engine.ts

import { openDatabase } from 'react-native-sqlite-storage';
import { MemoryEntry } from './types';

const db = openDatabase({ name: 'syntheos.db' });

type SQLiteTransaction = {
executeSql: (
    sqlStatement: string,
    args?: any[],
    callback?: (tx: any, resultSet: { rows: { _array: MemoryEntry[] } }) => void,
    errorCallback?: (tx: any, error: any) => void
) => void;
};

export const getMemoriesByType = (type: string): Promise<MemoryEntry[]> => {
return new Promise((resolve, reject) => {
    db.transaction((tx: SQLiteTransaction) => {
    tx.executeSql(
        'SELECT * FROM memories WHERE type = ? ORDER BY timestamp DESC',
        [type],
        (_: any, { rows }: { rows: { _array: MemoryEntry[] } }) => resolve(rows._array),
        (_: any, err: any) => reject(err)
    );
    });
});
};

export const getRecentMemories = (count: number): Promise<MemoryEntry[]> => {
return new Promise((resolve, reject) => {
    db.transaction((tx: SQLiteTransaction) => {
    tx.executeSql(
        'SELECT * FROM memories ORDER BY timestamp DESC LIMIT ?',
        [count],
        (_: any, { rows }: { rows: { _array: MemoryEntry[] } }) => resolve(rows._array),
        (_: any, err: any) => reject(err)
    );
    });
});
};

export const getMemoriesInRange = (start: string, end: string): Promise<MemoryEntry[]> => {
return new Promise((resolve, reject) => {
    db.transaction((tx: SQLiteTransaction) => {
    tx.executeSql(
        'SELECT * FROM memories WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp ASC',
        [start, end],
        (_: any, { rows }: { rows: { _array: MemoryEntry[] } }) => resolve(rows._array),
        (_: any, err: any) => reject(err)
    );
    });
});
};

export const searchMemories = (keyword: string): Promise<MemoryEntry[]> => {
return new Promise((resolve, reject) => {
    db.transaction((tx: SQLiteTransaction) => {
    tx.executeSql(
        'SELECT * FROM memories WHERE json LIKE ? ORDER BY timestamp DESC',
        [`%${keyword}%`],
        (_: any, { rows }: { rows: { _array: MemoryEntry[] } }) => resolve(rows._array),
        (_: any, err: any) => reject(err)
    );
    });
});
};

// --- End query_engine.ts ---
