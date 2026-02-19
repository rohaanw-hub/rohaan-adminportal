import { useState } from 'react'
import { Plus, Zap, AlertTriangle, PauseCircle } from 'lucide-react'
import { webhooks } from '@/data/integrations'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const STATUS_ICON = {
  Active: <Zap className="h-3.5 w-3.5 text-green-500" />,
  Failing: <AlertTriangle className="h-3.5 w-3.5 text-red-500" />,
  Paused: <PauseCircle className="h-3.5 w-3.5 text-gray-400" />,
}

const STATUS_VARIANT = {
  Active: 'success' as const,
  Failing: 'destructive' as const,
  Paused: 'secondary' as const,
}

export function WebhooksPage() {
  const [addOpen, setAddOpen] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">{webhooks.length} webhooks</span>
        <Button size="sm" onClick={() => setAddOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />Add Webhook
        </Button>
      </div>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Endpoint URL</TableHead>
              <TableHead>Events</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Triggered</TableHead>
              <TableHead>Secret</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {webhooks.map(wh => (
              <TableRow key={wh.id}>
                <TableCell>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded truncate max-w-[240px] block">{wh.endpoint}</code>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {wh.events.map(e => (
                      <Badge key={e} variant="info" className="text-xs font-mono">{e}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANT[wh.status]} className="flex w-fit items-center gap-1">
                    {STATUS_ICON[wh.status]}{wh.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-500">{wh.lastTriggered}</TableCell>
                <TableCell>
                  <code className="text-xs text-gray-500">{wh.secretMasked}</code>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="text-xs">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-xs text-red-500">Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent onClose={() => setAddOpen(false)} className="relative">
          <DialogHeader>
            <DialogTitle>Add Webhook</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Endpoint URL</Label>
              <Input placeholder="https://your-server.com/webhook" type="url" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Events to Subscribe</Label>
              <div className="space-y-2 rounded-md border p-3 max-h-48 overflow-y-auto">
                {['timecard.submitted', 'timecard.approved', 'job.created', 'job.updated', 'job.closed', 'incident.created', 'inspection.failed', 'payroll.finalized', 'invoice.created', 'equipment.hours'].map(ev => (
                  <div key={ev} className="flex items-center gap-2">
                    <input type="checkbox" id={`ev-${ev}`} className="h-4 w-4 rounded" />
                    <label htmlFor={`ev-${ev}`} className="text-sm font-mono cursor-pointer">{ev}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Secret (optional)</Label>
              <Input placeholder="Signing secret for payload verification" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setAddOpen(false)}>Create Webhook</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
