// ── Access Management ──────────────────────────────────────────────

export type UserStatus = 'Active' | 'Inactive' | 'Pending'
export type AppName = 'HeavyJob' | 'HeavyBid' | 'HeavyConnect' | 'Dispatcher' | 'telematics' | 'Safety'

export interface User {
  id: string
  name: string
  email: string
  status: UserStatus
  role: string
  lastLogin: string
  assignedApps: AppName[]
  company: string
  department: string
  phone: string
  avatar?: string
}

export interface Group {
  id: string
  name: string
  memberCount: number
  rolesAssigned: string[]
  createdDate: string
  description: string
  members: string[]
}

export interface Role {
  id: string
  name: string
  permissionCount: number
  description: string
  assignedUsers: number
  permissions: Record<string, Record<string, boolean>>
}

export interface Policy {
  id: string
  name: string
  description: string
  assignedGroups: string[]
  assignedUsers: string[]
  conditions: string
  status: 'Active' | 'Inactive'
}

// ── Billing ───────────────────────────────────────────────────────

export type PlanTier = 'Starter' | 'Professional' | 'Enterprise'
export type InvoiceStatus = 'Paid' | 'Due' | 'Failed' | 'Processing'

export interface ProductSubscription {
  id: string
  name: AppName
  tier: PlanTier
  seatsUsed: number
  seatsLicensed: number
  unitPrice: number
  renewalDate: string
}

export interface Invoice {
  id: string
  number: string
  date: string
  amount: number
  status: InvoiceStatus
  items: { description: string; qty: number; unitPrice: number }[]
}

export interface PaymentMethod {
  last4: string
  brand: string
  expMonth: number
  expYear: number
  billingName: string
  billingEmail: string
  billingAddress: string
}

// ── Insights ──────────────────────────────────────────────────────

export interface Report {
  id: string
  name: string
  folder: string
  lastRefreshed: string
  sharedWithGroups: string[]
  description: string
}

// ── Integrations ──────────────────────────────────────────────────

export type IntegrationStatus = 'Connected' | 'Disconnected' | 'Error'
export type IntegrationCategory = 'ERP' | 'HR' | 'CRM' | 'Telematics' | 'Payroll' | 'Project Management'

export interface Integration {
  id: string
  name: string
  category: IntegrationCategory
  status: IntegrationStatus
  lastSync: string
  description: string
  logo: string
}

export interface ApiCredential {
  id: string
  name: string
  clientId: string
  created: string
  lastUsed: string
  scopes: string[]
  status: 'Active' | 'Revoked'
}

export interface Webhook {
  id: string
  endpoint: string
  events: string[]
  status: 'Active' | 'Failing' | 'Paused'
  lastTriggered: string
  secretMasked: string
}

export interface EventLog {
  id: string
  timestamp: string
  integration: string
  eventType: string
  entity: string
  status: 'Success' | 'Warning' | 'Error'
  details: string
}

// ── Setup Data ────────────────────────────────────────────────────

export type EmployeeStatus = 'Active' | 'Inactive' | 'On Leave'

export interface Employee {
  id: string
  name: string
  title: string
  department: string
  status: EmployeeStatus
  hireDate: string
  assignedApps: AppName[]
}

export interface Equipment {
  assetId: string
  name: string
  type: string
  category: string
  status: 'Active' | 'In Maintenance' | 'Retired'
  location: string
  year: number
  operator: string
}

export interface Material {
  code: string
  description: string
  unit: string
  unitCost: number
  category: string
  lastUpdated: string
}

export interface Location {
  code: string
  name: string
  type: 'Yard' | 'Job Site' | 'Office'
  address: string
  region: string
}

export interface CostStructure {
  code: string
  description: string
  type: 'Labor' | 'Equipment' | 'Material' | 'Subcontract'
  rate: number
}

export interface BusinessUnit {
  name: string
  code: string
  region: string
  manager: string
  projectsCount: number
}

export interface Job {
  jobNumber: string
  name: string
  client: string
  status: 'Active' | 'Completed' | 'On Hold' | 'Bidding'
  startDate: string
  contractValue: number
}
