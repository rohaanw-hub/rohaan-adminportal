import { Navigate, Route, Routes } from 'react-router-dom'
import { UsersPage } from './UsersPage'
import { GroupsPage } from './GroupsPage'
import { RolesPage } from './RolesPage'
import { PoliciesPage } from './PoliciesPage'

export function AccessManagement() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Access Management</h1>
        <p className="text-sm text-gray-500 mt-1">Manage users, groups, roles, and security policies</p>
      </div>
      <Routes>
        <Route index element={<UsersPage />} />
        <Route path="groups" element={<GroupsPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="policies" element={<PoliciesPage />} />
        <Route path="*" element={<Navigate to="/access" replace />} />
      </Routes>
    </div>
  )
}
