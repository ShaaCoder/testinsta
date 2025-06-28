'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Zap, Clock, Target } from 'lucide-react';

export function AutomationSettings() {
  const [autoLike, setAutoLike] = useState(true);
  const [autoComment, setAutoComment] = useState(false);
  const [autoFollow, setAutoFollow] = useState(false);
  const [likesPerHour, setLikesPerHour] = useState([45]);
  const [commentsPerHour, setCommentsPerHour] = useState([15]);
  const [followsPerHour, setFollowsPerHour] = useState([10]);

  return (
    <Card className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-primary" />
          Automation Settings
        </h3>
        <p className="text-muted-foreground">
          Configure automated engagement with safety limits
        </p>
      </div>

      <div className="space-y-6">
        {/* Safety Warning */}
        <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-500 mb-1">Safety First</h4>
              <p className="text-sm text-muted-foreground">
                All automation follows Instagram's guidelines with built-in rate limiting
                and human-like behavior patterns to keep your account safe.
              </p>
            </div>
          </div>
        </div>

        {/* Auto Like Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <Label htmlFor="auto-like" className="text-base font-medium">
                  Auto Like Posts
                </Label>
                <p className="text-sm text-muted-foreground">
                  Automatically like posts from targeted hashtags
                </p>
              </div>
            </div>
            <Switch
              id="auto-like"
              checked={autoLike}
              onCheckedChange={setAutoLike}
            />
          </div>

          {autoLike && (
            <div className="ml-13 pl-4 border-l border-white/10">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Likes per hour: {likesPerHour[0]}</Label>
                  <Slider
                    value={likesPerHour}
                    onValueChange={setLikesPerHour}
                    max={60}
                    min={5}
                    step={5}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Safe (5)</span>
                    <span>Max Recommended (60)</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Current: {likesPerHour[0]} likes/hour
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Auto Comment Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <Label htmlFor="auto-comment" className="text-base font-medium">
                  Auto Comment
                </Label>
                <p className="text-sm text-muted-foreground">
                  Leave thoughtful comments on targeted posts
                </p>
              </div>
            </div>
            <Switch
              id="auto-comment"
              checked={autoComment}
              onCheckedChange={setAutoComment}
            />
          </div>

          {autoComment && (
            <div className="ml-13 pl-4 border-l border-white/10">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Comments per hour: {commentsPerHour[0]}</Label>
                  <Slider
                    value={commentsPerHour}
                    onValueChange={setCommentsPerHour}
                    max={30}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Conservative (1)</span>
                    <span>Max Recommended (30)</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Current: {commentsPerHour[0]} comments/hour
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Auto Follow Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <Label htmlFor="auto-follow" className="text-base font-medium">
                  Auto Follow Users
                </Label>
                <p className="text-sm text-muted-foreground">
                  Follow users based on engagement patterns
                </p>
              </div>
            </div>
            <Switch
              id="auto-follow"
              checked={autoFollow}
              onCheckedChange={setAutoFollow}
            />
          </div>

          {autoFollow && (
            <div className="ml-13 pl-4 border-l border-white/10">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Follows per hour: {followsPerHour[0]}</Label>
                  <Slider
                    value={followsPerHour}
                    onValueChange={setFollowsPerHour}
                    max={20}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Conservative (1)</span>
                    <span>Max Recommended (20)</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Current: {followsPerHour[0]} follows/hour
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Active Hours */}
        <div className="p-4 rounded-lg border border-white/10">
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Active Hours</Label>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Automation will only run during these hours to simulate natural behavior
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Badge variant="outline">09:00 - 12:00</Badge>
            <Badge variant="outline">14:00 - 17:00</Badge>
            <Badge variant="outline">19:00 - 22:00</Badge>
            <Badge variant="outline">Weekend: 10:00 - 20:00</Badge>
          </div>
        </div>

        <Button className="w-full instagram-gradient text-white hover:opacity-90">
          Save Automation Settings
        </Button>
      </div>
    </Card>
  );
}