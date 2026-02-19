import { useState } from 'react'
import { Search, UserPlus, MoreHorizontal, Mail, Phone, Shield } from 'lucide-react'
import { users } from '@/data/users'
import { User, AppName } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Avatar } from '@/components/ui/avatar'
import { Sheet, SheetHeader, SheetTitle, SheetClose, SheetContent, SheetFooter } from '@/components/ui/sheet'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const STATUS_VARIANT: Record<string, 'success' | 'secondary' | 'warning'> = {
  Active: 'success',
  Inactive: 'secondary',
  Pending: 'warning',
}

const ALL_APPS: AppName[] = ['HeavyJob', 'HeavyBid', 'HeavyConnect', 'Dispatcher', 'Safety']

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function UserDetailSheet({ user, open, onClose }: { user: User | null; open: boolean; onClose: () => void }) {
  const [appAccess, setAppAccess] = useState<Record<AppName, boolean>>({} as Record<AppName, boolean>)

  if (!user) return null

  const toggleApp = (app: AppName) => setAppAccess(p => ({ ...p, [app]: !p[app] }))
  const hasApp = (app: AppName) => appAccess[app] ?? user.assignedApps.includes(app)

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetHeader>
        <div className="flex items-center gap-3">
          <Avatar initials={initials(user.name)} size="lg" />
          <div>
            <SheetTitle>{user.name}</SheetTitle>
            <p className="text-sm text-gray-500">{user.role} · {user.company}</p>
          </div>
        </div>
        <SheetClose onClose={onClose} />
      </SheetHeader>
      <SheetContent>
        <div className="space-y-6">
          {/* Status + info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-gray-500 uppercase tracking-wide">Status</Label>
              <div className="mt-1">
                <Badge variant={STATUS_VARIANT[user.status]}>{user.status}</Badge>
              </div>
            </div>
            <div>
              <Label className="text-xs text-gray-500 uppercase tracking-wide">Last Login</Label>
              <div className="mt-1 text-sm">{user.lastLogin}</div>
            </div>
            <div>
              <Label className="text-xs text-gray-500 uppercase tracking-wide">Email</Label>
              <div className="mt-1 flex items-center gap-1.5 text-sm">
                <Mail className="h-3.5 w-3.5 text-gray-400" />{user.email}
              </div>
            </div>
            <div>
              <Label className="text-xs text-gray-500 uppercase tracking-wide">Phone</Label>
              <div className="mt-1 flex items-center gap-1.5 text-sm">
                <Phone className="h-3.5 w-3.5 text-gray-400" />{user.phone}
              </div>
            </div>
            <div>
              <Label className="text-xs text-gray-500 uppercase tracking-wide">Department</Label>
              <div className="mt-1 text-sm">{user.department}</div>
            </div>
            <div>
              <Label className="text-xs text-gray-500 uppercase tracking-wide">Company</Label>
              <div className="mt-1 text-sm">{user.company}</div>
            </div>
          </div>

          <Separator />

          {/* Role assignment */}
          <div>
            <Label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">Role Assignment</Label>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-gray-400" />
              <Select defaultValue={user.role} className="flex-1">
                <option>Super Admin</option>
                <option>Admin</option>
                <option>Project Manager</option>
                <option>Field Supervisor</option>
                <option>Estimator</option>
                <option>Foreman</option>
                <option>Safety Manager</option>
                <option>Operator</option>
              </Select>
            </div>
          </div>

          <Separator />

          {/* App access */}
          <div>
            <Label className="text-xs text-gray-500 uppercase tracking-wide mb-3 block">Product Access</Label>
            <div className="space-y-3">
              {ALL_APPS.map(app => (
                <div key={app} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{app}</div>
                    <div className="text-xs text-gray-500">
                      {app === 'HeavyJob' && 'Field production & payroll'}
                      {app === 'HeavyBid' && 'Estimating & bidding'}
                      {app === 'HeavyConnect' && 'Owner/subcontractor portal'}
                      {app === 'Dispatcher' && 'Equipment dispatching'}
                      {app === 'Safety' && 'Incident & compliance management'}
                    </div>
                  </div>
                  <Switch checked={hasApp(app)} onCheckedChange={() => toggleApp(app)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
      <SheetFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Save Changes</Button>
      </SheetFooter>
    </Sheet>
  )
}

function InviteUserDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose} className="relative">
        <DialogHeader>
          <DialogTitle>Invite User</DialogTitle>
          <DialogDescription>Send an invitation email to a new user.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-1.5 block">Full Name</Label>
            <Input placeholder="John Smith" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-1.5 block">Email Address</Label>
            <Input type="email" placeholder="john.smith@company.com" />
          </div>
          <div>
            <Label className="text-sm font-medium mb-1.5 block">Role</Label>
            <Select>
              <option>Select a role…</option>
              <option>Admin</option>
              <option>Project Manager</option>
              <option>Field Supervisor</option>
              <option>Estimator</option>
              <option>Foreman</option>
              <option>Safety Manager</option>
              <option>Operator</option>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium mb-1.5 block">Product Access</Label>
            <div className="space-y-2 rounded-md border p-3">
              {ALL_APPS.map(app => (
                <div key={app} className="flex items-center gap-2">
                  <input type="checkbox" id={`invite-${app}`} className="h-4 w-4 rounded" />
                  <label htmlFor={`invite-${app}`} className="text-sm cursor-pointer">{app}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Send Invitation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function UsersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || u.status === statusFilter
    return matchSearch && matchStatus
  })

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users…"
              className="pl-8"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-36">
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <Button variant="outline" size="sm">
              {selected.size} selected · Actions
            </Button>
          )}
          <Button size="sm" onClick={() => setInviteOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite User
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <input type="checkbox" className="h-4 w-4 rounded" />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Assigned Apps</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(user => (
              <TableRow
                key={user.id}
                className="cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                <TableCell onClick={e => { e.stopPropagation(); toggleSelect(user.id) }}>
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded"
                    checked={selected.has(user.id)}
                    onChange={() => {}}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar initials={initials(user.name)} size="sm" />
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANT[user.status]}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-700">{user.role}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-500">{user.lastLogin}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.assignedApps.slice(0, 3).map(app => (
                      <Badge key={app} variant="secondary" className="text-xs">{app}</Badge>
                    ))}
                    {user.assignedApps.length > 3 && (
                      <Badge variant="outline" className="text-xs">+{user.assignedApps.length - 3}</Badge>
                    )}
                    {user.assignedApps.length === 0 && (
                      <span className="text-xs text-gray-400">None</span>
                    )}
                  </div>
                </TableCell>
                <TableCell onClick={e => e.stopPropagation()}>
                  <button className="rounded p-1 hover:bg-gray-100">
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="px-4 py-3 border-t text-xs text-gray-500 flex items-center justify-between">
          <span>Showing {filtered.length} of {users.length} users</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 rounded border text-xs hover:bg-gray-50">Prev</button>
            <button className="px-2 py-1 rounded border bg-[#0f2137] text-white text-xs">1</button>
            <button className="px-2 py-1 rounded border text-xs hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>

      <UserDetailSheet
        user={selectedUser}
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
      />
      <InviteUserDialog open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  )
}
