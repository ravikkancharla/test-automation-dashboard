import { Fragment, useState } from 'react';
import { MAX_LISTED_RUNS } from '../constants';
import { fmtTime } from '../lib/metrics';
import type { TestRun } from '../types';

interface RunHistoryProps {
  runs: TestRun[];
  flaky: string[];
  onRun: () => void;
}

const MONO = { fontFamily: 'var(--font-m)' };

export default function RunHistory({ runs, flaky, onRun }: RunHistoryProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const recent = runs.slice().reverse().slice(0, MAX_LISTED_RUNS);

  return (
    <div className="panel">
      <div className="panel-head">
        <h3>Run History</h3>
        <span style={{ ...MONO, fontSize: '0.78rem', color: 'var(--muted-2)' }}>
          {runs.length} {runs.length === 1 ? 'run' : 'runs'}
        </span>
      </div>
      {recent.length === 0 ? (
        <div className="empty">
          <p>No test runs yet.</p>
          <button className="btn btn-primary" onClick={onRun}>Simulate your first run</button>
        </div>
      ) : (
        <table className="run-table">
          <colgroup>
            <col /><col /><col /><col /><col />
          </colgroup>
          <thead>
            <tr>
              <th>Run</th><th>Result</th><th>Pass Rate</th><th>Duration</th><th># of Flaky Tests</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((run) => {
              const runFlaky = run.tests.filter((t) => flaky.includes(t.name));
              const pillClass = run.passRate === 100 ? 'pass' : 'flake';
              const pillLabel = `${run.passCount}/${run.total}`;
              return (
                <Fragment key={run.id}>
                  <tr
                    className="run-row"
                    onClick={() => setExpandedId(expandedId === run.id ? null : run.id)}
                  >
                    <td>{fmtTime(run.timestamp)}</td>
                    <td>
                      <span className={`pill ${pillClass}`}>
                        <span></span>{pillLabel}
                      </span>
                    </td>
                    <td style={MONO}>{run.passRate}%</td>
                    <td style={MONO}>{run.durationSec}s</td>
                    <td>{runFlaky.length ? runFlaky.length : '\u2014'}</td>
                  </tr>
                  <tr className={`detail-row${expandedId === run.id ? '' : ' hidden'}`}>
                    <td colSpan={5}>
                      <div className="test-list">
                        {run.tests.map((t) => {
                          const isFlaky = flaky.includes(t.name);
                          return (
                            <div className="test-item" key={t.name}>
                              <span className={`tname${isFlaky ? ' flaky-name' : ''}`}>
                                {t.name}{isFlaky ? ' (flaky)' : ''}
                              </span>
                              <span className={`pill ${t.passed ? 'pass' : 'fail'}`}>
                                <span className="dot"></span>{t.passed ? 'pass' : 'fail'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
