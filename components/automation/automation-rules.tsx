'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, Target, Hash, Users } from 'lucide-react';

export function AutomationRules() {
  const [targetHashtags, setTargetHashtags] = useState(['photography', 'lifestyle', 'travel']);
  const [targetAccounts, setTargetAccounts] = useState(['@competitor1', '@influencer2']);
  const [commentTemplates, setCommentTemplates] = useState([
    'Amazing shot! 🔥',
    'Love this content! ✨',
    'Incredible work! 👏'
  ]);
  const [newHashtag, setNewHashtag] = useState('');
  const [newAccount, setNewAccount] = useState('');
  const [newComment, setNewComment] = useState('');

  const addHashtag = () => {
    if (newHashtag && !targetHashtags.includes(newHashtag)) {
      setTargetHashtags([...targetHashtags, newHashtag]);
      setNewHashtag('');
    }
  };

  const addAccount = () => {
    if (newAccount && !targetAccounts.includes(newAccount)) {
      setTargetAccounts([...targetAccounts, newAccount]);
      setNewAccount('');
    }
  };

  const addComment = () => {
    if (newComment && !commentTemplates.includes(newComment)) {
      setCommentTemplates([...commentTemplates, newComment]);
      setNewComment('');
    }
  };

  const removeHashtag = (hashtag: string) => {
    setTargetHashtags(targetHashtags.filter(h => h !== hashtag));
  };

  const removeAccount = (account: string) => {
    setTargetAccounts(targetAccounts.filter(a => a !== account));
  };

  const removeComment = (comment: string) => {
    setCommentTemplates(commentTemplates.filter(c => c !== comment));
  };

  return (
    <Card className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Target className="w-5 h-5 mr-2 text-primary" />
          Targeting Rules
        </h3>
        <p className="text-muted-foreground">
          Define what content and accounts to target for automation
        </p>
      </div>

      <div className="space-y-6">
        {/* Target Hashtags */}
        <div>
          <Label className="text-base font-medium flex items-center mb-3">
            <Hash className="w-4 h-4 mr-2" />
            Target Hashtags
          </Label>
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter hashtag (without #)"
                value={newHashtag}
                onChange={(e) => setNewHashtag(e.target.value.replace('#', ''))}
                onKeyPress={(e) => e.key === 'Enter' && addHashtag()}
              />
              <Button onClick={addHashtag} disabled={!newHashtag}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {targetHashtags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {targetHashtags.map((hashtag) => (
                  <Badge key={hashtag} variant="secondary" className="text-sm">
                    #{hashtag}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeHashtag(hashtag)}
                      className="ml-1 w-4 h-4 p-0 hover:bg-transparent"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Target Accounts */}
        <div>
          <Label className="text-base font-medium flex items-center mb-3">
            <Users className="w-4 h-4 mr-2" />
            Target Accounts
          </Label>
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter username (with @)"
                value={newAccount}
                onChange={(e) => setNewAccount(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addAccount()}
              />
              <Button onClick={addAccount} disabled={!newAccount}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {targetAccounts.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {targetAccounts.map((account) => (
                  <Badge key={account} variant="outline" className="text-sm">
                    {account}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAccount(account)}
                      className="ml-1 w-4 h-4 p-0 hover:bg-transparent"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Target followers and interactions from these competitor accounts
          </p>
        </div>

        {/* Comment Templates */}
        <div>
          <Label className="text-base font-medium mb-3 block">
            Comment Templates
          </Label>
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Textarea
                placeholder="Enter comment template..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <Button onClick={addComment} disabled={!newComment} className="self-start">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {commentTemplates.length > 0 && (
              <div className="space-y-2">
                {commentTemplates.map((comment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-white/10">
                    <span className="text-sm">{comment}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeComment(comment)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Random comments will be selected to make interactions appear natural
          </p>
        </div>

        {/* Filters */}
        <div className="p-4 rounded-lg border border-white/10">
          <Label className="text-base font-medium mb-3 block">
            Content Filters
          </Label>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Min. Likes</p>
              <Badge variant="outline">50+</Badge>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Account Type</p>
              <Badge variant="outline">Public Only</Badge>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Post Age</p>
              <Badge variant="outline">&lt; 24 hours</Badge>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Language</p>
              <Badge variant="outline">English</Badge>
            </div>
          </div>
        </div>

        <Button className="w-full instagram-gradient text-white hover:opacity-90">
          Save Targeting Rules
        </Button>
      </div>
    </Card>
  );
}