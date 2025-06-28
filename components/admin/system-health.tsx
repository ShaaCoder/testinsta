'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Server, Database, Cpu, HardDrive, Wifi, CheckCircle, AlertTriangle } from 'lucide-react';

export function SystemHealth() {
  const metrics = [
    {
      name: 'CPU Usage',
      value: 34,
      status: 'good',
      icon: Cpu,
    },
    {
      name: 'Memory Usage',
      value: 67,
      status: 'warning',
      icon: Server,
    },
    {
      name: 'Disk Usage',
      value: 23,
      status: 'good',
      icon: HardDrive,
    },
    {
      name: 'Database',
      value: 89,
      status: 'good',
      icon: Database,
    },
    {
      name: 'API Response',
      value: 156,
      status: 'good',
      icon: Wifi,
      unit: 'ms',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <Card className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">System Health</h3>
        <p className="text-muted-foreground">
          Monitor server performance and resource usage
        </p>
      </div>

      <div className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <metric.icon className={`w-5 h-5 ${getStatusColor(metric.status)}`} />
                <span className="font-medium">{metric.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {metric.value}{metric.unit || '%'}
                </span>
                {getStatusIcon(metric.status)}
              </div>
            </div>
            {!metric.unit && (
              <Progress 
                value={metric.value} 
                className={cn(
                  "h-2",
                  metric.status === 'warning' && "progress-warning",
                  metric.status === 'error' && "progress-error"
                )}
              />
            )}
          </div>
        ))}

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">System Status</span>
            <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
              All Systems Operational
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}