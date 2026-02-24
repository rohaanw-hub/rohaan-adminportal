import { User, Group, Role, Policy } from '@/types'

export const users: User[] = [
  { id: 'u1',  name: 'Marcus Webb',       email: 'mwebb@acmeconst.com',         status: 'Active',   role: 'Super Admin',      lastLogin: '2026-02-18 08:42', assignedApps: ['Estimating', 'Quotes', 'Pre-Construction', 'Desktop', 'Manager', 'Safety', 'Skills', 'Forms', 'Docs & Plans', 'myField', 'Resource Planner', 'Telematics', 'Maintenance', 'Chats', 'Copilot', 'Additional Access'], company: 'Acme Construction',    department: 'IT',                  phone: '(713) 555-0101', userId: 'mwebb',        jobTitle: 'System Administrator',         businessUnitAccess: ['GCO', 'NTD', 'STD', 'CTO', 'FPG'], homeBusinessUnit: 'GCO', jobAccess: 'All',                                   employeeCode: 'E-001' },
  { id: 'u2',  name: 'Priya Nair',        email: 'pnair@acmeconst.com',          status: 'Active',   role: 'Project Manager',  lastLogin: '2026-02-18 07:55', assignedApps: ['Manager', 'Safety', 'Estimating', 'Quotes', 'Pre-Construction', 'Chats'],                                                                                                                                              company: 'Acme Construction',    department: 'Operations',          phone: '(713) 555-0102', userId: 'pnair',        jobTitle: 'Senior Project Manager',       businessUnitAccess: ['GCO', 'CTO'],                       homeBusinessUnit: 'GCO', jobAccess: 'All',                                   employeeCode: 'E-002' },
  { id: 'u3',  name: 'Dale Fontaine',     email: 'dfontaine@acmeconst.com',      status: 'Active',   role: 'Field Supervisor', lastLogin: '2026-02-17 16:30', assignedApps: ['Manager', 'Safety', 'myField', 'Resource Planner'],                                                                                                                                                                   company: 'Acme Construction',    department: 'Field Ops',           phone: '(713) 555-0103', userId: 'dfontaine',    jobTitle: 'Field Operations Supervisor',  businessUnitAccess: ['GCO'],                              homeBusinessUnit: 'GCO', jobAccess: 'All',                                   employeeCode: 'E-003' },
  { id: 'u4',  name: 'Sandra Kim',        email: 'skim@acmeconst.com',           status: 'Active',   role: 'Estimator',        lastLogin: '2026-02-17 14:22', assignedApps: ['Estimating', 'Quotes', 'Pre-Construction', 'Desktop'],                                                                                                                                                                company: 'Acme Construction',    department: 'Estimating',          phone: '(713) 555-0104', userId: 'skim',         jobTitle: 'Senior Estimator',             businessUnitAccess: ['GCO'],                              homeBusinessUnit: 'GCO', jobAccess: 'All',                                   employeeCode: 'E-004' },
  { id: 'u5',  name: 'Troy Castellanos',  email: 'tcastellanos@acmeconst.com',   status: 'Inactive', role: 'Foreman',          lastLogin: '2026-01-15 09:10', assignedApps: ['Manager', 'myField'],                                                                                                                                                                                                company: 'Acme Construction',    department: 'Field Ops',           phone: '(713) 555-0105', userId: 'tcastellanos', jobTitle: 'Construction Foreman',         businessUnitAccess: ['GCO'],                              homeBusinessUnit: 'GCO', jobAccess: ['J-2024-087'],                          employeeCode: 'E-005' },
  { id: 'u6',  name: 'Leah Okafor',       email: 'lokafor@acmeconst.com',        status: 'Active',   role: 'Safety Manager',   lastLogin: '2026-02-18 06:30', assignedApps: ['Manager', 'Safety', 'Telematics'],                                                                                                                                                                                   company: 'Acme Construction',    department: 'Safety',              phone: '(713) 555-0106', userId: 'lokafor',      jobTitle: 'Safety & Compliance Manager',  businessUnitAccess: ['GCO'],                              homeBusinessUnit: 'GCO', jobAccess: 'All',                                   employeeCode: 'E-006' },
  { id: 'u7',  name: 'Brett Holloway',    email: 'bholloway@acmeconst.com',      status: 'Pending',  role: 'Operator',         lastLogin: 'Never',            assignedApps: [],                                                                                                                                                                                                                    company: 'Acme Construction',    department: 'Equipment',           phone: '(713) 555-0107', userId: 'bholloway',    jobTitle: 'Equipment Operator',           businessUnitAccess: ['GCO'],                              homeBusinessUnit: 'GCO', jobAccess: ['J-2024-092', 'J-2024-101'],             employeeCode: 'E-007' },
  { id: 'u8',  name: 'Mei-Ling Tran',     email: 'mtran@bridgebuilders.com',     status: 'Active',   role: 'Admin',            lastLogin: '2026-02-17 11:45', assignedApps: ['Manager', 'Safety', 'Estimating', 'Quotes', 'Pre-Construction', 'Chats', 'Copilot', 'Additional Access'],                                                                                                             company: 'Bridge Builders Inc',  department: 'Administration',      phone: '(832) 555-0201', userId: 'mtran',        jobTitle: 'Platform Administrator',       businessUnitAccess: ['GCO', 'NTD'],                       homeBusinessUnit: 'NTD', jobAccess: 'All' },
  { id: 'u9',  name: 'Omar Khalil',       email: 'okhalil@bridgebuilders.com',   status: 'Active',   role: 'Project Manager',  lastLogin: '2026-02-16 15:20', assignedApps: ['Manager', 'Safety', 'Estimating', 'Quotes', 'Pre-Construction', 'Chats'],                                                                                                                                              company: 'Bridge Builders Inc',  department: 'Project Management',  phone: '(832) 555-0202', userId: 'okhalil',      jobTitle: 'Senior Project Manager',       businessUnitAccess: ['NTD'],                              homeBusinessUnit: 'NTD', jobAccess: 'All' },
  { id: 'u10', name: 'Jessica Ruiz',      email: 'jruiz@bridgebuilders.com',     status: 'Active',   role: 'Payroll Admin',    lastLogin: '2026-02-15 08:00', assignedApps: ['Manager'],                                                                                                                                                                                                           company: 'Bridge Builders Inc',  department: 'HR',                  phone: '(832) 555-0203', userId: 'jruiz',        jobTitle: 'Payroll Administrator',        businessUnitAccess: ['NTD'],                              homeBusinessUnit: 'NTD', jobAccess: 'All' },
  { id: 'u11', name: 'Carl Dumont',       email: 'cdumont@bridgebuilders.com',   status: 'Inactive', role: 'Estimator',        lastLogin: '2025-12-01 10:30', assignedApps: ['Estimating', 'Quotes', 'Pre-Construction', 'Desktop'],                                                                                                                                                                company: 'Bridge Builders Inc',  department: 'Estimating',          phone: '(832) 555-0204', userId: 'cdumont',      jobTitle: 'Estimator',                    businessUnitAccess: ['NTD'],                              homeBusinessUnit: 'NTD', jobAccess: ['J-2025-041', 'J-2025-055'] },
  { id: 'u12', name: 'Aisha Thornton',    email: 'athornton@skylinedev.com',     status: 'Active',   role: 'Super Admin',      lastLogin: '2026-02-18 09:05', assignedApps: ['Estimating', 'Quotes', 'Pre-Construction', 'Desktop', 'Manager', 'Safety', 'Skills', 'Forms', 'Docs & Plans', 'myField', 'Resource Planner', 'Telematics', 'Maintenance', 'Chats', 'Copilot', 'Additional Access'], company: 'Skyline Development',  department: 'IT',                  phone: '(281) 555-0301', userId: 'athornton',    jobTitle: 'System Administrator',         businessUnitAccess: ['GCO', 'NTD', 'STD', 'CTO', 'FPG'], homeBusinessUnit: 'STD', jobAccess: 'All' },
  { id: 'u13', name: 'Ricardo Flores',    email: 'rflores@skylinedev.com',       status: 'Active',   role: 'Field Supervisor', lastLogin: '2026-02-17 07:15', assignedApps: ['Manager', 'Safety', 'myField', 'Resource Planner'],                                                                                                                                                                   company: 'Skyline Development',  department: 'Field Ops',           phone: '(281) 555-0302', userId: 'rflores',      jobTitle: 'Field Operations Supervisor',  businessUnitAccess: ['STD'],                              homeBusinessUnit: 'STD', jobAccess: 'All' },
  { id: 'u14', name: 'Natalie Chen',      email: 'nchen@skylinedev.com',         status: 'Active',   role: 'Project Manager',  lastLogin: '2026-02-18 08:20', assignedApps: ['Manager', 'Safety', 'Estimating', 'Quotes', 'Pre-Construction', 'Chats'],                                                                                                                                              company: 'Skyline Development',  department: 'Operations',          phone: '(281) 555-0303', userId: 'nchen',        jobTitle: 'Senior Project Manager',       businessUnitAccess: ['STD'],                              homeBusinessUnit: 'STD', jobAccess: 'All' },
  { id: 'u15', name: 'Derrick Pham',      email: 'dpham@skylinedev.com',         status: 'Pending',  role: 'Operator',         lastLogin: 'Never',            assignedApps: [],                                                                                                                                                                                                                    company: 'Skyline Development',  department: 'Equipment',           phone: '(281) 555-0304', userId: 'dpham',        jobTitle: 'Equipment Operator',           businessUnitAccess: ['STD'],                              homeBusinessUnit: 'STD', jobAccess: ['J-2025-014'] },
  { id: 'u16', name: 'Gloria Mendez',     email: 'gmendez@skylinedev.com',       status: 'Active',   role: 'Estimator',        lastLogin: '2026-02-14 13:40', assignedApps: ['Estimating', 'Quotes', 'Pre-Construction', 'Desktop', 'Manager'],                                                                                                                                                     company: 'Skyline Development',  department: 'Estimating',          phone: '(281) 555-0305', userId: 'gmendez',      jobTitle: 'Senior Estimator',             businessUnitAccess: ['STD'],                              homeBusinessUnit: 'STD', jobAccess: 'All',                                   employeeCode: 'E-010' },
  { id: 'u17', name: "Kevin O'Brien",     email: 'kobrien@skylinedev.com',       status: 'Active',   role: 'Foreman',          lastLogin: '2026-02-17 05:45', assignedApps: ['Manager', 'myField'],                                                                                                                                                                                                company: 'Skyline Development',  department: 'Field Ops',           phone: '(281) 555-0306', userId: 'kobrien',      jobTitle: 'Construction Foreman',         businessUnitAccess: ['STD'],                              homeBusinessUnit: 'STD', jobAccess: ['J-2025-028', 'J-2025-014'],             employeeCode: 'E-009' },
  { id: 'u18', name: 'Samantha Grant',    email: 'sgrant@acmeconst.com',         status: 'Active',   role: 'Safety Manager',   lastLogin: '2026-02-18 07:30', assignedApps: ['Manager', 'Safety'],                                                                                                                                                                                                 company: 'Acme Construction',    department: 'Safety',              phone: '(713) 555-0108', userId: 'sgrant',       jobTitle: 'Safety & Compliance Manager',  businessUnitAccess: ['GCO'],                              homeBusinessUnit: 'GCO', jobAccess: 'All',                                   employeeCode: 'E-008' },
  { id: 'u19', name: 'Tom Barker',        email: 'tbarker@bridgebuilders.com',   status: 'Active',   role: 'Admin',            lastLogin: '2026-02-16 16:00', assignedApps: ['Manager', 'Safety', 'Chats', 'Copilot'],                                                                                                                                                                              company: 'Bridge Builders Inc',  department: 'Administration',      phone: '(832) 555-0205', userId: 'tbarker',      jobTitle: 'Platform Administrator',       businessUnitAccess: ['NTD', 'FPG'],                       homeBusinessUnit: 'NTD', jobAccess: 'All' },
  { id: 'u20', name: 'Ingrid Larsson',    email: 'ilarsson@skylinedev.com',      status: 'Inactive', role: 'Payroll Admin',    lastLogin: '2025-11-20 09:00', assignedApps: [],                                                                                                                                                                                                                    company: 'Skyline Development',  department: 'HR',                  phone: '(281) 555-0307', userId: 'ilarsson',     jobTitle: 'Payroll Administrator',        businessUnitAccess: ['STD'],                              homeBusinessUnit: 'STD', jobAccess: 'All' },
]

export const groups: Group[] = [
  { id: 'g1', name: 'Field Operations', memberCount: 8, rolesAssigned: ['Field Supervisor', 'Foreman', 'Operator'], createdDate: '2024-03-15', description: 'All field-based personnel with access to HeavyJob Manager, myField, and Fleet products', members: ['u3', 'u5', 'u9', 'u13', 'u17', 'u15', 'u6', 'u16'] },
  { id: 'g2', name: 'Estimating Team', memberCount: 4, rolesAssigned: ['Estimator', 'Project Manager'], createdDate: '2024-04-02', description: 'Estimators and PMs with HeavyBid Estimating, Quotes, and Pre-Construction access', members: ['u4', 'u11', 'u14', 'u16'] },
  { id: 'g3', name: 'Administrators', memberCount: 4, rolesAssigned: ['Super Admin', 'Admin'], createdDate: '2024-01-10', description: 'Company and system administrators with full platform access', members: ['u1', 'u8', 'u12', 'u19'] },
  { id: 'g4', name: 'Safety & Compliance', memberCount: 3, rolesAssigned: ['Safety Manager'], createdDate: '2024-06-18', description: 'Safety managers responsible for incident reporting and compliance', members: ['u6', 'u18', 'u12'] },
  { id: 'g5', name: 'Project Management', memberCount: 5, rolesAssigned: ['Project Manager', 'Admin'], createdDate: '2024-05-22', description: 'Project managers across all companies with full job visibility', members: ['u2', 'u9', 'u14', 'u8', 'u19'] },
]

export const roles: Role[] = [
  {
    id: 'r1', name: 'Super Admin', permissionCount: 20, description: 'Full platform access across all modules', assignedUsers: 2,
    permissions: {
      HeavyBid: { View: true, Edit: true, Delete: true, Approve: true, Admin: true },
      HeavyJob:  { View: true, Edit: true, Delete: true, Approve: true, Admin: true },
      Fleet:     { View: true, Edit: true, Delete: true, Approve: true, Admin: true },
      Platform:  { View: true, Edit: true, Delete: true, Approve: true, Admin: true },
    },
  },
  {
    id: 'r2', name: 'Admin', permissionCount: 16, description: 'Administrative access without system-level settings', assignedUsers: 3,
    permissions: {
      HeavyBid: { View: true, Edit: true, Delete: false, Approve: true, Admin: false },
      HeavyJob:  { View: true, Edit: true, Delete: true, Approve: true, Admin: false },
      Fleet:     { View: true, Edit: false, Delete: false, Approve: false, Admin: false },
      Platform:  { View: true, Edit: true, Delete: false, Approve: false, Admin: false },
    },
  },
  {
    id: 'r3', name: 'Project Manager', permissionCount: 12, description: 'Full project visibility and editing rights', assignedUsers: 4,
    permissions: {
      HeavyBid: { View: true, Edit: true, Delete: false, Approve: false, Admin: false },
      HeavyJob:  { View: true, Edit: true, Delete: false, Approve: true, Admin: false },
      Fleet:     { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      Platform:  { View: true, Edit: false, Delete: false, Approve: false, Admin: false },
    },
  },
  {
    id: 'r4', name: 'Field Supervisor', permissionCount: 8, description: 'Field data entry and crew management', assignedUsers: 3,
    permissions: {
      HeavyBid: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      HeavyJob:  { View: true, Edit: true, Delete: false, Approve: false, Admin: false },
      Fleet:     { View: true, Edit: false, Delete: false, Approve: false, Admin: false },
      Platform:  { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
    },
  },
  {
    id: 'r5', name: 'Estimator', permissionCount: 6, description: 'Bid creation and estimation access', assignedUsers: 4,
    permissions: {
      HeavyBid: { View: true, Edit: true, Delete: false, Approve: false, Admin: false },
      HeavyJob:  { View: true, Edit: false, Delete: false, Approve: false, Admin: false },
      Fleet:     { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      Platform:  { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
    },
  },
  {
    id: 'r6', name: 'Foreman', permissionCount: 5, description: 'Daily production entry and crew oversight', assignedUsers: 2,
    permissions: {
      HeavyBid: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      HeavyJob:  { View: true, Edit: true, Delete: false, Approve: false, Admin: false },
      Fleet:     { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      Platform:  { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
    },
  },
  {
    id: 'r7', name: 'Safety Manager', permissionCount: 7, description: 'Incident reporting, safety audits, compliance tracking', assignedUsers: 3,
    permissions: {
      HeavyBid: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      HeavyJob:  { View: true, Edit: true, Delete: true, Approve: true, Admin: false },
      Fleet:     { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      Platform:  { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
    },
  },
  {
    id: 'r8', name: 'Operator', permissionCount: 3, description: 'Mobile app access for time and production entry only', assignedUsers: 3,
    permissions: {
      HeavyBid: { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
      HeavyJob:  { View: true, Edit: true, Delete: false, Approve: false, Admin: false },
      Fleet:     { View: true, Edit: false, Delete: false, Approve: false, Admin: false },
      Platform:  { View: false, Edit: false, Delete: false, Approve: false, Admin: false },
    },
  },
]

export const policies: Policy[] = [
  { id: 'p1', name: 'MFA Required — Admin Roles', description: 'Enforces multi-factor authentication for all users with Admin or Super Admin roles.', assignedGroups: ['Administrators'], assignedUsers: [], conditions: 'Role in [Super Admin, Admin] AND Login from any device', status: 'Active' },
  { id: 'p2', name: 'SSO Only — Enterprise Users', description: 'Restricts login to SSO provider only; password login disabled for enterprise accounts.', assignedGroups: ['Administrators', 'Project Management'], assignedUsers: [], conditions: 'Company is Enterprise tier AND Login method ≠ SSO → deny', status: 'Active' },
  { id: 'p3', name: 'Read-Only After 90 Days Inactive', description: 'Automatically revokes edit permissions for users who have not logged in within 90 days.', assignedGroups: [], assignedUsers: ['u5', 'u11', 'u20'], conditions: 'LastLogin > 90 days ago → permissions.Edit = false', status: 'Active' },
  { id: 'p4', name: 'Data Export Restriction', description: 'Prevents bulk data exports for non-admin roles. Export buttons hidden and API endpoints blocked.', assignedGroups: ['Field Operations', 'Estimating Team'], assignedUsers: [], conditions: 'Role NOT IN [Admin, Super Admin] → export.disabled = true', status: 'Inactive' },
]
