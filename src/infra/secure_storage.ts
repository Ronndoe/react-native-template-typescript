import * as Crypto from 'expo-crypto';

export async function encryptMemoryEntry(entry: any) {
    const json = JSON.stringify(entry);
    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        json
    );
    return { ...entry, secureHash: digest };
}
