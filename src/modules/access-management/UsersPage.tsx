import { useState, useRef, useEffect } from 'react'
import { Search, UserPlus, MoreHorizontal, Mail, Phone, Shield, Briefcase, Hash, SlidersHorizontal, Check } from 'lucide-react'
import { users } from '@/data/users'
import { businessUnits, jobs } from '@/data/setupData'
import { User, AppName } from '@/types'
import { CATEGORIES, PRODUCT_CATEGORY, CATEGORY_BADGE_VARIANT } from '@/lib/products'
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

// kept for InviteUserDialog compatibility — derived from CATEGORIES
const ALL_APPS: AppName[] = CATEGORIES.flatMap(c => c.products)

const BU_MAP = Object.fromEntries(businessUnits.map(b => [b.code, b.name]))
const JOB_MAP = Object.fromEntries(jobs.map(j => [j.jobNumber, j.name]))

// ── Column chooser ──────────────────────────────────────────────────────────

type ColKey = 'userId' | 'jobTitle' | 'employeeCode' | 'status' | 'role' | 'businessUnits' | 'jobAccess' | 'lastLogin' | 'apps'

const COL_DEFS: { key: ColKey; label: string }[] = [
  { key: 'userId',        label: 'User ID' },
  { key: 'jobTitle',      label: 'Job Title' },
  { key: 'employeeCode',  label: 'Employee Code' },
  { key: 'status',        label: 'Status' },
  { key: 'role',          label: 'Role' },
  { key: 'businessUnits', label: 'Business Unit Access' },
  { key: 'jobAccess',     label: 'Job Access' },
  { key: 'lastLogin',     label: 'Last Login' },
  { key: 'apps',          label: 'Assigned Apps' },
]

function ColumnChooser({
  visible,
  onChange,
}: {
  visible: Set<ColKey>
  onChange: (cols: Set<ColKey>) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const toggle = (key: ColKey) => {
    const next = new Set(visible)
    next.has(key) ? next.delete(key) : next.add(key)
    onChange(next)
  }

  return (
    <div ref={ref} className="relative">
      <Button variant="outline" size="sm" onClick={() => setOpen(o => !o)}>
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        Columns
      </Button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-52 rounded-md border border-gray-200 bg-white shadow-lg z-50 py-1">
          <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100 mb-1">
            Toggle Columns
          </div>
          {COL_DEFS.map(col => (
            <label
              key={col.key}
              className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-gray-50 cursor-pointer select-none"
            >
              <div
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                  visible.has(col.key)
                    ? 'bg-[#0f2137] border-[#0f2137]'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {visible.has(col.key) && <Check className="h-3 w-3 text-white" />}
              </div>
              <span className="text-sm text-gray-700">{col.label}</span>
              <input
                type="checkbox"
                className="sr-only"
                checked={visible.has(col.key)}
                onChange={() => toggle(col.key)}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function BuAccessBadges({ access, home }: { access: string[]; home: string }) {
  const displayed = access.slice(0, 3)
  const overflow = access.slice(3)
  return (
    <div className="flex flex-wrap gap-1">
      {displayed.map(b => (
        <div key={b} className="relative group">
          <Badge variant={b === home ? 'info' : 'secondary'} className="text-xs cursor-default">{b}</Badge>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50 pointer-events-none">
            {BU_MAP[b] ?? b}{b === home ? ' · Home' : ''}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      ))}
      {overflow.length > 0 && (
        <div className="relative group">
          <Badge variant="outline" className="text-xs cursor-default">+{overflow.length}</Badge>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col gap-1 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-50 min-w-max">
            {overflow.map(b => (
              <div key={b} className="flex items-center gap-1.5">
                <Badge variant={b === home ? 'info' : 'secondary'} className="text-xs">{b}</Badge>
                <span className="text-xs text-gray-600">{BU_MAP[b] ?? b}{b === home ? ' · Home' : ''}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function JobAccessCell({ jobAccess }: { jobAccess: 'All' | string[] }) {
  if (jobAccess === 'All') {
    return <Badge variant="success" className="text-xs">All</Badge>
  }
  const arr = jobAccess as string[]
  return (
    <div className="relative group inline-block">
      <Badge variant="secondary" className="text-xs cursor-default">
        {arr.length} job{arr.length !== 1 ? 's' : ''}
      </Badge>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col gap-1 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-50 min-w-max">
        {arr.map(jn => (
          <div key={jn} className="flex items-center gap-1.5 text-xs">
            <code className="text-gray-400 font-mono">{jn}</code>
            <span className="text-gray-700">{JOB_MAP[jn] ?? jn}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── User Detail Sheet ────────────────────────────────────────────────────────

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
            <p className="text-sm text-gray-500">{user.jobTitle} · {user.company}</p>
          </div>
        </div>
        <SheetClose onClose={onClose} />
      </SheetHeader>
      <SheetContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-gray-500 uppercase tracking-wide">Status</Label>
              <div className="mt-1"><Badge variant={STATUS_VARIANT[user.status]}>{user.status}</Badge></div>
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
              <Label className="text-xs text-gray-500 uppercase tracking-wide">User ID</Label>
              <div className="mt-1">
                <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">@{user.userId}</code>
              </div>
            </div>
            <div>
              <Label className="text-xs text-gray-500 uppercase tracking-wide">Job Title</Label>
              <div className="mt-1 flex items-center gap-1.5 text-sm">
                <Briefcase className="h-3.5 w-3.5 text-gray-400" />{user.jobTitle}
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
            {user.employeeCode && (
              <div>
                <Label className="text-xs text-gray-500 uppercase tracking-wide">Employee Code</Label>
                <div className="mt-1 flex items-center gap-1.5 text-sm">
                  <Hash className="h-3.5 w-3.5 text-gray-400" />
                  <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{user.employeeCode}</code>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div>
            <Label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">Business Unit Access</Label>
            <div className="space-y-1.5">
              {user.businessUnitAccess.map(bu => (
                <div key={bu} className="flex items-center gap-2">
                  <Badge variant={bu === user.homeBusinessUnit ? 'info' : 'secondary'} className="text-xs w-10 justify-center">{bu}</Badge>
                  <span className="text-sm text-gray-700">{BU_MAP[bu] ?? bu}</span>
                  {bu === user.homeBusinessUnit && <span className="text-xs text-blue-600 font-medium">Home</span>}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">Job Access</Label>
            {user.jobAccess === 'All' ? (
              <div className="flex items-center gap-2">
                <Badge variant="success" className="text-xs">All Jobs</Badge>
                <span className="text-xs text-gray-500">Access to all jobs in the system</span>
              </div>
            ) : (
              <div className="space-y-1">
                {(user.jobAccess as string[]).map(jn => (
                  <div key={jn} className="flex items-center gap-2 text-sm">
                    <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 font-mono">{jn}</code>
                    <span className="text-gray-700">{JOB_MAP[jn] ?? jn}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

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

          <div>
            <Label className="text-xs text-gray-500 uppercase tracking-wide mb-3 block">Product Access</Label>
            <div className="space-y-4">
              {CATEGORIES.map(cat => (
                <div key={cat.name}>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{cat.name}</div>
                  <div className="space-y-2">
                    {cat.products.map(app => (
                      <div key={app} className="flex items-center justify-between">
                        <div className="text-sm font-medium">{app}</div>
                        <Switch checked={hasApp(app)} onCheckedChange={() => toggleApp(app)} />
                      </div>
                    ))}
                  </div>
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

// ── Invite Dialog ────────────────────────────────────────────────────────────

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
            <div className="rounded-md border p-3 space-y-3">
              {CATEGORIES.map(cat => (
                <div key={cat.name}>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{cat.name}</div>
                  <div className="space-y-1.5 ml-1">
                    {cat.products.map(app => (
                      <div key={app} className="flex items-center gap-2">
                        <input type="checkbox" id={`invite-${app}`} className="h-4 w-4 rounded" />
                        <label htmlFor={`invite-${app}`} className="text-sm cursor-pointer">{app}</label>
                      </div>
                    ))}
                  </div>
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

// ── Main page ────────────────────────────────────────────────────────────────

export function UsersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [visibleCols, setVisibleCols] = useState<Set<ColKey>>(
    new Set(COL_DEFS.map(c => c.key))
  )

  const show = (k: ColKey) => visibleCols.has(k)

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
          <ColumnChooser visible={visibleCols} onChange={setVisibleCols} />
          <Button size="sm" onClick={() => setInviteOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite User
          </Button>
        </div>
      </div>

      {/* Table — horizontally scrollable */}
      <div className="rounded-lg border bg-white overflow-x-auto">
        <Table className="min-w-[1500px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 min-w-[40px]">
                <input type="checkbox" className="h-4 w-4 rounded" />
              </TableHead>
              <TableHead className="min-w-[220px]">User</TableHead>
              {show('userId')        && <TableHead className="min-w-[120px]">User ID</TableHead>}
              {show('jobTitle')      && <TableHead className="min-w-[200px]">Job Title</TableHead>}
              {show('employeeCode')  && <TableHead className="min-w-[140px]">Employee Code</TableHead>}
              {show('status')        && <TableHead className="min-w-[100px]">Status</TableHead>}
              {show('role')          && <TableHead className="min-w-[150px]">Role</TableHead>}
              {show('businessUnits') && <TableHead className="min-w-[200px]">Business Unit Access</TableHead>}
              {show('jobAccess')     && <TableHead className="min-w-[120px]">Job Access</TableHead>}
              {show('lastLogin')     && <TableHead className="min-w-[150px]">Last Login</TableHead>}
              {show('apps')          && <TableHead className="min-w-[180px]">Assigned Apps</TableHead>}
              <TableHead className="w-10 min-w-[40px]" />
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
                {show('userId') && (
                  <TableCell>
                    <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">@{user.userId}</code>
                  </TableCell>
                )}
                {show('jobTitle') && (
                  <TableCell>
                    <span className="text-sm text-gray-700">{user.jobTitle}</span>
                  </TableCell>
                )}
                {show('employeeCode') && (
                  <TableCell>
                    {user.employeeCode
                      ? <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{user.employeeCode}</code>
                      : <span className="text-xs text-gray-400">—</span>
                    }
                  </TableCell>
                )}
                {show('status') && (
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[user.status]}>{user.status}</Badge>
                  </TableCell>
                )}
                {show('role') && (
                  <TableCell>
                    <span className="text-sm text-gray-700">{user.role}</span>
                  </TableCell>
                )}
                {show('businessUnits') && (
                  <TableCell>
                    <BuAccessBadges access={user.businessUnitAccess} home={user.homeBusinessUnit} />
                  </TableCell>
                )}
                {show('jobAccess') && (
                  <TableCell>
                    <JobAccessCell jobAccess={user.jobAccess} />
                  </TableCell>
                )}
                {show('lastLogin') && (
                  <TableCell>
                    <span className="text-sm text-gray-500">{user.lastLogin}</span>
                  </TableCell>
                )}
                {show('apps') && (
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.assignedApps.slice(0, 3).map(app => {
                        const cat = PRODUCT_CATEGORY[app]
                        const variant = cat ? CATEGORY_BADGE_VARIANT[cat] : 'secondary'
                        return <Badge key={app} variant={variant} className="text-xs">{app}</Badge>
                      })}
                      {user.assignedApps.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{user.assignedApps.length - 3}</Badge>
                      )}
                      {user.assignedApps.length === 0 && (
                        <span className="text-xs text-gray-400">None</span>
                      )}
                    </div>
                  </TableCell>
                )}
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
