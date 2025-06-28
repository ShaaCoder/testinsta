'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Hash } from 'lucide-react';

export function HashtagAnalysis() {
  const topHashtags = [
    { tag: 'photography', impressions: 45600, engagement: 8.2, growth: 12.5 },
    { tag: 'lifestyle', impressions: 38200, engagement: 7.8, growth: 8.3 },
    { tag: 'travel', impressions: 32100, engagement: 9.1, growth: 15.2 },
    { tag: 'fashion', impressions: 28900, engagement: 6.9, growth: 5.7 },
    { tag: 'food', impressions: 24300, engagement: 7.5, growth: -2.1 },
    { tag: 'fitness', impressions: 21800, engagement: 8.7, growth: 18.9 },
    { tag: 'art', impressions: 19500, engagement: 9.8, growth: 22.4 },
    { tag: 'nature', impressions: 17200, engagement: 8.4, growth: 11.6 },
  ];

  const maxImpressions = Math.max(...topHashtags.map(h => h.impressions));

  return (
    <Card className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Top Performing Hashtags</h3>
        <p className="text-muted-foreground">
          Analyze which hashtags drive the most engagement
        </p>
      </div>

      <div className="space-y-4">
        {topHashtags.map((hashtag, index) => (
          <div key={hashtag.tag} className="p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Hash className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-medium">#{hashtag.tag}</span>
                  <p className="text-sm text-muted-foreground">
                    {hashtag.impressions.toLocaleString()} impressions
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{hashtag.engagement}%</p>
                  <p className="text-xs text-muted-foreground">engagement</p>
                </div>
                <div className="flex items-center space-x-1 text-sm font-medium">
                  <TrendingUp className={`w-3 h-3 ${hashtag.growth >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={hashtag.growth >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {hashtag.growth >= 0 ? '+' : ''}{hashtag.growth.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            <Progress
              value={(hashtag.impressions / maxImpressions) * 100}
              className="h-2"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}