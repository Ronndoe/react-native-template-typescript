// Syncs context across devices
let contextCache: any = {};

export function updateContext(deviceId: string, data: any) {
    contextCache[deviceId] = data;
}

export function getContext(deviceId: string) {
    return contextCache[deviceId] || {};
}
