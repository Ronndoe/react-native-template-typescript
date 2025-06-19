import sqlite3 from 'sqlite3';
import path from 'path';
import { MemoryEntry } from './types';

const dbPath = path.resolve(__dirname, '../../../memory.db');
const db = new sqlite3.Database(dbPath);

export async function wipeAndReinitializeDB() {
    return new Promise<void>((resolve, reject) => {
        db.serialize(() => {
            db.run('DROP TABLE IF EXISTS memories');
            db.run(`
        CREATE TABLE IF NOT EXISTS memories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        content TEXT,
        timestamp TEXT
        );
    `, (err) => {
        if (err) return reject(err);
        console.log('✅ Memory database wiped and reinitialized.');
        resolve();
            });
        });
    });
}
