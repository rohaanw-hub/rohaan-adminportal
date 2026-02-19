import { useState } from 'react'
import { Key, Plus, Eye, EyeOff, Trash2 } from 'lucide-react'
import { apiCredentials } from '@/data/integrations'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function CredentialsPage() {
  const [generateOpen, setGenerateOpen] = useState(false)
  const [revealed, setRevealed] = useState<Set<string>>(new Set())

  const toggleReveal = (id: string) => {
    setRevealed(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">{apiCredentials.length} credentials</span>
        <Button size="sm" onClick={() => setGenerateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />Generate New Credential
        </Button>
      </div>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Client ID</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead>Scopes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiCredentials.map(cred => (
              <TableRow key={cred.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{cred.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                      {revealed.has(cred.id) ? cred.clientId : cred.clientId.replace(/(?<=.{12}).+(?=.{4})/, '••••••••')}
                    </code>
                    <button
                      onClick={() => toggleReveal(cred.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {revealed.has(cred.id) ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">{cred.created}</TableCell>
                <TableCell className="text-sm text-gray-500">{cred.lastUsed}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {cred.scopes.slice(0, 2).map(s => (
                      <Badge key={s} variant="secondary" className="text-xs font-mono">{s}</Badge>
                    ))}
                    {cred.scopes.length > 2 && (
                      <Badge variant="outline" className="text-xs">+{cred.scopes.length - 2}</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={cred.status === 'Active' ? 'success' : 'destructive'}>{cred.status}</Badge>
                </TableCell>
                <TableCell>
                  {cred.status === 'Active' && (
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4 mr-1" />Revoke
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={generateOpen} onOpenChange={setGenerateOpen}>
        <DialogContent onClose={() => setGenerateOpen(false)} className="relative">
          <DialogHeader>
            <DialogTitle>Generate API Credential</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Credential Name</Label>
              <Input placeholder="e.g. Production API Key" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Scopes</Label>
              <div className="space-y-2 rounded-md border p-3">
                {['read:jobs', 'write:jobs', 'read:employees', 'write:employees', 'read:timecards', 'write:timecards', 'read:equipment', 'write:costcodes'].map(scope => (
                  <div key={scope} className="flex items-center gap-2">
                    <input type="checkbox" id={`scope-${scope}`} className="h-4 w-4 rounded" />
                    <label htmlFor={`scope-${scope}`} className="text-sm font-mono cursor-pointer">{scope}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGenerateOpen(false)}>Cancel</Button>
            <Button onClick={() => setGenerateOpen(false)}>Generate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
