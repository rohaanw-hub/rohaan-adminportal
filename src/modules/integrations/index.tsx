import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ConnectedAppsPage } from './ConnectedAppsPage'
import { CredentialsPage } from './CredentialsPage'
import { WebhooksPage } from './WebhooksPage'
import { EventLogsPage } from './EventLogsPage'
import { IntegrationMapper } from './IntegrationMapper'

export function Integrations() {
  const loc = useLocation()
  const isMapper = loc.pathname.startsWith('/integrations/mapper')

  return (
    <div className="p-6">
      {!isMapper && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Integrations & APIs</h1>
          <p className="text-sm text-gray-500 mt-1">Manage connected apps, API credentials, webhooks, and event logs</p>
        </div>
      )}
      <Routes>
        <Route index element={<ConnectedAppsPage />} />
        <Route path="credentials" element={<CredentialsPage />} />
        <Route path="webhooks" element={<WebhooksPage />} />
        <Route path="event-logs" element={<EventLogsPage />} />
        <Route path="error-logs" element={<EventLogsPage errorsOnly />} />
        <Route path="mapper" element={<IntegrationMapper />} />
        <Route path="*" element={<Navigate to="/integrations" replace />} />
      </Routes>
    </div>
  )
}
