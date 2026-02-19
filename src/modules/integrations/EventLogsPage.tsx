import { useState } from 'react'
import { Search, CheckCircle2, AlertCircle, XCircle, ChevronDown } from 'lucide-react'
import { eventLogs } from '@/data/integrations'
import { EventLog } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'

const STATUS_CONFIG = {
  Success: { icon: CheckCircle2, color: 'text-green-500', badge: 'success' as const },
  Warning: { icon: AlertCircle, color: 'text-amber-500', badge: 'warning' as const },
  Error: { icon: XCircle, color: 'text-red-500', badge: 'destructive' as const },
}

function LogRow({ log }: { log: EventLog }) {
  const [expanded, setExpanded] = useState(false)
  const cfg = STATUS_CONFIG[log.status]
  const Icon = cfg.icon

  return (
    <>
      <TableRow className="cursor-pointer" onClick={() => setExpanded(p => !p)}>
        <TableCell className="font-mono text-xs text-gray-500">{log.timestamp}</TableCell>
        <TableCell className="text-sm font-medium">{log.integration}</TableCell>
        <TableCell><code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{log.eventType}</code></TableCell>
        <TableCell className="text-sm text-gray-600 max-w-xs truncate">{log.entity}</TableCell>
        <TableCell>
          <Badge variant={cfg.badge} className="flex w-fit items-center gap-1">
            <Icon className="h-3 w-3" />{log.status}
          </Badge>
        </TableCell>
        <TableCell>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </TableCell>
      </TableRow>
      {expanded && (
        <TableRow>
          <TableCell colSpan={6} className="bg-gray-50 py-3">
            <div className="px-2 text-sm text-gray-700">{log.details}</div>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

interface EventLogsPageProps {
  errorsOnly?: boolean
}

export function EventLogsPage({ errorsOnly = false }: EventLogsPageProps) {
  const [search, setSearch] = useState('')
  const [integFilter, setIntegFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState(errorsOnly ? 'Error' : 'All')

  const integrations = Array.from(new Set(eventLogs.map(e => e.integration)))

  const filtered = eventLogs.filter(log => {
    const matchSearch = log.entity.toLowerCase().includes(search.toLowerCase()) ||
      log.eventType.toLowerCase().includes(search.toLowerCase()) ||
      log.integration.toLowerCase().includes(search.toLowerCase())
    const matchInteg = integFilter === 'All' || log.integration === integFilter
    const matchStatus = statusFilter === 'All' || log.status === statusFilter
    return matchSearch && matchInteg && matchStatus
  })

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search logs…" className="pl-8" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={integFilter} onChange={e => setIntegFilter(e.target.value)} className="w-48">
          <option value="All">All integrations</option>
          {integrations.map(i => <option key={i}>{i}</option>)}
        </Select>
        <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-36">
          <option value="All">All statuses</option>
          <option value="Success">Success</option>
          <option value="Warning">Warning</option>
          <option value="Error">Error</option>
        </Select>
      </div>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Integration</TableHead>
              <TableHead>Event Type</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.slice(0, 50).map(log => (
              <LogRow key={log.id} log={log} />
            ))}
          </TableBody>
        </Table>
        <div className="px-4 py-3 border-t text-xs text-gray-500">
          Showing {Math.min(filtered.length, 50)} of {filtered.length} events
        </div>
      </div>
    </div>
  )
}
