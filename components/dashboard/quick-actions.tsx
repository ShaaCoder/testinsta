'use client';

import { Button } from '@/components/ui/button';
import { Plus, Calendar, Zap, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-2">
      <Link href="/scheduler">
        <Button className="instagram-gradient text-white hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </Link>
      <Link href="/scheduler">
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule
        </Button>
      </Link>
      <Link href="/automation">
        <Button variant="outline">
          <Zap className="w-4 h-4 mr-2" />
          Automate
        </Button>
      </Link>
      <Link href="/analytics">
        <Button variant="outline">
          <BarChart3 className="w-4 h-4 mr-2" />
          Analytics
        </Button>
      </Link>
    </div>
  );
}