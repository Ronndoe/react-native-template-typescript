import React, { createContext, useContext, useState } from 'react';

type BLEContextType = {
isConnected: boolean;
connect: () => void;
disconnect: () => void;
};

const BLEContext = createContext<BLEContextType | undefined>(undefined);

export const BLEProvider = ({ children }: { children: React.ReactNode }) => {
const [isConnected, setIsConnected] = useState(false);

const connect = () => {
    console.log('[BLE] Connecting...');
    setIsConnected(true);
};

const disconnect = () => {
    console.log('[BLE] Disconnecting...');
    setIsConnected(false);
};

return (
    <BLEContext.Provider value={{ isConnected, connect, disconnect }}>
    {children}
    </BLEContext.Provider>
);
};

export const useBLE = () => {
const context = useContext(BLEContext);
if (!context) {
    throw new Error('useBLE must be used within a BLEProvider');
}
return context;
};
