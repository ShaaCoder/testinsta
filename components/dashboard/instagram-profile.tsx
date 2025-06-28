'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Instagram, Users, Image, ExternalLink } from 'lucide-react';

interface InstagramProfile {
  id: string;
  username: string;
  accountType: string;
  mediaCount: number;
}

export function InstagramProfile() {
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/instagram/profile', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error);
        }
      } catch (err) {
        setError('Failed to fetch Instagram profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Card className="glass-card p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="glass-card p-6">
        <div className="text-center">
          <Instagram className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Instagram Not Connected</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button className="instagram-gradient text-white hover:opacity-90">
            Connect Instagram
          </Button>
        </div>
      </Card>
    );
  }

  if (!profile) {
    return null;
  }

  const getAccountTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'business':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'creator':
        return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full instagram-gradient flex items-center justify-center">
            <Instagram className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">@{profile.username}</h3>
            <Badge className={getAccountTypeColor(profile.accountType)}>
              {profile.accountType}
            </Badge>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <ExternalLink className="w-4 h-4 mr-2" />
          View Profile
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <Image className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
          <p className="text-2xl font-bold">{profile.mediaCount.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Posts</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/50">
          <Users className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
          <p className="text-2xl font-bold">Connected</p>
          <p className="text-sm text-muted-foreground">Status</p>
        </div>
      </div>
    </Card>
  );
}