'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { AutomationSettings } from '@/components/automation/automation-settings';
import { AutomationRules } from '@/components/automation/automation-rules';
import { AutomationHistory } from '@/components/automation/automation-history';
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function AutomationPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold instagram-gradient-text">
              Automation
            </h1>
            <p className="text-muted-foreground mt-2">
              Configure automated engagement and interaction settings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AutomationSettings />
            <AutomationRules />
          </div>

          <AutomationHistory />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}