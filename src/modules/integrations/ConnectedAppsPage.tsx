import { useState } from 'react'
import { Plus, RefreshCw, AlertCircle, CheckCircle2, XCircle, Settings } from 'lucide-react'
import { integrations } from '@/data/integrations'
import { Integration } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetHeader, SheetTitle, SheetClose, SheetContent, SheetFooter } from '@/components/ui/sheet'
import { Select } from '@/components/ui/select'

const STATUS_CONFIG = {
  Connected: { icon: CheckCircle2, color: 'text-green-500', badge: 'success' as const },
  Disconnected: { icon: XCircle, color: 'text-gray-400', badge: 'secondary' as const },
  Error: { icon: AlertCircle, color: 'text-red-500', badge: 'destructive' as const },
}

function IntegrationDrawer({ int: intg, open, onClose }: { int: Integration | null; open: boolean; onClose: () => void }) {
  if (!intg) return null
  const cfg = STATUS_CONFIG[intg.status]
  const Icon = cfg.icon

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0f2137] text-white font-bold text-sm">{intg.logo}</div>
          <div>
            <SheetTitle>{intg.name}</SheetTitle>
            <p className="text-sm text-gray-500">{intg.category}</p>
          </div>
        </div>
        <SheetClose onClose={onClose} />
      </SheetHeader>
      <SheetContent>
        <div className="space-y-5">
          <div className="flex items-center gap-2 p-3 rounded-lg border">
            <Icon className={`h-5 w-5 ${cfg.color}`} />
            <div>
              <div className="text-sm font-medium">Status: {intg.status}</div>
              <div className="text-xs text-gray-500">Last sync: {intg.lastSync}</div>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Sync Schedule</div>
            <Select defaultValue="every-15">
              <option value="realtime">Real-time</option>
              <option value="every-15">Every 15 minutes</option>
              <option value="every-hour">Every hour</option>
              <option value="daily">Daily at midnight</option>
            </Select>
          </div>

          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Field Mappings</div>
            <div className="rounded-lg border divide-y text-sm">
              {[
                ['Job Number', 'project_id'],
                ['Cost Code', 'account_code'],
                ['Employee ID', 'worker_ref'],
                ['Equipment Asset', 'asset_num'],
              ].map(([hcss, ext]) => (
                <div key={hcss} className="flex items-center justify-between px-3 py-2">
                  <span className="font-mono text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">{hcss}</span>
                  <span className="text-gray-400 text-xs">→</span>
                  <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">{ext}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Last Sync Log</div>
            <div className="rounded-lg bg-gray-900 text-green-400 p-3 font-mono text-xs space-y-1">
              <div>[{intg.lastSync}] Sync started</div>
              <div>[{intg.lastSync}] Fetching records from {intg.name}…</div>
              <div>[{intg.lastSync}] Processing 142 records</div>
              {intg.status === 'Error'
                ? <div className="text-red-400">[ERROR] Authentication failed: token expired</div>
                : <div>[{intg.lastSync}] Sync completed. 142 records updated.</div>
              }
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />Run Manual Sync
          </Button>
        </div>
      </SheetContent>
      <SheetFooter>
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button onClick={onClose}>Save Configuration</Button>
      </SheetFooter>
    </Sheet>
  )
}

export function ConnectedAppsPage() {
  const [selected, setSelected] = useState<Integration | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [catFilter, setCatFilter] = useState('All')

  const filtered = integrations.filter(i => catFilter === 'All' || i.category === catFilter)
  const categories = ['All', ...Array.from(new Set(integrations.map(i => i.category)))]

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex gap-1">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${catFilter === c ? 'bg-[#0f2137] text-white' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              {c}
            </button>
          ))}
        </div>
        <Button size="sm" onClick={() => setAddOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />Add Integration
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map(intg => {
          const cfg = STATUS_CONFIG[intg.status]
          const StatusIcon = cfg.icon
          return (
            <div key={intg.id} className="rounded-lg border bg-white p-4 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0f2137] text-white font-bold text-sm">{intg.logo}</div>
                <Badge variant={cfg.badge} className="flex items-center gap-1">
                  <StatusIcon className="h-3 w-3" />{intg.status}
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{intg.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5 mb-3">{intg.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-400">
                  {intg.status !== 'Disconnected' && `Synced ${intg.lastSync}`}
                </div>
                <Button size="sm" variant="outline" onClick={() => setSelected(intg)}>
                  <Settings className="h-3.5 w-3.5 mr-1" />Configure
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add integration wizard placeholder */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setAddOpen(false)} />
          <div className="relative z-50 bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Add Integration</h2>
            <div className="border rounded-lg bg-gray-50 h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-lg mb-2">Integration Setup Wizard</div>
                <div className="text-sm">Workato-powered setup would appear here</div>
                <div className="text-xs mt-1 text-gray-400">Connect to 1,000+ apps via Workato Embedded</div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button onClick={() => setAddOpen(false)}>Connect</Button>
            </div>
          </div>
        </div>
      )}

      <IntegrationDrawer int={selected} open={!!selected} onClose={() => setSelected(null)} />
    </div>
  )
}
