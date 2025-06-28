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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function ApiUsage() {
  const data = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    datasets: [
      {
        label: 'Instagram API',
        data: [2100, 1800, 3200, 4800, 4200, 3600, 2800],
        borderColor: '#E1306C',
        backgroundColor: 'rgba(225, 48, 108, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Internal API',
        data: [800, 600, 1200, 1800, 1600, 1400, 1000],
        borderColor: '#833AB4',
        backgroundColor: 'rgba(131, 58, 180, 0.1)',
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
        <h3 className="text-xl font-semibold mb-2">API Usage</h3>
        <p className="text-muted-foreground">
          Monitor API request patterns and usage limits
        </p>
      </div>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-muted-foreground">Rate Limit Usage</p>
          <p className="text-xl font-bold text-orange-500">76%</p>
        </div>
        <div className="p-3 rounded-lg bg-muted/50">
          <p className="text-muted-foreground">Requests Today</p>
          <p className="text-xl font-bold text-blue-500">43.2K</p>
        </div>
      </div>
    </Card>
  );
}