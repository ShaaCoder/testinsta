'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { PostScheduler } from '@/components/scheduler/post-scheduler';
import { ScheduledPostsList } from '@/components/scheduler/scheduled-posts-list';
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function SchedulerPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold instagram-gradient-text">
              Post Scheduler
            </h1>
            <p className="text-muted-foreground mt-2">
              Schedule and manage your Instagram posts with precision timing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PostScheduler />
            </div>
            <div>
              <ScheduledPostsList />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}