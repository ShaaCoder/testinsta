'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Activity, Server, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminStats() {
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.3%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Active Automations',
      value: '1,934',
      change: '+8.7%',
      trend: 'up',
      icon: Activity,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'API Requests/Hour',
      value: '45.2K',
      change: '+15.2%',
      trend: 'up',
      icon: Server,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'System Alerts',
      value: '3',
      change: '-25.0%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'from-orange-500 to-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className={cn(
              "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center",
              stat.color
            )}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className={cn(
              "flex items-center space-x-1 text-sm font-medium",
              stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
            )}>
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{stat.change}</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-muted-foreground text-sm">{stat.title}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}