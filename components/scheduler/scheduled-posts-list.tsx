'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Clock, Edit, Trash2, Play } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

export function ScheduledPostsList() {
  const scheduledPosts = [
    {
      id: 1,
      title: 'Morning Coffee Inspiration',
      scheduledFor: new Date(Date.now() + 2 * 60 * 60 * 1000),
      status: 'scheduled',
      mediaCount: 1,
    },
    {
      id: 2,
      title: 'Weekly Workout Routine',
      scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: 'scheduled',
      mediaCount: 3,
    },
    {
      id: 3,
      title: 'Behind the Scenes',
      scheduledFor: new Date(Date.now() + 48 * 60 * 60 * 1000),
      status: 'draft',
      mediaCount: 2,
    },
    {
      id: 4,
      title: 'Product Launch Teaser',
      scheduledFor: new Date(Date.now() + 72 * 60 * 60 * 1000),
      status: 'scheduled',
      mediaCount: 1,
    },
    {
      id: 5,
      title: 'Travel Memories',
      scheduledFor: new Date(Date.now() + 96 * 60 * 60 * 1000),
      status: 'draft',
      mediaCount: 5,
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
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Scheduled Posts</h3>
        <p className="text-muted-foreground">
          Manage your upcoming content
        </p>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {scheduledPosts.map((post) => (
            <div key={post.id} className="p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium mb-2">{post.title}</h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{format(post.scheduledFor, 'MMM dd')}</span>
                    <Clock className="w-3 h-3 ml-2" />
                    <span>{format(post.scheduledFor, 'HH:mm')}</span>
                  </div>
                </div>
                <Badge className={getStatusColor(post.status)}>
                  {post.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {post.mediaCount} media file{post.mediaCount !== 1 ? 's' : ''} • {' '}
                  {formatDistanceToNow(post.scheduledFor, { addSuffix: true })}
                </div>
                <div className="flex space-x-1">
                  {post.status === 'scheduled' && (
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <Play className="w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}