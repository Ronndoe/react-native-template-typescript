import React from 'react';
import { HEMSProvider } from 'providers/HEMSProvider';
import { BLEProvider } from 'providers/BLEProvider';
import { AIContextProvider } from 'providers/AIContextProvider';
import { NavigationProvider } from 'providers/NavigationProvider';
import { MemoryProvider } from 'memory/MemoryProvider';

export default function BootProviders({ children }: { children: React.ReactNode }) {
return (
    <HEMSProvider>
    <BLEProvider>
        <MemoryProvider>
        <AIContextProvider>
        <NavigationProvider>
            {children}
        </NavigationProvider>
        </AIContextProvider>
        </MemoryProvider>
    </BLEProvider>
    </HEMSProvider>
);
}
