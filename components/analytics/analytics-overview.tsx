'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Eye, Heart, MessageCircle, Share } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AnalyticsOverview() {
  const metrics = [
    {
      title: 'Total Reach',
      value: '284.5K',
      change: '+15.2%',
      trend: 'up',
      icon: Eye,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Profile Visits',
      value: '43.2K',
      change: '+8.7%',
      trend: 'up',
      icon: Eye,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Story Views',
      value: '156.8K',
      change: '+22.1%',
      trend: 'up',
      icon: Eye,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Website Clicks',
      value: '8.4K',
      change: '-2.3%',
      trend: 'down',
      icon: Share,
      color: 'from-orange-500 to-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className={cn(
              "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center",
              metric.color
            )}>
              <metric.icon className="w-6 h-6 text-white" />
            </div>
            <div className={cn(
              "flex items-center space-x-1 text-sm font-medium",
              metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
            )}>
              {metric.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{metric.change}</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
            <p className="text-muted-foreground text-sm">{metric.title}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}