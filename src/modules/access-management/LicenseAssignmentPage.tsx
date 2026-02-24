import { useState, useRef, useEffect } from 'react'
import { Search, Plus, MoreHorizontal, Users, Pencil, Copy, Trash2, X } from 'lucide-react'
import { users } from '@/data/users'
import { User, AppName } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { CATEGORIES, PRODUCT_CATEGORY, CATEGORY_BADGE_VARIANT, ProductCategory } from '@/lib/products'
import { cn } from '@/lib/utils'
import { NewGroupWizard, NewGroupResult, WizardPrefill, PRODUCT_DESC } from './NewGroupWizard'

// ── Role → product access mapping ───────────────────────────────────────────

const ROLE_PRODUCTS: Record<string, AppName[]> = {
  'Super Admin': [
    'Estimating', 'Quotes', 'Pre-Construction', 'Desktop',
    'Manager', 'Safety', 'Skills', 'Forms', 'Docs & Plans', 'myField', 'Resource Planner',
    'Telematics', 'Maintenance',
    'Chats', 'Copilot', 'Additional Access',
  ],
  'Admin': [
    'Manager', 'Safety', 'Skills', 'Forms', 'Docs & Plans', 'myField', 'Resource Planner',
    'Estimating', 'Quotes', 'Pre-Construction',
    'Chats', 'Copilot', 'Additional Access',
  ],
  'Project Manager': [
    'Manager', 'Safety', 'Estimating', 'Quotes', 'Pre-Construction', 'Chats',
  ],
  'Field Supervisor': [
    'Manager', 'Safety', 'Skills', 'Forms', 'myField', 'Resource Planner',
  ],
  'Estimator': [
    'Estimating', 'Quotes', 'Pre-Construction', 'Desktop', 'Manager',
  ],
  'Foreman': [
    'Manager', 'Safety', 'Forms', 'myField',
  ],
  'Safety Manager': [
    'Manager', 'Safety',
  ],
  'Operator': [
    'Manager', 'myField',
  ],
  'Payroll Admin': [
    'Manager',
  ],
}

const JOB_TITLE_TO_ROLE: Record<string, string> = {
  'System Administrator':         'Super Admin',
  'Platform Administrator':       'Admin',
  'Senior Project Manager':       'Project Manager',
  'Field Operations Supervisor':  'Field Supervisor',
  'Senior Estimator':             'Estimator',
  'Estimator':                    'Estimator',
  'Construction Foreman':         'Foreman',
  'Safety & Compliance Manager':  'Safety Manager',
  'Equipment Operator':           'Operator',
  'Payroll Administrator':        'Payroll Admin',
}

// ── Data derivation ─────────────────────────────────────────────────────────

const MOCK_DATES = [
  'Feb 15, 2026', 'Feb 10, 2026', 'Jan 28, 2026', 'Feb 3, 2026',
  'Jan 15, 2026', 'Dec 22, 2025', 'Feb 14, 2026', 'Nov 30, 2025',
  'Jan 8, 2026',  'Oct 12, 2025',
]

interface CategorySection {
  category: ProductCategory
  products: AppName[]
}

interface LicenseGroup {
  id: string
  title: string
  role: string
  description: string
  memberCount: number
  modifiedDate: string
  sections: CategorySection[]
  members: User[]
}

function buildGroups(): LicenseGroup[] {
  const byTitle = new Map<string, User[]>()
  users.forEach(u => {
    const arr = byTitle.get(u.jobTitle) ?? []
    arr.push(u)
    byTitle.set(u.jobTitle, arr)
  })

  let idx = 0
  return Array.from(byTitle.entries())
    .map(([title, members]) => {
      const role = JOB_TITLE_TO_ROLE[title] ?? title
      const roleProducts = ROLE_PRODUCTS[role] ?? []

      const sections: CategorySection[] = CATEGORIES.map(cat => ({
        category: cat.name,
        products: cat.products.filter(p => roleProducts.includes(p)),
      }))

      return {
        id: title.toLowerCase().replace(/\s+/g, '-'),
        title,
        role,
        description: '',
        memberCount: members.length,
        modifiedDate: MOCK_DATES[idx++ % MOCK_DATES.length],
        sections,
        members,
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title))
}

const INITIAL_GROUPS = buildGroups()

type FilterCategory = 'All' | ProductCategory
const FILTER_OPTIONS: FilterCategory[] = ['All', 'HeavyBid', 'HeavyJob', 'Fleet', 'Platform']

// ── Three-dot overflow menu ──────────────────────────────────────────────────

const MENU_ITEMS = [
  { label: 'Edit',        icon: Pencil, destructive: false, action: 'edit'   as const },
  { label: 'Create Copy', icon: Copy,   destructive: false, action: 'copy'   as const },
  { label: 'Delete Role', icon: Trash2, destructive: true,  action: 'delete' as const },
]

type MenuAction = typeof MENU_ITEMS[number]['action']

function CardMenu({
  onEdit,
  onCopy,
  onDelete,
}: {
  onEdit: () => void
  onCopy: () => void
  onDelete: () => void
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

  const handlers: Record<MenuAction, () => void> = { edit: onEdit, copy: onCopy, delete: onDelete }

  return (
    <div ref={ref} className="relative shrink-0 -mt-0.5 -mr-0.5">
      <button
        className="rounded p-1 hover:bg-gray-100 transition-colors"
        onClick={e => { e.stopPropagation(); setOpen(o => !o) }}
      >
        <MoreHorizontal className="h-4 w-4 text-gray-400" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 rounded-md border border-gray-200 bg-white shadow-lg z-50 py-1">
          {MENU_ITEMS.map(item => (
            <button
              key={item.label}
              className={cn(
                'flex items-center gap-2.5 w-full px-3 py-1.5 text-sm text-left transition-colors',
                item.destructive
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
              onClick={e => { e.stopPropagation(); setOpen(false); handlers[item.action]() }}
            >
              <item.icon className="h-3.5 w-3.5 shrink-0" />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Card component ───────────────────────────────────────────────────────────

function GroupCard({
  group,
  onEdit,
  onCopy,
  onDelete,
}: {
  group: LicenseGroup
  onEdit: () => void
  onCopy: () => void
  onDelete: () => void
}) {
  const hasAnyAccess = group.sections.some(s => s.products.length > 0)

  return (
    <div className="rounded-lg border bg-white p-4 hover:shadow-sm transition-shadow flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug">{group.title}</h3>
          <p className="text-xs text-gray-500 mt-0.5">Role: {group.role}</p>
        </div>
        <CardMenu onEdit={onEdit} onCopy={onCopy} onDelete={onDelete} />
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="secondary" className="text-xs flex items-center gap-1">
          <Users className="h-3 w-3" />
          {group.memberCount} {group.memberCount === 1 ? 'member' : 'members'}
        </Badge>
        <span className="text-xs text-gray-400">Modified {group.modifiedDate}</span>
      </div>

      {/* Category sections */}
      {hasAnyAccess && (
        <div className="border-t border-gray-100 pt-3 space-y-2">
          {group.sections.map(sec => (
            <div key={sec.category} className="flex items-start gap-2">
              <span className="text-xs font-medium text-gray-500 w-24 shrink-0 pt-0.5">{sec.category}</span>
              {sec.products.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {sec.products.map(p => (
                    <Badge
                      key={p}
                      variant={CATEGORY_BADGE_VARIANT[PRODUCT_CATEGORY[p]]}
                      className="text-xs"
                    >
                      {p}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-gray-300 italic">No access</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Edit Group Modal ─────────────────────────────────────────────────────────

function EditGroupModal({
  group,
  open,
  onClose,
  onSave,
}: {
  group: LicenseGroup | null
  open: boolean
  onClose: () => void
  onSave: (id: string, name: string, desc: string, products: AppName[]) => void
}) {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [selected, setSelected] = useState<AppName[]>([])

  useEffect(() => {
    if (open && group) {
      setName(group.title)
      setDesc(group.description)
      setSelected(group.sections.flatMap(s => s.products))
    }
  }, [open, group])

  const toggle = (p: AppName) =>
    setSelected(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])

  const toggleAll = (products: AppName[], selectAll: boolean) =>
    setSelected(prev =>
      selectAll
        ? [...new Set([...prev, ...products])]
        : prev.filter(p => !products.includes(p))
    )

  if (!open || !group) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl border flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">Edit Group</h2>
          <button
            onClick={onClose}
            className="rounded-sm p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Group Name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Description</Label>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f2137] focus:border-transparent resize-none"
              rows={3}
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Describe this access group's purpose…"
            />
          </div>

          {/* Products */}
          <div>
            <div className="text-sm font-medium text-gray-900 mb-4">Products</div>
            <div className="space-y-6">
              {CATEGORIES.map(cat => {
                const allSelected = cat.products.every(p => selected.includes(p))
                return (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={cn('text-xs font-semibold uppercase tracking-wide', cat.color)}>
                        {cat.name}
                      </span>
                      <button
                        type="button"
                        className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => toggleAll(cat.products, !allSelected)}
                      >
                        {allSelected ? 'Deselect all' : 'Select all'}
                      </button>
                    </div>
                    <div className="space-y-2.5">
                      {cat.products.map(p => (
                        <label key={p} className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#0f2137] shrink-0"
                            checked={selected.includes(p)}
                            onChange={() => toggle(p)}
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 group-hover:text-[#0f2137] transition-colors leading-snug">
                              {p}
                            </div>
                            <div className="text-xs text-gray-400">{PRODUCT_DESC[p]}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t shrink-0">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button
            disabled={!name.trim()}
            onClick={() => onSave(group.id, name.trim(), desc, selected)}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── Delete Confirm Dialog ────────────────────────────────────────────────────

function DeleteConfirmDialog({
  group,
  open,
  onClose,
  onConfirm,
}: {
  group: LicenseGroup | null
  open: boolean
  onClose: () => void
  onConfirm: () => void
}) {
  if (!open || !group) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 w-full max-w-sm mx-4 bg-white rounded-lg shadow-xl border p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-1">Delete Role</h2>
        <p className="text-sm text-gray-600 mb-1">
          Are you sure you want to delete{' '}
          <span className="font-medium text-gray-900">{group.title}</span>?
        </p>
        <p className="text-sm text-gray-400 mb-6">This action cannot be undone.</p>
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function LicenseAssignmentPage() {
  const [groups, setGroups] = useState<LicenseGroup[]>(INITIAL_GROUPS)
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState<FilterCategory>('All')

  const [wizardOpen, setWizardOpen] = useState(false)
  const [wizardPrefill, setWizardPrefill] = useState<WizardPrefill | undefined>()
  const [editGroup, setEditGroup] = useState<LicenseGroup | null>(null)
  const [deleteGroup, setDeleteGroup] = useState<LicenseGroup | null>(null)

  function buildSections(products: AppName[]): CategorySection[] {
    return CATEGORIES.map(cat => ({
      category: cat.name,
      products: cat.products.filter(p => products.includes(p)),
    }))
  }

  function today() {
    return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  function handleCreate({ name, desc, products }: NewGroupResult) {
    const newGroup: LicenseGroup = {
      id: name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      title: name,
      role: name,
      description: desc,
      memberCount: 0,
      modifiedDate: today(),
      sections: buildSections(products),
      members: [] as User[],
    }
    setGroups(prev => [...prev, newGroup].sort((a, b) => a.title.localeCompare(b.title)))
  }

  function handleSaveEdit(id: string, name: string, desc: string, products: AppName[]) {
    setGroups(prev =>
      prev
        .map(g =>
          g.id === id
            ? { ...g, title: name, description: desc, sections: buildSections(products), modifiedDate: today() }
            : g
        )
        .sort((a, b) => a.title.localeCompare(b.title))
    )
    setEditGroup(null)
  }

  function handleConfirmDelete() {
    if (!deleteGroup) return
    setGroups(prev => prev.filter(g => g.id !== deleteGroup.id))
    setDeleteGroup(null)
  }

  const filtered = groups.filter(g => {
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      filterCat === 'All' ||
      g.sections.some(s => s.category === filterCat && s.products.length > 0)
    return matchSearch && matchFilter
  })

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search groups…"
              className="pl-8"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Select
            value={filterCat}
            onChange={e => setFilterCat(e.target.value as FilterCategory)}
            className="w-44"
          >
            {FILTER_OPTIONS.map(o => (
              <option key={o} value={o}>{o === 'All' ? 'Show: All' : o + ' Access'}</option>
            ))}
          </Select>
        </div>
        <Button
          size="sm"
          onClick={() => { setWizardPrefill(undefined); setWizardOpen(true) }}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Group
        </Button>
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Users className="h-10 w-10 text-gray-200 mb-3" />
          <p className="text-sm text-gray-500">No groups match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(group => (
            <GroupCard
              key={group.id}
              group={group}
              onEdit={() => setEditGroup(group)}
              onCopy={() => {
                setWizardPrefill({
                  name: `Copy of ${group.title}`,
                  desc: group.description,
                  products: group.sections.flatMap(s => s.products),
                })
                setWizardOpen(true)
              }}
              onDelete={() => setDeleteGroup(group)}
            />
          ))}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-400">{filtered.length} group{filtered.length !== 1 ? 's' : ''}</div>

      {/* Modals */}
      <NewGroupWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onCreate={handleCreate}
        prefill={wizardPrefill}
      />
      <EditGroupModal
        group={editGroup}
        open={editGroup !== null}
        onClose={() => setEditGroup(null)}
        onSave={handleSaveEdit}
      />
      <DeleteConfirmDialog
        group={deleteGroup}
        open={deleteGroup !== null}
        onClose={() => setDeleteGroup(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
