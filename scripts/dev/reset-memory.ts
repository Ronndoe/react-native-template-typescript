import { wipeAndReinitializeDB } from '../../src/memory/sqlite-node';

(async () => {
    try {
        // await resetMemory(); // optional, only if wipe doesn't already clear
        await wipeAndReinitializeDB();
        console.log('✅ SQLite memory wiped and reinitialized.');
    } catch (err) {
        console.error('❌ Failed to reset memory:', err);
    }
})();
