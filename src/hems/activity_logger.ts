// Logs steps, movement, and exercise durations
let activityLog: any[] = [];

export function logActivity(steps: number, duration: number) {
    activityLog.push({ timestamp: new Date().toISOString(), steps, duration });
    console.log("Activity logged:", { steps, duration });
}

export function getActivityLog() {
    return activityLog;
}
