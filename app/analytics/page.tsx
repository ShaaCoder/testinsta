'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { AnalyticsOverview } from '@/components/analytics/analytics-overview';
import { PerformanceMetrics } from '@/components/analytics/performance-metrics';
import { HashtagAnalysis } from '@/components/analytics/hashtag-analysis';
import { EngagementTrends } from '@/components/analytics/engagement-trends';
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold instagram-gradient-text">
              Analytics
            </h1>
            <p className="text-muted-foreground mt-2">
              Deep insights into your Instagram performance and engagement.
            </p>
          </div>

          <AnalyticsOverview />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PerformanceMetrics />
            <EngagementTrends />
          </div>

          <HashtagAnalysis />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}