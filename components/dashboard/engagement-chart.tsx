'use client';

import { Card } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function EngagementChart() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Likes',
        data: [1200, 1900, 3000, 5000, 4200, 3800, 4500],
        borderColor: '#E1306C',
        backgroundColor: 'rgba(225, 48, 108, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Comments',
        data: [300, 450, 600, 800, 700, 650, 750],
        borderColor: '#833AB4',
        backgroundColor: 'rgba(131, 58, 180, 0.1)',
        fill: true,
        tension: 0.4,
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
        <h3 className="text-xl font-semibold mb-2">Weekly Engagement</h3>
        <p className="text-muted-foreground">
          Track your likes and comments over the past week
        </p>
      </div>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </Card>
  );
}