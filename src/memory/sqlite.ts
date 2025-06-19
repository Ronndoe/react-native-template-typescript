// import { AnimatedStyle } from 'react-native-reanimated';
import SQLite from 'react-native-sqlite-storage';
import { MemoryEntry } from 'memory/types';


SQLite.enablePromise(true);

let db: any;

export async function getDB() {
    if (!db) {
        db = await SQLite.openDatabase({ name: 'memory.db' });
    }
    return db;
}

export async function setupMemoryTable() {
    const db = await getDB();
    await db.executeSql(`
    CREATE TABLE IF NOT EXISTS memories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    content TEXT,
    timestamp TEXT
    );
`);
}

export async function persistMemory(entry: any) {
    const db = await getDB();
    await db.executeSql(
        'INSERT INTO memories (type, content, timestamp) VALUES (?, ?, ?);',
        [entry.type, JSON.stringify(entry), entry.timestamp]
    );
}

export async function getAllMemories(): Promise<MemoryEntry[]> {
    const db = await getDB();
    const [results] = await db.executeSql('SELECT * FROM memories ORDER BY id DESC;');
    return results.rows.raw() as MemoryEntry[];
}

export async function wipeAndReinitializeDB() {
    const db = await getDB();
    await db.executeSql('DROP TABLE IF EXISTS memories');
    await setupMemoryTable();
    console.log('✅ Memory database wiped and reinitialized.');
}

export async function openDatabase() {
    if (!db) {
        db = await SQLite.openDatabase({ name: 'memory.db', location: 'default' });
    }
    return db;
}

export async function resetMemory() {
    const db = await openDatabase();
    await db.executeSql('DELETE FROM memory');
    console.log('✅ Memory table has been cleared.');
}
