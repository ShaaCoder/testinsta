'use client';

import { Card } from '@/components/ui/card';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function PerformanceMetrics() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Followers Gained',
        data: [1200, 1900, 3000, 5000, 4200, 3800],
        backgroundColor: 'rgba(225, 48, 108, 0.8)',
        borderColor: '#E1306C',
        borderWidth: 1,
      },
      {
        label: 'Engagement Rate',
        data: [300, 450, 600, 800, 700, 650],
        backgroundColor: 'rgba(131, 58, 180, 0.8)',
        borderColor: '#833AB4',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#ffffff',
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#333',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
        },
      },
    },
  };

  return (
    <Card className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Performance Metrics</h3>
        <p className="text-muted-foreground">
          Monthly growth and engagement trends
        </p>
      </div>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
}