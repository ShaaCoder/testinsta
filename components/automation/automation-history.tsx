'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, UserPlus, ExternalLink, CheckCircle, XCircle, Clock } from 'lucide-react';

export function AutomationHistory() {
  const activities = [
    {
      id: 1,
      type: 'like',
      status: 'completed',
      target: '@travel_photographer',
      content: 'Sunset in Santorini',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      icon: Heart,
      color: 'text-pink-500',
    },
    {
      id: 2,
      type: 'comment',
      status: 'completed',
      target: '@lifestyle_blogger',
      content: 'Morning routine essentials',
      comment: 'Amazing tips! ✨',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      icon: MessageCircle,
      color: 'text-blue-500',
    },
    {
      id: 3,
      type: 'follow',
      status: 'completed',
      target: '@photography_studio',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      icon: UserPlus,
      color: 'text-green-500',
    },
    {
      id: 4,
      type: 'like',
      status: 'failed',
      target: '@private_account',
      content: 'Private post',
      error: 'Account is private',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      icon: Heart,
      color: 'text-pink-500',
    },
    {
      id: 5,
      type: 'comment',
      status: 'pending',
      target: '@food_blogger',
      content: 'Italian pasta recipe',
      comment: 'Looks delicious! 🍝',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      icon: MessageCircle,
      color: 'text-blue-500',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Automation History</h3>
          <p className="text-muted-foreground">
            Track all automated actions and their results
          </p>
        </div>
        <Button variant="outline">
          <ExternalLink className="w-4 h-4 mr-2" />
          View Full Log
        </Button>
      </div>

      <ScrollArea className="h-96">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium capitalize">{activity.type}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{activity.target}</span>
                    </div>
                    {activity.content && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.content}
                      </p>
                    )}
                    {activity.comment && (
                      <p className="text-sm text-blue-400 mt-1 italic">
                        "{activity.comment}"
                      </p>
                    )}
                    {activity.error && (
                      <p className="text-sm text-red-400 mt-1">
                        Error: {activity.error}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(activity.status)}
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}