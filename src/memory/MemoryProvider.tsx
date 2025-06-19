import React, { createContext, useContext, useEffect, useState } from "react";
import { AppState } from "react-native";
import { logActivity, getActivityLog } from "hems/activity_logger";
import { persistMemory, setupMemoryTable } from "memory/sqlite"; // ✅ import SQLite helpers

type MemoryContextType = {
memory: any[];
saveMemory: (entry: any) => void;
};

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export const MemoryProvider = ({ children }: { children: React.ReactNode }) => {
const [memory, setMemory] = useState<any[]>([]);

  // ✅ Initialize SQLite memory table on mount
useEffect(() => {
    setupMemoryTable();
}, []);

  // ✅ Save memory in both in-memory state and SQLite
const saveMemory = (entry: any) => {
    const enriched = { ...entry, storedAt: new Date().toISOString() };
    setMemory((prev) => [...prev, enriched]);
    persistMemory(enriched);
    console.log("Memory saved:", enriched);
};

  // ✅ Auto-pull activity log into memory on app resume
useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
    if (state === "active") {
        const log = getActivityLog();
        log.forEach((entry) => saveMemory({ type: "activity", ...entry }));
    }
    });

    return () => sub.remove();
}, []);

return (
    <MemoryContext.Provider value={{ memory, saveMemory }}>
    {children}
    </MemoryContext.Provider>
);
};

export const useMemory = () => {
const context = useContext(MemoryContext);
if (!context)
    throw new Error("useMemory must be used within a MemoryProvider");
return context;
};
