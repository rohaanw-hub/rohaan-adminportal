import { NavLink, useLocation } from 'react-router-dom'
import {
  Users,
  CreditCard,
  BarChart3,
  Plug,
  Database,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'

const navItems = [
  { label: 'Access Management', path: '/access', icon: Users },
  { label: 'Billing & Subscriptions', path: '/billing', icon: CreditCard },
  { label: 'HCSS Insights', path: '/insights', icon: BarChart3 },
  { label: 'Integrations & APIs', path: '/integrations', icon: Plug },
  { label: 'Setup Data', path: '/setup', icon: Database },
  { label: 'System Settings', path: '/settings', icon: Settings },
]

const setupSubItems = [
  { label: 'Business Units', tab: 'businessUnits' },
  { label: 'Employees', tab: 'employees' },
  { label: 'Assets', tab: 'assets' },
  { label: 'Jobs', tab: 'jobs' },
  { label: 'Locations', tab: 'locations' },
  { label: 'Materials', tab: 'materials' },
  { label: 'Cost Structures', tab: 'costStructures' },
  { label: 'Co. Defaults', tab: 'companyDefaults' },
]

export function Sidebar() {
  const location = useLocation()
  const isSetupActive = location.pathname === '/setup'
  const activeTab = new URLSearchParams(location.search).get('tab') ?? 'employees'

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col bg-[#0f2137]">
      {/* Logo */}
      <div className="flex h-14 items-center gap-3 px-4 border-b border-white/10">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-amber-500 font-bold text-white text-sm shrink-0">
          HC
        </div>
        <div>
          <div className="text-white font-semibold text-sm leading-tight">HCSS Admin</div>
          <div className="text-white/50 text-xs">Platform Console</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <div className="mb-2 px-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
          Modules
        </div>
        {navItems.map(({ label, path, icon: Icon }) => (
          <div key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors mb-0.5',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{label}</span>
            </NavLink>
            {path === '/setup' && isSetupActive && (
              <div className="ml-3 mb-1">
                {setupSubItems.map(({ label, tab }) => (
                  <NavLink
                    key={tab}
                    to={`/setup?tab=${tab}`}
                    className={cn(
                      'flex items-center rounded-md px-3 py-2 text-sm transition-colors mb-0.5',
                      activeTab === tab
                        ? 'bg-white/10 text-white'
                        : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                    )}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-3 rounded-md px-2 py-2">
          <Avatar initials="MW" size="sm" className="bg-amber-500/20 text-amber-400" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-white truncate">Marcus Webb</div>
            <div className="text-xs text-white/40 truncate">Super Admin</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
