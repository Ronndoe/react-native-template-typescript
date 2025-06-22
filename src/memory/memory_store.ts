// File: src/memory/memory_store.ts
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'syntheos.db' });

export async function saveMemory(entry: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const json = JSON.stringify(entry);

        db.transaction((tx: any) => {
            tx.executeSql(
                'INSERT INTO memories (type, timestamp, json) VALUES (?, ?, ?)',
                [entry.type, entry.timestamp || new Date().toISOString(), json],
                (_: any, result: any) => resolve(result),
                (_: any, error: any) => reject(error)
            );
        });
    });
}
