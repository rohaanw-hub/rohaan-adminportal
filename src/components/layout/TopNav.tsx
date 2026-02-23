import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'

const modules = [
  { label: 'Access Management',    path: '/access' },
  { label: 'Billing & Subscriptions', path: '/billing' },
  { label: 'Insights',             path: '/insights' },
  { label: 'Integrations & APIs',  path: '/integrations' },
  { label: 'Setup Data',           path: '/setup' },
  { label: 'System Settings',      path: '/settings' },
]

const companies = ['Acme Construction', 'Bridge Builders Inc', 'Skyline Development']

function HcssLogo() {
  return (
    <img
      src="/hcss-logo.png"
      alt="HCSS"
      className="h-8 w-auto"
    />
  )
}

export function TopNav({ onAiOpen }: { onAiOpen: () => void }) {
  const [company, setCompany] = useState('Acme Construction')
  const [showCompany, setShowCompany] = useState(false)
  const [showUser, setShowUser] = useState(false)

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-30 flex h-14 items-center bg-white border-b border-gray-200 px-4 gap-3">
        {/* Logo + Platform switcher */}
        <div className="flex items-center gap-2.5 shrink-0">
          <HcssLogo />
          <div className="relative">
            <button
              className="flex items-center gap-1 text-gray-800 font-semibold text-sm hover:text-gray-600 transition-colors"
              onClick={() => { setShowCompany(p => !p); setShowUser(false) }}
            >
              Platform
              <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
            </button>
            {showCompany && (
              <div className="absolute left-0 top-full mt-2 w-60 rounded-lg border border-gray-200 bg-white shadow-lg z-50 py-1">
                <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Switch Company
                </div>
                {companies.map(c => (
                  <button
                    key={c}
                    className={cn(
                      'w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between transition-colors',
                      c === company ? 'font-medium text-blue-600' : 'text-gray-700'
                    )}
                    onClick={() => { setCompany(c); setShowCompany(false) }}
                  >
                    {c}
                    {c === company && <span className="text-blue-500 text-xs">✓</span>}
                  </button>
                ))}
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 transition-colors">
                    Manage companies…
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-gray-200 shrink-0" />

        {/* Module nav links */}
        <nav className="flex items-center gap-0.5 overflow-x-auto">
          {modules.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => cn(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1 min-w-0" />

        {/* AI Search bar */}
        <button
          className="flex items-center gap-2 w-64 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-400 hover:border-blue-300 hover:bg-white hover:shadow-sm transition-all text-left shrink-0"
          onClick={onAiOpen}
        >
          <Sparkles className="h-4 w-4 text-blue-500 shrink-0" />
          <span className="flex-1">Find or ask anything...</span>
          <kbd className="text-xs bg-white border border-gray-200 rounded px-1.5 py-0.5 text-gray-400 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Help */}
        <button className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0">
          <HelpCircle className="h-5 w-5" />
        </button>

        {/* User menu */}
        <div className="relative shrink-0">
          <button
            className="flex items-center gap-1.5 rounded-md p-1 hover:bg-gray-100 transition-colors"
            onClick={() => { setShowUser(p => !p); setShowCompany(false) }}
          >
            <Avatar initials="MW" size="sm" />
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>
          {showUser && (
            <div className="absolute right-0 top-full mt-2 w-52 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="text-sm font-semibold text-gray-900">Marcus Webb</div>
                <div className="text-xs text-gray-500 mt-0.5">mwebb@acmeconst.com</div>
                <div className="mt-1.5">
                  <span className="text-xs bg-blue-100 text-blue-700 rounded px-1.5 py-0.5 font-medium">
                    Super Admin
                  </span>
                </div>
              </div>
              <div className="py-1">
                {['Profile Settings', 'Appearance', 'Keyboard Shortcuts'].map(item => (
                  <button
                    key={item}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-100 py-1">
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Click-outside overlay */}
      {(showCompany || showUser) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setShowCompany(false); setShowUser(false) }}
        />
      )}
    </>
  )
}
