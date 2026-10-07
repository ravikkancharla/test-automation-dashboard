import { averageDuration } from '../lib/metrics';
import type { TestRun } from '../types';

interface StatGridProps {
  runs: TestRun[];
  flakyCount: number;
}

export default function StatGrid({ runs, flakyCount }: StatGridProps) {
  const last = runs.length > 0 ? runs[runs.length - 1] : null;
  const passClass = last
    ? last.passRate >= 95 ? 'pass' : last.passRate >= 80 ? 'flake' : 'fail'
    : 'pass';

  return (
    <div className="stat-grid">
      <div className="stat">
        <div className="label">Last run pass rate</div>
        <div className={`value ${passClass}`}>{last ? `${last.passRate}%` : '\u2014'}</div>
        <div className="sub">
          {last ? `${last.passCount} of ${last.total} tests passed` : 'no runs yet'}
        </div>
      </div>
      <div className="stat">
        <div className="label">Flaky tests (last 5 runs)</div>
        <div className="value flake">{flakyCount}</div>
        <div className="sub">tests with mixed pass/fail</div>
      </div>
      <div className="stat">
        <div className="label">Avg. execution time</div>
        <div className="value">{last ? `${averageDuration(runs)}s` : '\u2014'}</div>
        <div className="sub">across tracked runs</div>
      </div>
      <div className="stat">
        <div className="label">Runs being tracked</div>
        <div className="value">{runs.length}</div>
        <div className="sub">stored in this browser</div>
      </div>
    </div>
  );
}
