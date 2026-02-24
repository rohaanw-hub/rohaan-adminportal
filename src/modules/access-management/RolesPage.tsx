import { useState } from 'react'
import { Shield, Plus, Check, X } from 'lucide-react'
import { roles } from '@/data/users'
import { Role } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const APPS = ['HeavyBid', 'HeavyJob', 'Fleet', 'Platform']
const PERMS = ['View', 'Edit', 'Delete', 'Approve', 'Admin']

function PermCell({ value, onToggle }: { value: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'w-7 h-7 rounded flex items-center justify-center transition-colors',
        value ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
      )}
    >
      {value ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
    </button>
  )
}

export function RolesPage() {
  const [localRoles, setLocalRoles] = useState(roles)
  const [selectedRole, setSelectedRole] = useState<Role>(roles[0])

  const togglePerm = (app: string, perm: string) => {
    setLocalRoles(prev =>
      prev.map(r =>
        r.id === selectedRole.id
          ? {
              ...r,
              permissions: {
                ...r.permissions,
                [app]: { ...r.permissions[app], [perm]: !r.permissions[app]?.[perm] },
              },
            }
          : r
      )
    )
    setSelectedRole(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [app]: { ...prev.permissions[app], [perm]: !prev.permissions[app]?.[perm] },
      },
    }))
  }

  const current = localRoles.find(r => r.id === selectedRole.id) ?? selectedRole

  return (
    <div className="flex gap-6">
      {/* Role list */}
      <div className="w-60 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Roles ({localRoles.length})</span>
          <Button size="sm" variant="outline">
            <Plus className="h-3.5 w-3.5 mr-1" />New
          </Button>
        </div>
        <div className="space-y-1">
          {localRoles.map(role => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role)}
              className={cn(
                'w-full text-left rounded-md px-3 py-2.5 transition-colors',
                selectedRole.id === role.id
                  ? 'bg-[#0f2137] text-white'
                  : 'hover:bg-gray-100'
              )}
            >
              <div className="flex items-center gap-2">
                <Shield className={cn('h-4 w-4 shrink-0', selectedRole.id === role.id ? 'text-amber-400' : 'text-gray-400')} />
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{role.name}</div>
                  <div className={cn('text-xs truncate', selectedRole.id === role.id ? 'text-white/60' : 'text-gray-500')}>
                    {role.permissionCount} permissions · {role.assignedUsers} users
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Permissions matrix */}
      <div className="flex-1">
        <div className="rounded-lg border bg-white p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">{current.name}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{current.description}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="info">{current.assignedUsers} users assigned</Badge>
                <Badge variant="secondary">{current.permissionCount} permissions</Badge>
              </div>
            </div>
            <Button size="sm" variant="amber">Save Changes</Button>
          </div>

          {/* Matrix */}
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide pb-3 pr-4 w-36">Product</th>
                  {PERMS.map(p => (
                    <th key={p} className="text-center text-xs font-medium text-gray-500 uppercase tracking-wide pb-3 px-2 w-20">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {APPS.map(app => (
                  <tr key={app}>
                    <td className="py-3 pr-4 font-medium text-gray-900">{app}</td>
                    {PERMS.map(perm => (
                      <td key={perm} className="py-3 px-2 text-center">
                        <div className="flex justify-center">
                          <PermCell
                            value={current.permissions[app]?.[perm] ?? false}
                            onToggle={() => togglePerm(app, perm)}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
