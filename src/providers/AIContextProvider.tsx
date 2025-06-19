import React, { createContext, useContext, useState } from 'react';

type AIContextType = {
personality: string;
setPersonality: (p: string) => void;
};

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIContextProvider = ({ children }: { children: React.ReactNode }) => {
const [personality, setPersonality] = useState('neutral');

return (
    <AIContext.Provider value={{ personality, setPersonality }}>
    {children}
    </AIContext.Provider>
);
};

export const useAIContext = () => {
const context = useContext(AIContext);
if (!context) {
    throw new Error('useAIContext must be used within an AIContextProvider');
}
return context;
};
