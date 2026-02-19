import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles, X, ArrowRight,
  Users, CreditCard, Plug, Database, BarChart3, Settings, AlertCircle, FileText,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const QUICK_ACTIONS = [
  'Show inactive users',
  'Find integration errors',
  'View upcoming invoices',
  'Check seat usage',
  'Recent event logs',
  'Open Field Mapper',
]

type AiResult = {
  icon: React.ElementType
  title: string
  description: string
  module: string
  path: string
}

const ALL_RESULTS: AiResult[] = [
  {
    icon: Users,
    title: 'Inactive Users',
    description: '3 users deactivated in the last 30 days',
    module: 'Access',
    path: '/access',
  },
  {
    icon: AlertCircle,
    title: 'Integration Errors',
    description: '2 errors in Vista ERP sync (last 24 h)',
    module: 'Integrations',
    path: '/integrations/error-logs',
  },
  {
    icon: CreditCard,
    title: 'Invoice Due',
    description: 'INV-2024-011 due in 5 days — $12,450',
    module: 'Billing',
    path: '/billing/invoices',
  },
  {
    icon: Database,
    title: 'Employees',
    description: '25 records · last updated today',
    module: 'Setup Data',
    path: '/setup',
  },
  {
    icon: BarChart3,
    title: 'Project Cost Summary',
    description: 'Report last refreshed 2 h ago',
    module: 'Insights',
    path: '/insights',
  },
  {
    icon: Plug,
    title: 'Field Mapper',
    description: 'Map source fields to destination with AI assist',
    module: 'Integrations',
    path: '/integrations/mapper',
  },
  {
    icon: FileText,
    title: 'Security Policies',
    description: '4 active policies — 1 pending review',
    module: 'Access',
    path: '/access/policies',
  },
  {
    icon: Settings,
    title: 'Company Settings',
    description: 'SSO, data retention, multi-tenant config',
    module: 'Settings',
    path: '/settings?tab=company',
  },
]

function search(q: string): AiResult[] {
  const lower = q.toLowerCase()
  const matches = ALL_RESULTS.filter(r =>
    r.title.toLowerCase().includes(lower) ||
    r.description.toLowerCase().includes(lower) ||
    r.module.toLowerCase().includes(lower)
  )
  return matches.length ? matches : ALL_RESULTS.slice(0, 3)
}

export function AiCommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [thinking, setThinking] = useState(false)
  const [results, setResults] = useState<AiResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setThinking(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (!query.trim()) { setResults([]); setThinking(false); return }
    setThinking(true)
    const timer = setTimeout(() => {
      setThinking(false)
      setResults(search(query))
    }, 550)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const go = (path: string) => { navigate(path); onClose() }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Palette card */}
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
          <Sparkles className="h-5 w-5 text-blue-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Find or ask anything..."
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 bg-transparent outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="text-xs bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-500 font-mono">
            Esc
          </kbd>
        </div>

        {/* Empty state — quick actions + recent */}
        {!query && (
          <div className="p-4">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Quick actions
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {QUICK_ACTIONS.map(action => (
                <button
                  key={action}
                  className="px-3 py-1.5 rounded-full bg-gray-100 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  onClick={() => setQuery(action)}
                >
                  {action}
                </button>
              ))}
            </div>

            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Recent
            </div>
            <div className="space-y-0.5">
              {ALL_RESULTS.slice(0, 4).map(r => (
                <button
                  key={r.title}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  onClick={() => go(r.path)}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 shrink-0">
                    <r.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">{r.title}</div>
                    <div className="text-xs text-gray-500 truncate">{r.description}</div>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">{r.module}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Thinking animation */}
        {query && thinking && (
          <div className="p-6 flex items-center gap-3 text-sm text-gray-500">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span>Searching...</span>
          </div>
        )}

        {/* Results */}
        {query && !thinking && (
          <div className="p-2">
            {results.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-500">No results found</div>
            ) : (
              <div className="space-y-0.5">
                {results.map(r => (
                  <button
                    key={r.title}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    onClick={() => go(r.path)}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 shrink-0">
                      <r.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">{r.title}</div>
                      <div className="text-xs text-gray-500 truncate">{r.description}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs bg-gray-100 text-gray-500 rounded px-2 py-0.5">
                        {r.module}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-gray-300" />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* AI footer */}
            <div className="mt-2 pt-2 border-t border-gray-100 px-3 pb-2">
              <div className="flex items-start gap-2">
                <Sparkles className="h-3.5 w-3.5 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-500">
                  Results for <span className="font-medium text-gray-700">"{query}"</span>.
                  Try a complete question for more context.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
