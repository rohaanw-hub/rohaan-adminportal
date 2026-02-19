import { useState } from 'react'
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight,
  Users, UserCircle, Shield, FileText,
  CreditCard, Receipt, Wallet,
  Plug, Key, Webhook, List, AlertCircle, GitMerge,
  UserSquare, Wrench, Package, MapPin, DollarSign, Building, Briefcase, Settings,
  Bell, Globe, Sliders, Building2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type RouteItem = {
  kind: 'route'
  label: string
  icon: React.ElementType
  path: string
  end?: boolean
  highlight?: boolean
}

type TabItem = {
  kind: 'tab'
  label: string
  icon: React.ElementType
  tabValue: string
  isDefault?: boolean
}

type NavItem = RouteItem | TabItem

const accessItems: NavItem[] = [
  { kind: 'route', label: 'Users',    icon: Users,      path: '/access',          end: true },
  { kind: 'route', label: 'Groups',   icon: UserCircle, path: '/access/groups' },
  { kind: 'route', label: 'Roles',    icon: Shield,     path: '/access/roles' },
  { kind: 'route', label: 'Policies', icon: FileText,   path: '/access/policies' },
]

const billingItems: NavItem[] = [
  { kind: 'route', label: 'Overview',       icon: CreditCard, path: '/billing',          end: true },
  { kind: 'route', label: 'Invoices',       icon: Receipt,    path: '/billing/invoices' },
  { kind: 'route', label: 'Payment Method', icon: Wallet,     path: '/billing/payment' },
]

const integrationItems: NavItem[] = [
  { kind: 'route', label: 'Connected Apps',   icon: Plug,        path: '/integrations',                 end: true },
  { kind: 'route', label: 'API Credentials',  icon: Key,         path: '/integrations/credentials' },
  { kind: 'route', label: 'Webhooks',         icon: Webhook,     path: '/integrations/webhooks' },
  { kind: 'route', label: 'Event Logs',       icon: List,        path: '/integrations/event-logs' },
  { kind: 'route', label: 'Error Logs',       icon: AlertCircle, path: '/integrations/error-logs' },
  { kind: 'route', label: 'Field Mapper',     icon: GitMerge,    path: '/integrations/mapper',          highlight: true },
]

const setupItems: NavItem[] = [
  { kind: 'tab', label: 'Employees',      icon: UserSquare, tabValue: 'employees',      isDefault: true },
  { kind: 'tab', label: 'Equipment',      icon: Wrench,     tabValue: 'equipment' },
  { kind: 'tab', label: 'Materials',      icon: Package,    tabValue: 'materials' },
  { kind: 'tab', label: 'Locations',      icon: MapPin,     tabValue: 'locations' },
  { kind: 'tab', label: 'Cost Structures',icon: DollarSign, tabValue: 'costStructures' },
  { kind: 'tab', label: 'Business Units', icon: Building,   tabValue: 'businessUnits' },
  { kind: 'tab', label: 'Jobs',           icon: Briefcase,  tabValue: 'jobs' },
  { kind: 'tab', label: 'Co. Defaults',   icon: Settings,   tabValue: 'companyDefaults' },
]

const settingsItems: NavItem[] = [
  { kind: 'tab', label: 'Notifications',   icon: Bell,      tabValue: 'notifications', isDefault: true },
  { kind: 'tab', label: 'Language & Region',icon: Globe,    tabValue: 'language' },
  { kind: 'tab', label: 'Preferences',     icon: Sliders,   tabValue: 'preferences' },
  { kind: 'tab', label: 'Company Settings',icon: Building2, tabValue: 'company' },
]

const MODULE_ITEMS: Record<string, NavItem[]> = {
  '/access':       accessItems,
  '/billing':      billingItems,
  '/integrations': integrationItems,
  '/setup':        setupItems,
  '/settings':     settingsItems,
}

// Order matters — longer paths must not shadow shorter ones accidentally
const MODULE_KEYS = ['/access', '/billing', '/integrations', '/setup', '/settings']

export function SecondaryNav() {
  const [collapsed, setCollapsed] = useState(false)
  const loc = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const moduleKey = MODULE_KEYS.find(m => loc.pathname.startsWith(m)) ?? ''
  const items = MODULE_ITEMS[moduleKey] ?? []

  if (items.length === 0) return null

  const currentTab = searchParams.get('tab')

  return (
    <aside
      className={cn(
        'sticky top-14 h-[calc(100vh-56px)] flex-shrink-0 flex flex-col bg-white border-r border-gray-200 transition-all duration-200 overflow-y-auto',
        collapsed ? 'w-12' : 'w-52'
      )}
    >
      {/* Collapse toggle */}
      <button
        className="absolute -right-3.5 top-5 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 hover:text-gray-600 shadow-sm transition-colors"
        onClick={() => setCollapsed(p => !p)}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed
          ? <ChevronRight className="h-3.5 w-3.5" />
          : <ChevronLeft className="h-3.5 w-3.5" />
        }
      </button>

      <nav className="flex flex-col gap-0.5 p-2 pt-4">
        {items.map(item => {
          const Icon = item.icon

          if (item.kind === 'route') {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) => cn(
                  'flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors',
                  isActive
                    ? item.highlight
                      ? 'bg-purple-50 text-purple-700 font-medium'
                      : 'bg-blue-50 text-blue-700 font-medium'
                    : item.highlight
                      ? 'text-purple-500 hover:bg-purple-50 hover:text-purple-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            )
          }

          // Tab item — uses search params, not route matching
          const isActive = item.isDefault
            ? !currentTab || currentTab === item.tabValue
            : currentTab === item.tabValue

          return (
            <button
              key={item.tabValue}
              className={cn(
                'flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors w-full text-left',
                isActive
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
              onClick={() => navigate(`${moduleKey}?tab=${item.tabValue}`)}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
