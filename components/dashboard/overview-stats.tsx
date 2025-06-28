'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, Heart, MessageCircle, Share } from 'lucide-react';
import { cn } from '@/lib/utils';

export function OverviewStats() {
  const stats = [
    {
      title: 'Total Followers',
      value: '47.2K',
      change: '+12.3%',
      trend: 'up',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Engagement Rate',
      value: '8.4%',
      change: '+2.1%',
      trend: 'up',
      icon: Heart,
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Total Likes',
      value: '156.8K',
      change: '+18.7%',
      trend: 'up',
      icon: Heart,
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Comments',
      value: '12.4K',
      change: '-3.2%',
      trend: 'down',
      icon: MessageCircle,
      gradient: 'from-orange-500 to-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <div className={cn(
              "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center",
              stat.gradient
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