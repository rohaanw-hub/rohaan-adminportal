import { Navigate, Route, Routes } from 'react-router-dom'
import { OverviewPage } from './OverviewPage'
import { InvoicesPage } from './InvoicesPage'
import { PaymentPage } from './PaymentPage'

export function Billing() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Billing & Subscriptions</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your HCSS product subscriptions, invoices, and payment methods</p>
      </div>
      <Routes>
        <Route index element={<OverviewPage />} />
        <Route path="invoices" element={<InvoicesPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="*" element={<Navigate to="/billing" replace />} />
      </Routes>
    </div>
  )
}
