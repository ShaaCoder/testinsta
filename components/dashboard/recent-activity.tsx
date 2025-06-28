'use client';

import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Share, Users, Clock } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'like',
      user: '@sarah_travels',
      action: 'liked your post',
      target: 'Sunset in Bali',
      time: new Date(Date.now() - 5 * 60 * 1000),
      icon: Heart,
      color: 'text-pink-500',
    },
    {
      id: 2,
      type: 'comment',
      user: '@photography_mike',
      action: 'commented on',
      target: 'Street Art Collection',
      time: new Date(Date.now() - 15 * 60 * 1000),
      icon: MessageCircle,
      color: 'text-blue-500',
    },
    {
      id: 3,
      type: 'follow',
      user: '@design_studio',
      action: 'started following you',
      target: null,
      time: new Date(Date.now() - 30 * 60 * 1000),
      icon: Users,
      color: 'text-green-500',
    },
    {
      id: 4,
      type: 'share',
      user: '@lifestyle_blog',
      action: 'shared your post',
      target: 'Morning Routine Tips',
      time: new Date(Date.now() - 45 * 60 * 1000),
      icon: Share,
      color: 'text-purple-500',
    },
    {
      id: 5,
      type: 'like',
      user: '@foodie_adventures',
      action: 'liked your post',
      target: 'Italian Pasta Recipe',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: Heart,
      color: 'text-pink-500',
    },
    {
      id: 6,
      type: 'comment',
      user: '@travel_couple',
      action: 'commented on',
      target: 'Tokyo Night Views',
      time: new Date(Date.now() - 3 * 60 * 60 * 1000),
      icon: MessageCircle,
      color: 'text-blue-500',
    },
  ];

  return (
    <Card className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Recent Activity</h3>
        <p className="text-muted-foreground">
          Latest interactions with your content
        </p>
      </div>
      
      <ScrollArea className="h-80">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                <activity.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{activity.user}</span>
                  <span className="text-muted-foreground">{activity.action}</span>
                  {activity.target && (
                    <span className="font-medium text-sm">{activity.target}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(activity.time, { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}