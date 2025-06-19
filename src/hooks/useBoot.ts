import { useEffect, useState } from 'react';

type BootState = {
isBooted: boolean;
error?: string;
};

export default function useBoot(): BootState {
const [isBooted, setIsBooted] = useState(false);
const [error, setError] = useState<string | undefined>(undefined);

useEffect(() => {
const boot = async () => {
    try {
    await new Promise<void>(resolve => setTimeout(resolve, 1000));

      // Later: add other async init steps
    setIsBooted(true);
    } catch (err) {
    setError((err as Error).message || 'Boot failed');
    }
};

boot();
}, []);


return { isBooted, error };
}
