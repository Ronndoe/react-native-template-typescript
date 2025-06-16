// Tracks sleep cycles and disturbances
let sleepLog: any[] = [];

export function logSleep(quality: number, duration: number) {
    sleepLog.push({ timestamp: new Date().toISOString(), quality, duration });
    console.log("Sleep logged:", { quality, duration });
}

export function getSleepLog() {
    return sleepLog;
}
