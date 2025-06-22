// File: src/hooks/useBoot.ts
import { useEffect, useState } from 'react';
import { retryFailedSyncs } from 'infra/cloud_sync';
import { bootRetryOnStart, monitorNetworkAndRetrySync } from 'memory/retry_queue';

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
        // Retry failed syncs on app boot
        bootRetryOnStart(retryFailedSyncs);

        // Monitor for network changes and auto-sync
        monitorNetworkAndRetrySync(retryFailedSyncs);

        // Simulate boot delay
        await new Promise<void>(resolve => setTimeout(resolve, 1000));

        setIsBooted(true);
      } catch (err) {
        setError((err as Error).message || 'Boot failed');
      }
    };

    boot();
  }, []);

  return { isBooted, error };
}
