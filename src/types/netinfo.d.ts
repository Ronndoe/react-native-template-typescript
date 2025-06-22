// src/types/netinfo.d.ts
declare module '@react-native-community/netinfo' {
import { EmitterSubscription } from 'react-native';

export type NetInfoState = {
    type: string;
    isConnected: boolean | null;
    isInternetReachable: boolean | null;
    details?: Record<string, any>;
};

export function fetch(): Promise<NetInfoState>;
export function addEventListener(listener: (state: NetInfoState) => void): EmitterSubscription;

export default {
    fetch: typeof fetch;
    addEventListener: typeof addEventListener,
};
}
