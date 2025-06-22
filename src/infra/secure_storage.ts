// File: src/infra/secure_storage.ts
import CryptoJS from 'crypto-js';

export async function encryptMemoryEntry(entry: any) {
    const json = JSON.stringify(entry);
    const digest = CryptoJS.SHA256(json).toString();
    return { ...entry, secureHash: digest };
}
