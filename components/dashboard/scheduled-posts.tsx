'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Image, Edit, Trash2 } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

export function ScheduledPosts() {
  const scheduledPosts = [
    {
      id: 1,
      title: 'Morning Coffee Inspiration',
      scheduledFor: new Date(Date.now() + 2 * 60 * 60 * 1000),
      status: 'scheduled',
      type: 'image',
      caption: 'Starting the day with the perfect cup ☕️ #MorningMotivation #Coffee',
    },
    {
      id: 2,
      title: 'Weekly Workout Routine',
      scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: 'scheduled',
      type: 'video',
      caption: 'Transform your fitness journey with these simple exercises 💪 #Fitness #Workout',
    },
    {
      id: 3,
      title: 'Behind the Scenes',
      scheduledFor: new Date(Date.now() + 48 * 60 * 60 * 1000),
      status: 'draft',
      type: 'image',
      caption: 'Here\'s what goes into creating content you love ✨ #BehindTheScenes',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Scheduled Posts</h3>
          <p className="text-muted-foreground">
            Manage your upcoming content
          </p>
        </div>
        <Button className="instagram-gradient text-white hover:opacity-90">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {scheduledPosts.map((post) => (
          <div key={post.id} className="p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Image className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">{post.title}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {format(post.scheduledFor, 'MMM dd, yyyy')}
                    </span>
                    <Clock className="w-3 h-3 text-muted-foreground ml-2" />
                    <span className="text-sm text-muted-foreground">
                      {format(post.scheduledFor, 'HH:mm')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(post.status)}>
                  {post.status}
                </Badge>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {post.caption}
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(post.scheduledFor, { addSuffix: true })}
              </span>
              <Badge variant="outline" className="text-xs">
                {post.type}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}