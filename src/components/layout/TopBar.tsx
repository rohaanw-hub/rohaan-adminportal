import { useState } from 'react'
import { Search, Bell, ChevronDown, Building2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'

const companies = ['Acme Construction', 'Bridge Builders Inc', 'Skyline Development']

export function TopBar() {
  const [company, setCompany] = useState('Acme Construction')
  const [showCompany, setShowCompany] = useState(false)
  const [showUser, setShowUser] = useState(false)

  return (
    <header className="fixed top-0 left-60 right-0 z-20 flex h-14 items-center justify-between border-b bg-white px-6">
      {/* Company switcher */}
      <div className="relative">
        <button
          className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 transition-colors"
          onClick={() => { setShowCompany(p => !p); setShowUser(false) }}
        >
          <Building2 className="h-4 w-4 text-gray-400" />
          <span className="font-medium">{company}</span>
          <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
        </button>
        {showCompany && (
          <div className="absolute left-0 top-full mt-1 w-56 rounded-md border bg-white shadow-lg z-50">
            <div className="py-1">
              {companies.map(c => (
                <button
                  key={c}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${c === company ? 'font-medium text-[#0f2137]' : 'text-gray-700'}`}
                  onClick={() => { setCompany(c); setShowCompany(false) }}
                >
                  {c}
                  {c === company && <span className="text-amber-500">✓</span>}
                </button>
              ))}
            </div>
            <div className="border-t py-1">
              <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-50">
                Manage companies…
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search…"
            className="w-56 rounded-md border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#0f2137] focus:bg-white transition-colors"
          />
        </div>

        {/* Notifications */}
        <button className="relative rounded-md p-1.5 hover:bg-gray-100 transition-colors">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            className="flex items-center gap-2 rounded-md p-1 hover:bg-gray-100 transition-colors"
            onClick={() => { setShowUser(p => !p); setShowCompany(false) }}
          >
            <Avatar initials="MW" size="sm" />
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>
          {showUser && (
            <div className="absolute right-0 top-full mt-1 w-48 rounded-md border bg-white shadow-lg z-50">
              <div className="px-4 py-3 border-b">
                <div className="text-sm font-medium">Marcus Webb</div>
                <div className="text-xs text-gray-500">mwebb@acmeconst.com</div>
                <Badge variant="info" className="mt-1.5">Super Admin</Badge>
              </div>
              <div className="py-1">
                {['Profile Settings', 'Appearance', 'Keyboard Shortcuts'].map(item => (
                  <button key={item} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{item}</button>
                ))}
              </div>
              <div className="border-t py-1">
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Sign out</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close */}
      {(showCompany || showUser) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setShowCompany(false); setShowUser(false) }}
        />
      )}
    </header>
  )
}
