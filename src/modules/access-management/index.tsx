import { Navigate, Route, Routes } from 'react-router-dom'
import { UsersPage } from './UsersPage'
import { RolesPage } from './RolesPage'
import { PoliciesPage } from './PoliciesPage'
import { LicenseAssignmentPage } from './LicenseAssignmentPage'
import { GroupProductPage } from './GroupProductPage'

export function AccessManagement() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Access Management</h1>
        <p className="text-sm text-gray-500 mt-1">Manage users, groups, roles, and security policies</p>
      </div>
      <Routes>
        <Route index element={<UsersPage />} />
        <Route path="groups" element={<Navigate to="/access/groups/license-assignment" replace />} />
        <Route path="groups/license-assignment" element={<LicenseAssignmentPage />} />
        <Route path="groups/heavybid"   element={<GroupProductPage product="HeavyBid" />} />
        <Route path="groups/heavyjob"   element={<GroupProductPage product="HeavyJob" />} />
        <Route path="groups/telematics" element={<GroupProductPage product="Telematics" />} />
        <Route path="roles"    element={<RolesPage />} />
        <Route path="policies" element={<PoliciesPage />} />
        <Route path="*" element={<Navigate to="/access" replace />} />
      </Routes>
    </div>
  )
}
