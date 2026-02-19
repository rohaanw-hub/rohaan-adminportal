import { User, Group, Role, Policy } from '@/types'

export const users: User[] = [
  { id: 'u1', name: 'Marcus Webb', email: 'mwebb@acmeconst.com', status: 'Active', role: 'Super Admin', lastLogin: '2026-02-18 08:42', assignedApps: ['HeavyJob', 'HeavyBid', 'Dispatcher', 'Safety'], company: 'Acme Construction', department: 'IT', phone: '(713) 555-0101' },
  { id: 'u2', name: 'Priya Nair', email: 'pnair@acmeconst.com', status: 'Active', role: 'Project Manager', lastLogin: '2026-02-18 07:55', assignedApps: ['HeavyJob', 'HeavyBid'], company: 'Acme Construction', department: 'Operations', phone: '(713) 555-0102' },
  { id: 'u3', name: 'Dale Fontaine', email: 'dfontaine@acmeconst.com', status: 'Active', role: 'Field Supervisor', lastLogin: '2026-02-17 16:30', assignedApps: ['HeavyJob', 'Dispatcher'], company: 'Acme Construction', department: 'Field Ops', phone: '(713) 555-0103' },
  { id: 'u4', name: 'Sandra Kim', email: 'skim@acmeconst.com', status: 'Active', role: 'Estimator', lastLogin: '2026-02-17 14:22', assignedApps: ['HeavyBid'], company: 'Acme Construction', department: 'Estimating', phone: '(713) 555-0104' },
  { id: 'u5', name: 'Troy Castellanos', email: 'tcastellanos@acmeconst.com', status: 'Inactive', role: 'Foreman', lastLogin: '2026-01-15 09:10', assignedApps: ['HeavyJob'], company: 'Acme Construction', department: 'Field Ops', phone: '(713) 555-0105' },
  { id: 'u6', name: 'Leah Okafor', email: 'lokafor@acmeconst.com', status: 'Active', role: 'Safety Manager', lastLogin: '2026-02-18 06:30', assignedApps: ['HeavyJob', 'Safety'], company: 'Acme Construction', department: 'Safety', phone: '(713) 555-0106' },
  { id: 'u7', name: 'Brett Holloway', email: 'bholloway@acmeconst.com', status: 'Pending', role: 'Operator', lastLogin: 'Never', assignedApps: [], company: 'Acme Construction', department: 'Equipment', phone: '(713) 555-0107' },
  { id: 'u8', name: 'Mei-Ling Tran', email: 'mtran@bridgebuilders.com', status: 'Active', role: 'Admin', lastLogin: '2026-02-17 11:45', assignedApps: ['HeavyJob', 'HeavyBid', 'HeavyConnect'], company: 'Bridge Builders Inc', department: 'Administration', phone: '(832) 555-0201' },
  { id: 'u9', name: 'Omar Khalil', email: 'okhalil@bridgebuilders.com', status: 'Active', role: 'Project Manager', lastLogin: '2026-02-16 15:20', assignedApps: ['HeavyJob', 'Dispatcher'], company: 'Bridge Builders Inc', department: 'Project Management', phone: '(832) 555-0202' },
  { id: 'u10', name: 'Jessica Ruiz', email: 'jruiz@bridgebuilders.com', status: 'Active', role: 'Payroll Admin', lastLogin: '2026-02-15 08:00', assignedApps: ['HeavyJob'], company: 'Bridge Builders Inc', department: 'HR', phone: '(832) 555-0203' },
  { id: 'u11', name: 'Carl Dumont', email: 'cdumont@bridgebuilders.com', status: 'Inactive', role: 'Estimator', lastLogin: '2025-12-01 10:30', assignedApps: ['HeavyBid'], company: 'Bridge Builders Inc', department: 'Estimating', phone: '(832) 555-0204' },
  { id: 'u12', name: 'Aisha Thornton', email: 'athornton@skylinedev.com', status: 'Active', role: 'Super Admin', lastLogin: '2026-02-18 09:05', assignedApps: ['HeavyJob', 'HeavyBid', 'HeavyConnect', 'Dispatcher', 'Safety'], company: 'Skyline Development', department: 'IT', phone: '(281) 555-0301' },
  { id: 'u13', name: 'Ricardo Flores', email: 'rflores@skylinedev.com', status: 'Active', role: 'Field Supervisor', lastLogin: '2026-02-17 07:15', assignedApps: ['HeavyJob', 'Dispatcher'], company: 'Skyline Development', department: 'Field Ops', phone: '(281) 555-0302' },
  { id: 'u14', name: 'Natalie Chen', email: 'nchen@skylinedev.com', status: 'Active', role: 'Project Manager', lastLogin: '2026-02-18 08:20', assignedApps: ['HeavyJob', 'HeavyBid'], company: 'Skyline Development', department: 'Operations', phone: '(281) 555-0303' },
  { id: 'u15', name: 'Derrick Pham', email: 'dpham@skylinedev.com', status: 'Pending', role: 'Operator', lastLogin: 'Never', assignedApps: [], company: 'Skyline Development', department: 'Equipment', phone: '(281) 555-0304' },
  { id: 'u16', name: 'Gloria Mendez', email: 'gmendez@skylinedev.com', status: 'Active', role: 'Estimator', lastLogin: '2026-02-14 13:40', assignedApps: ['HeavyBid', 'HeavyJob'], company: 'Skyline Development', department: 'Estimating', phone: '(281) 555-0305' },
  { id: 'u17', name: 'Kevin O\'Brien', email: 'kobrien@skylinedev.com', status: 'Active', role: 'Foreman', lastLogin: '2026-02-17 05:45', assignedApps: ['HeavyJob'], company: 'Skyline Development', department: 'Field Ops', phone: '(281) 555-0306' },
  { id: 'u18', name: 'Samantha Grant', email: 'sgrant@acmeconst.com', status: 'Active', role: 'Safety Manager', lastLogin: '2026-02-18 07:30', assignedApps: ['Safety', 'HeavyJob'], company: 'Acme Construction', department: 'Safety', phone: '(713) 555-0108' },
  { id: 'u19', name: 'Tom Barker', email: 'tbarker@bridgebuilders.com', status: 'Active', role: 'Admin', lastLogin: '2026-02-16 16:00', assignedApps: ['HeavyJob', 'HeavyConnect'], company: 'Bridge Builders Inc', department: 'Administration', phone: '(832) 555-0205' },
  { id: 'u20', name: 'Ingrid Larsson', email: 'ilarsson@skylinedev.com', status: 'Inactive', role: 'Payroll Admin', lastLogin: '2025-11-20 09:00', assignedApps: [], company: 'Skyline Development', department: 'HR', phone: '(281) 555-0307' },
]

export const groups: Group[] = [
  { id: 'g1', name: 'Field Operations', memberCount: 8, rolesAssigned: ['Field Supervisor', 'Foreman', 'Operator'], createdDate: '2024-03-15', description: 'All field-based personnel with access to HeavyJob and Dispatcher', members: ['u3', 'u5', 'u9', 'u13', 'u17', 'u15', 'u6', 'u16'] },
  { id: 'g2', name: 'Estimating Team', memberCount: 4, rolesAssigned: ['Estimator', 'Project Manager'], createdDate: '2024-04-02', description: 'Estimators and PMs with HeavyBid access and bidding permissions', members: ['u4', 'u11', 'u14', 'u16'] },
  { id: 'g3', name: 'Administrators', memberCount: 4, rolesAssigned: ['Super Admin', 'Admin'], createdDate: '2024-01-10', description: 'Company and system administrators with full platform access', members: ['u1', 'u8', 'u12', 'u19'] },
  { id: 'g4', name: 'Safety & Compliance', memberCount: 3, rolesAssigned: ['Safety Manager'], createdDate: '2024-06-18', description: 'Safety managers responsible for incident reporting and compliance', members: ['u6', 'u18', 'u12'] },
  { id: 'g5', name: 'Project Management', memberCount: 5, rolesAssigned: ['Project Manager', 'Admin'], createdDate: '2024-05-22', description: 'Project managers across all companies with full job visibility', members: ['u2', 'u9', 'u14', 'u8', 'u19'] },
]

export const roles: Role[] = [
  {
    id: 'r1', name: 'Super Admin', permissionCount: 48, description: 'Full platform access across all modules', assignedUsers: 2,
    permissions: {
      HeavyJob: { View: true, Edit: true, Delete: true, Approve: true, Admin: true },
      HeavyBid: { View: true, Edit: true, Delete: true, Approve: true, Admin: true },
      HeavyConnect: { View: true, Edit: true, Delete: true, Approve: true, Admin: true },
      Dispatcher: { View: true, Edit: true, Delete: true, Approve: true, Admin: true },
      Safety: { View: true, Edit: true, Delete: true, Approve: true, Admin: true },
      Billing: { View: true, Edit: true, Delete: true, Approve: true, Admin: true },
    },
  },
  {
    id: 'r2', name: 'Admin', permissionCount: 32, description: 'Administrative access without system-level settings', assignedUsers: 3,
    permissions: {
      HeavyJob: { View: true, Edit: true, Delete: true, Approve: true, Admin: false },
      HeavyBid: { View: true, Edit: true, Delete: false, Approve: true, Admin: false },
      HeavyConnect: { View: true, Edit: true, Delete: false, Approve: false, Admin: false },
      Dispatcher: { View: true, Edit: true, Delete: true, Approve: false, Admin: false },
      Safety: { View: true, Edit: true, Delete: false, Approve: true, Admin: false },
      Billing: { View: true, Edit: false, Delete: false, Approve: false, Admin: false },
    },
  },
  {
    id: 'r3', name: 'Project Manager', permissionCount: 24, description: 'Full project visibility and editing rights', assignedUsers: 4,
    permissions: {
      HeavyJob: { View: true, Edit: true, Delete: false, Approve: true, Admin: false },
      HeavyBid: { View: true, Edit: true, Delete: false, Approve: false, Admin: false },
      HeavyConnect: { View: true, Edit: false, Delete: false, Approve: false, Admin: false },
      Dispatcher: { View: true, Edit: false, Delete: false, Approve: false, Admin: false },
      Safety: { View: true, Edit: false, Delete: false, Approve: false, Admin: false },
      Billing: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
    },
  },
  {
    id: 'r4', name: 'Field Supervisor', permissionCount: 16, description: 'Field data entry and crew management', assignedUsers: 3,
    permissions: {
      HeavyJob: { View: true, Edit: true, Delete: false, Approve: false, Admin: false },
      HeavyBid: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      HeavyConnect: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      Dispatcher: { View: true, Edit: true, Delete: false, Approve: false, Admin: false },
      Safety: { View: true, Edit: true, Delete: false, Approve: false, Admin: false },
      Billing: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
    },
  },
  {
    id: 'r5', name: 'Estimator', permissionCount: 12, description: 'Bid creation and estimation access', assignedUsers: 4,
    permissions: {
      HeavyJob: { View: true, Edit: false, Delete: false, Approve: false, Admin: false },
      HeavyBid: { View: true, Edit: true, Delete: false, Approve: false, Admin: false },
      HeavyConnect: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      Dispatcher: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      Safety: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      Billing: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
    },
  },
  {
    id: 'r6', name: 'Foreman', permissionCount: 10, description: 'Daily production entry and crew oversight', assignedUsers: 2,
    permissions: {
      HeavyJob: { View: true, Edit: true, Delete: false, Approve: false, Admin: false },
      HeavyBid: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      HeavyConnect: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      Dispatcher: { View: true, Edit: false, Delete: false, Approve: false, Admin: false },
      Safety: { View: true, Edit: true, Delete: false, Approve: false, Admin: false },
      Billing: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
    },
  },
  {
    id: 'r7', name: 'Safety Manager', permissionCount: 14, description: 'Incident reporting, safety audits, compliance tracking', assignedUsers: 3,
    permissions: {
      HeavyJob: { View: true, Edit: false, Delete: false, Approve: false, Admin: false },
      HeavyBid: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      HeavyConnect: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      Dispatcher: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      Safety: { View: true, Edit: true, Delete: true, Approve: true, Admin: false },
      Billing: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
    },
  },
  {
    id: 'r8', name: 'Operator', permissionCount: 4, description: 'Mobile app access for time and production entry only', assignedUsers: 3,
    permissions: {
      HeavyJob: { View: true, Edit: true, Delete: false, Approve: false, Admin: false },
      HeavyBid: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      HeavyConnect: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      Dispatcher: { View: true, Edit: false, Delete: false, Approve: false, Admin: false },
      Safety: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      Billing: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
    },
  },
]

export const policies: Policy[] = [
  { id: 'p1', name: 'MFA Required — Admin Roles', description: 'Enforces multi-factor authentication for all users with Admin or Super Admin roles.', assignedGroups: ['Administrators'], assignedUsers: [], conditions: 'Role in [Super Admin, Admin] AND Login from any device', status: 'Active' },
  { id: 'p2', name: 'SSO Only — Enterprise Users', description: 'Restricts login to SSO provider only; password login disabled for enterprise accounts.', assignedGroups: ['Administrators', 'Project Management'], assignedUsers: [], conditions: 'Company is Enterprise tier AND Login method ≠ SSO → deny', status: 'Active' },
  { id: 'p3', name: 'Read-Only After 90 Days Inactive', description: 'Automatically revokes edit permissions for users who have not logged in within 90 days.', assignedGroups: [], assignedUsers: ['u5', 'u11', 'u20'], conditions: 'LastLogin > 90 days ago → permissions.Edit = false', status: 'Active' },
  { id: 'p4', name: 'Data Export Restriction', description: 'Prevents bulk data exports for non-admin roles. Export buttons hidden and API endpoints blocked.', assignedGroups: ['Field Operations', 'Estimating Team'], assignedUsers: [], conditions: 'Role NOT IN [Admin, Super Admin] → export.disabled = true', status: 'Inactive' },
]
