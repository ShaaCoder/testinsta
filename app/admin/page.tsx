'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { AdminStats } from '@/components/admin/admin-stats';
import { UserManagement } from '@/components/admin/user-management';
import { SystemHealth } from '@/components/admin/system-health';
import { ApiUsage } from '@/components/admin/api-usage';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { AdminRoute } from '@/components/auth/admin-route';

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminRoute>
        <DashboardLayout>
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold instagram-gradient-text">
                Admin Console
              </h1>
              <p className="text-muted-foreground mt-2">
                System administration and user management dashboard.
              </p>
            </div>

            <AdminStats />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SystemHealth />
              <ApiUsage />
            </div>

            <UserManagement />
          </div>
        </DashboardLayout>
      </AdminRoute>
    </ProtectedRoute>
  );
}