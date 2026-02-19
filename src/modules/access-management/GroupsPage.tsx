import { useState } from 'react'
import { Search, Users, Plus } from 'lucide-react'
import { groups, users } from '@/data/users'
import { Group } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Sheet, SheetHeader, SheetTitle, SheetClose, SheetContent, SheetFooter } from '@/components/ui/sheet'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function GroupDetailSheet({ group, open, onClose }: { group: Group | null; open: boolean; onClose: () => void }) {
  if (!group) return null
  const memberUsers = users.filter(u => group.members.includes(u.id))

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetHeader>
        <div>
          <SheetTitle>{group.name}</SheetTitle>
          <p className="text-sm text-gray-500 mt-0.5">{group.description}</p>
        </div>
        <SheetClose onClose={onClose} />
      </SheetHeader>
      <SheetContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Members</div>
              <div className="font-medium">{group.memberCount}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Created</div>
              <div className="font-medium">{group.createdDate}</div>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Assigned Roles</div>
            <div className="flex flex-wrap gap-1.5">
              {group.rolesAssigned.map(r => (
                <Badge key={r} variant="info">{r}</Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">Members</div>
            <div className="space-y-2">
              {memberUsers.map(u => (
                <div key={u.id} className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-50">
                  <Avatar initials={initials(u.name)} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{u.name}</div>
                    <div className="text-xs text-gray-500 truncate">{u.role}</div>
                  </div>
                  <Badge variant={u.status === 'Active' ? 'success' : 'secondary'} className="text-xs">{u.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
      <SheetFooter>
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button onClick={onClose}>Edit Group</Button>
      </SheetFooter>
    </Sheet>
  )
}

export function GroupsPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Group | null>(null)

  const filtered = groups.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search groups…" className="pl-8" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />New Group
        </Button>
      </div>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Group Name</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Assigned Roles</TableHead>
              <TableHead>Created Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(group => (
              <TableRow key={group.id} className="cursor-pointer" onClick={() => setSelected(group)}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{group.name}</div>
                      <div className="text-xs text-gray-500">{group.description.slice(0, 50)}…</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium">{group.memberCount}</span>
                    <span className="text-gray-500 text-sm">members</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {group.rolesAssigned.map(r => (
                      <Badge key={r} variant="info" className="text-xs">{r}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-500">{group.createdDate}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <GroupDetailSheet group={selected} open={!!selected} onClose={() => setSelected(null)} />
    </div>
  )
}
