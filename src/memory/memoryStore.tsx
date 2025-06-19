// SYNTHEOSCore/src/memory/memoryStore.ts

type MemoryItem = {
id: string;
type: string;
payload: any;
timestamp: number;
};

class MemoryEngine {
private store: MemoryItem[] = [];

add(item: Omit<MemoryItem, 'timestamp'>) {
    const newItem = { ...item, timestamp: Date.now() };
    this.store.push(newItem);
}

getAll() {
    return this.store;
}

getByType(type: string) {
    return this.store.filter(item => item.type === type);
}

clear() {
    this.store = [];
}
}

export const memoryEngine = new MemoryEngine();
