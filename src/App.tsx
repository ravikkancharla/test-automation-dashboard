import { useMemo } from 'react';
import Header from './components/Header';
import StatGrid from './components/StatGrid';
import TrendChart from './components/TrendChart';
import RunHistory from './components/RunHistory';
import Footer from './components/Footer';
import { useRuns } from './hooks/useRuns';
import { computeFlakyTests, fmtTime } from './lib/metrics';
import { MAX_CHARTED_RUNS } from './constants';

export default function App() {
  const { runs, addRun, resetRuns } = useRuns();
  const flaky = useMemo(() => computeFlakyTests(runs), [runs]);

  const charted = runs.slice(-MAX_CHARTED_RUNS);
  const labels = charted.map((r) => fmtTime(r.timestamp));

  return (
    <>
      <Header onRun={addRun} onReset={resetRuns} />
      <main>
        <div className="wrap">
          <p className="kicker">Overview</p>
          <StatGrid runs={runs} flakyCount={flaky.length} />

          <p className="kicker">Trends</p>
          <div className="chart-grid">
            <TrendChart
              title="Pass Trend"
              ariaLabel="Line chart of pass rate percentage across recent test runs"
              label="Pass rate %"
              labels={labels}
              data={charted.map((r) => r.passRate)}
              color="#45C98A"
              fill="rgba(69,201,138,0.1)"
              suffix="%"
              fixedMax100
            />
            <TrendChart
              title="Execution Duration Trend"
              ariaLabel="Line chart of test suite execution duration in seconds across recent runs"
              label="Duration (s)"
              labels={labels}
              data={charted.map((r) => r.durationSec)}
              color="#5B8DEF"
              fill="rgba(91,141,239,0.1)"
              suffix="s"
            />
          </div>

          <p className="kicker">Test Runs</p>
          <RunHistory runs={runs} flaky={flaky} onRun={addRun} />
        </div>
      </main>
      <Footer />
    </>
  );
}
