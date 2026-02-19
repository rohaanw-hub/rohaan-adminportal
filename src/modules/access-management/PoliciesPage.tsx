import { useState } from 'react'
import { Plus, Lock, Users, AlertCircle } from 'lucide-react'
import { policies } from '@/data/users'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function PoliciesPage() {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">{policies.length} policies configured</span>
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />Create Policy
        </Button>
      </div>

      <div className="grid gap-4">
        {policies.map(policy => (
          <div key={policy.id} className="rounded-lg border bg-white p-5 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${policy.status === 'Active' ? 'bg-blue-50' : 'bg-gray-100'}`}>
                  <Lock className={`h-4 w-4 ${policy.status === 'Active' ? 'text-blue-600' : 'text-gray-400'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{policy.name}</h3>
                    <Badge variant={policy.status === 'Active' ? 'success' : 'secondary'}>{policy.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{policy.description}</p>
                  <div className="mt-3 flex items-center flex-wrap gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{policy.conditions}</code>
                    </div>
                    {policy.assignedGroups.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        Groups: {policy.assignedGroups.join(', ')}
                      </div>
                    )}
                    {policy.assignedUsers.length > 0 && (
                      <div>Direct: {policy.assignedUsers.length} users</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent onClose={() => setCreateOpen(false)} className="relative">
          <DialogHeader>
            <DialogTitle>Create Security Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Policy Name</Label>
              <Input placeholder="e.g. MFA Required — Field Users" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Description</Label>
              <Input placeholder="Describe what this policy enforces…" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Apply To</Label>
              <div className="space-y-2">
                {['Field Operations', 'Estimating Team', 'Administrators', 'Safety & Compliance'].map(g => (
                  <div key={g} className="flex items-center gap-2">
                    <input type="checkbox" id={`group-${g}`} className="h-4 w-4 rounded" />
                    <label htmlFor={`group-${g}`} className="text-sm cursor-pointer">{g}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Condition</Label>
              <Input placeholder="e.g. Role in [Admin] AND device != trusted" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={() => setCreateOpen(false)}>Create Policy</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
