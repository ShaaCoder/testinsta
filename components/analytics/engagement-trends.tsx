'use client';

import { Card } from '@/components/ui/card';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export function EngagementTrends() {
  const data = {
    labels: ['Likes', 'Comments', 'Shares', 'Saves'],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: [
          '#E1306C',
          '#833AB4',
          '#F56040',
          '#FCAF45',
        ],
        borderColor: [
          '#E1306C',
          '#833AB4',
          '#F56040',
          '#FCAF45',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#ffffff',
          usePointStyle: true,
          padding: 20,
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
  };

  return (
    <Card className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Engagement Distribution</h3>
        <p className="text-muted-foreground">
          Breakdown of engagement types
        </p>
      </div>
      <div className="chart-container">
        <Doughnut data={data} options={options} />
      </div>
    </Card>
  );
}