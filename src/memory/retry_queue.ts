// File: src/memory/retry_queue.ts
import SQLite from 'react-native-sqlite-storage';
import CryptoJS from 'crypto-js';
import * as NetInfo from '@react-native-community/netinfo';

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

db.transaction((tx: SQLiteTransaction) => {
tx.executeSql(
    `CREATE TABLE IF NOT EXISTS retry_queue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT
    )`
);
});

export async function saveToRetryQueue(data: any[]) {
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

export async function getRetryQueue(): Promise<{ id: number; data: any[] }[]> {
return new Promise((resolve, reject) => {
    db.transaction((tx: SQLiteTransaction) => {
    tx.executeSql(
        'SELECT * FROM retry_queue',
        [],
        (_: any, { rows }: any) => {
        const results: { id: number; data: any[] }[] = [];
        for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            try {
            const decrypted = CryptoJS.AES.decrypt(row.data, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
            results.push({ id: row.id, data: JSON.parse(decrypted) });
            } catch (e) {
            console.warn('Failed to decrypt queue item:', e);
            }
        }
        resolve(results);
        },
        (_: any, error: any) => reject(error)
    );
    });
});
}

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

export function monitorNetworkAndRetrySync(retryFn: () => void) {
NetInfo.addEventListener((state) => {
    if (state.isConnected && state.isInternetReachable) {
    retryFn();
    }
});
}

export async function bootRetryOnStart(retryFn: () => void) {
const state = await NetInfo.fetch();
if (state.isConnected && state.isInternetReachable) {
    retryFn();
}
}
