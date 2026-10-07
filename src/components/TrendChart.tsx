import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

interface TrendChartProps {
  title: string;
  ariaLabel: string;
  label: string;
  labels: string[];
  data: number[];
  color: string;
  fill: string;
  suffix: string;
  fixedMax100?: boolean;
}

const GRID = '#293446';
const TICK = '#8A96A6';

export default function TrendChart({
  title, ariaLabel, label, labels, data, color, fill, suffix, fixedMax100,
}: TrendChartProps) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div className="chart-wrap">
        <Line
          role="img"
          aria-label={ariaLabel}
          data={{
            labels,
            datasets: [{
              label,
              data,
              borderColor: color,
              backgroundColor: fill,
              fill: true,
              tension: 0.25,
              pointRadius: 3,
            }],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                ...(fixedMax100 ? { min: 0, max: 100 } : { beginAtZero: true }),
                grid: { color: GRID },
                ticks: { color: TICK, callback: (v) => `${v}${suffix}` },
              },
              x: {
                grid: { display: false },
                ticks: { color: TICK, maxRotation: 0, autoSkip: true },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
