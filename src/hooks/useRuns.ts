import { useCallback, useState } from 'react';
import { MAX_STORED_RUNS } from '../constants';
import { loadRuns, saveRuns } from '../lib/storage';
import { simulateRun } from '../lib/simulate';
import type { TestRun } from '../types';

export function useRuns() {
  const [runs, setRuns] = useState<TestRun[]>(() => loadRuns());

  const addRun = useCallback(() => {
    setRuns((prev) => {
      const next = [...prev, simulateRun()].slice(-MAX_STORED_RUNS);
      saveRuns(next);
      return next;
    });
  }, []);

  const resetRuns = useCallback(() => {
    if (confirm('Clear all stored test run history in this browser?')) {
      saveRuns([]);
      setRuns([]);
    }
  }, []);

  return { runs, addRun, resetRuns };
}
