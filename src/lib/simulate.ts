import { TEST_SUITE } from '../constants';
import type { TestRun } from '../types';

// Data generation - replace with real CI pipeline results.
export function simulateRun(): TestRun {
  const tests = TEST_SUITE.map((t) => ({
    name: t.name,
    passed: !(Math.random() < t.flakeChance),
  }));
  const passCount = tests.filter((t) => t.passed).length;
  const durationSec = Math.round((28 + Math.random() * 40) * 10) / 10;
  return {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    tests,
    passCount,
    total: tests.length,
    passRate: Math.round((passCount / tests.length) * 1000) / 10,
    durationSec,
  };
}
