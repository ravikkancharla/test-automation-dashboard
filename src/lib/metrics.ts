import { FLAKY_WINDOW } from '../constants';
import type { TestRun } from '../types';

/** A test is flaky if it shows both a pass and a fail within the last 5 runs. */
export function computeFlakyTests(runs: TestRun[]): string[] {
  const counts = new Map<string, { pass: number; fail: number }>();
  for (const run of runs.slice(-FLAKY_WINDOW)) {
    for (const t of run.tests) {
      const c = counts.get(t.name) ?? { pass: 0, fail: 0 };
      if (t.passed) c.pass++;
      else c.fail++;
      counts.set(t.name, c);
    }
  }
  const flaky: string[] = [];
  counts.forEach((c, name) => {
    if (c.pass > 0 && c.fail > 0) flaky.push(name);
  });
  return flaky;
}

export function averageDuration(runs: TestRun[]): number {
  if (runs.length === 0) return 0;
  const avg = runs.reduce((sum, r) => sum + r.durationSec, 0) / runs.length;
  return Math.round(avg * 10) / 10;
}

export function fmtTime(iso: string): string {
  const d = new Date(iso);
  return (
    d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
    ' ' +
    d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
  );
}
