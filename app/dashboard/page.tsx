'use client';

import { useAuth } from '@/hooks/use-auth';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { OverviewStats } from '@/components/dashboard/overview-stats';
import { EngagementChart } from '@/components/dashboard/engagement-chart';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { ScheduledPosts } from '@/components/dashboard/scheduled-posts';
import { InstagramProfile } from '@/components/dashboard/instagram-profile';
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold instagram-gradient-text">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-muted-foreground mt-2">
                Here's your Instagram performance overview.
              </p>
            </div>
            <QuickActions />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <OverviewStats />
            </div>
            <div>
              <InstagramProfile />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <EngagementChart />
            <RecentActivity />
          </div>

          <ScheduledPosts />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}