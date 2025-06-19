import React, { createContext, useContext, useState, ReactNode } from 'react';

type HEMSContextType = {
  status: string;
  setStatus: (status: string) => void;
};

const HEMSContext = createContext<HEMSContextType | undefined>(undefined);

export const HEMSProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState('online');

  return (
    <HEMSContext.Provider value={{ status, setStatus }}>
      {children}
    </HEMSContext.Provider>
  );
};

export const useHEMS = () => {
  const context = useContext(HEMSContext);
  if (!context) {
    throw new Error('useHEMS must be used within a HEMSProvider');
  }
  return context;
};
