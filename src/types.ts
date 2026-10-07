export interface TestDefinition {
  name: string;
  /** Probability that any given run fails this test (fake data only). */
  flakeChance: number;
}

export interface TestResult {
  name: string;
  passed: boolean;
}

export interface TestRun {
  id: number;
  timestamp: string;
  tests: TestResult[];
  passCount: number;
  total: number;
  passRate: number;
  durationSec: number;
}
