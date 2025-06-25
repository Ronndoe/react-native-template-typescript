// File: src/memory/retry_queue.ts

import * as NetInfo from '@react-native-community/netinfo';
import CryptoJS from 'crypto-js';
import SQLite from 'react-native-sqlite-storage';
import { MemoryData } from './types';

const ENCRYPTION_KEY = 'syntheos-local-key';
const db = SQLite.openDatabase({ name: 'SyntheosMemory.db' });

type SQLiteTransaction = {
    executeSql: (
        sqlStatement: string,
        args?: any[],
        callback?: (tx: any, resultSet: any) => void,
        errorCallback?: (tx: any, error: any) => void
    ) => void;
};

// 🔧 Create retry_queue table on startup
db.transaction((tx: SQLiteTransaction) => {
    tx.executeSql(`
    CREATE TABLE IF NOT EXISTS retry_queue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT
    )
`);
});

// 💾 Save memory batch (encrypted)
export async function saveToRetryQueue(data: MemoryData[]) {
    const payload = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(payload, ENCRYPTION_KEY).toString();

    return new Promise((resolve, reject) => {
        db.transaction((tx: SQLiteTransaction) => {
            tx.executeSql(
                'INSERT INTO retry_queue (data) VALUES (?)',
                [encrypted],
                (_: any, result: any) => resolve(result),
                (_: any, error: any) => reject(error)
            );
        });
    });
}

// 📤 Load all memory batches from queue
export async function getRetryQueue(): Promise<(MemoryData & { id: number })[]> {
    return new Promise((resolve, reject) => {
        db.transaction((tx: SQLiteTransaction) => {
            tx.executeSql(
                'SELECT * FROM retry_queue',
                [],
                (_: any, { rows }: any) => {
                    const results: (MemoryData & { id: number })[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        const row = rows.item(i);
                        try {
                            const decrypted = CryptoJS.AES.decrypt(row.data, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
                            const parsedData: MemoryData[] = JSON.parse(decrypted);
                            parsedData.forEach(item => {
                                results.push({ ...item, id: row.id });
                            });
                        } catch (e) {
                            console.warn('Failed to decrypt retry_queue item:', e);
                        }
                    }
                    resolve(results);
                },
                (_: any, error: any) => reject(error)
            );
        });
    });
}

// ❌ Remove synced item from queue
export async function removeFromRetryQueue(id: number) {
    return new Promise((resolve, reject) => {
        db.transaction((tx: SQLiteTransaction) => {
            tx.executeSql(
                'DELETE FROM retry_queue WHERE id = ?',
                [id],
                (_: any, result: any) => resolve(result),
                (_: any, error: any) => reject(error)
            );
        });
    });
}

// 🔁 Retry processing for each memory item using a given upload function
export async function processRetryQueue(uploadFn: (data: MemoryData) => Promise<void>) {
    const queue = await getRetryQueue();
    for (const item of queue) {
        try {
            await uploadFn(item);
            await removeFromRetryQueue(item.id);
            console.log(`✅ Synced & removed memory item ID ${item.id}`);
        } catch (error) {
            console.warn(`⚠️ Retry failed for ID ${item.id}:`, error);
        }
    }
}

// 📶 React to network reconnect
export function monitorNetworkAndRetrySync(retryFn: () => void) {
    NetInfo.addEventListener((state) => {
        if (state.isConnected && state.isInternetReachable) {
            retryFn();
        }
    });
}

// 🚀 Run retry on app start
export async function bootRetryOnStart(retryFn: () => void) {
    const state = await NetInfo.fetch();
    if (state.isConnected && state.isInternetReachable) {
        retryFn();
    }
}