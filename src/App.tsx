import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Shell } from '@/components/layout/Shell'
import { AccessManagement } from '@/modules/access-management'
import { Billing } from '@/modules/billing'
import { Insights } from '@/modules/insights'
import { Integrations } from '@/modules/integrations'
import { SetupData } from '@/modules/setup-data'
import { SystemSettings } from '@/modules/system-settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Navigate to="/access" replace />} />
          <Route path="/access/*" element={<AccessManagement />} />
          <Route path="/audit" element={
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900">Auditing</h1>
              <p className="text-sm text-gray-500 mt-1">Audit logs and compliance reporting — coming soon</p>
            </div>
          } />
          <Route path="/billing/*" element={<Billing />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/integrations/*" element={<Integrations />} />
          <Route path="/setup" element={<SetupData />} />
          <Route path="/settings" element={<SystemSettings />} />
          <Route path="*" element={<Navigate to="/access" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
