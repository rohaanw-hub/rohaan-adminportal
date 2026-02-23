import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Plus, MoreHorizontal, Building2 } from 'lucide-react'
import {
  employees as initialEmployees,
  assets as initialAssets,
  materials, locations, costStructures, businessUnits, jobs,
} from '@/data/setupData'
import { Employee, Asset, AppName } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Select } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { EmployeePanel } from './EmployeePanel'
import { AssetPanel } from './AssetPanel'

const APP_LABELS: Record<AppName, string> = {
  HeavyJob: 'HeavyJob', HeavyBid: 'HeavyBid', HeavyConnect: 'HeavyConnect',
  Dispatcher: 'Dispatcher', telematics: 'Telematics', Safety: 'Safety',
}

const BU_LABELS: Record<string, string> = {
  GCO: 'Gulf Coast Ops',
  NTD: 'North Texas Div',
  STD: 'South Texas Div',
  CTO: 'Central Texas Ops',
  FPG: 'Federal Projects',
}

function AppBadges({ apps = [] }: { apps?: AppName[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {apps.slice(0, 2).map(a => (
        <Badge key={a} variant="info" className="text-xs">{APP_LABELS[a]}</Badge>
      ))}
      {apps.length > 2 && (
        <div className="relative group">
          <Badge variant="outline" className="text-xs cursor-default">+{apps.length - 2}</Badge>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col gap-1 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-50 min-w-max">
            {apps.slice(2).map(a => (
              <Badge key={a} variant="info" className="text-xs">{APP_LABELS[a]}</Badge>
            ))}
          </div>
        </div>
      )}
      {apps.length === 0 && <span className="text-xs text-gray-400">None</span>}
    </div>
  )
}

function BuBadge({ code }: { code: string }) {
  return (
    <div className="relative group">
      <Badge variant="secondary" className="text-xs cursor-default">{code}</Badge>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50 pointer-events-none">
        {BU_LABELS[code] ?? code}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  )
}

function BuBadges({ bus = [] }: { bus?: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {bus.slice(0, 2).map(b => <BuBadge key={b} code={b} />)}
      {bus.length > 2 && (
        <div className="relative group">
          <Badge variant="outline" className="text-xs cursor-default">+{bus.length - 2}</Badge>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col gap-1 bg-white border border-gray-200 rounded-md shadow-lg p-2 z-50 min-w-max">
            {bus.slice(2).map(b => (
              <Badge key={b} variant="secondary" className="text-xs">{b} — {BU_LABELS[b] ?? b}</Badge>
            ))}
          </div>
        </div>
      )}
      {bus.length === 0 && <span className="text-xs text-gray-400">None</span>}
    </div>
  )
}

function SearchableTable({
  children,
  addLabel,
  count,
  onAdd,
}: {
  children: React.ReactNode
  addLabel: string
  count: number
  onAdd?: () => void
}) {
  const [search, setSearch] = useState('')
  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search…" className="pl-8" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Button size="sm" onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" />{addLabel}
        </Button>
      </div>
      <div className="rounded-lg border bg-white">
        {children}
      </div>
      <div className="mt-2 text-xs text-gray-500">{count} records</div>
    </div>
  )
}

function RowActions() {
  return (
    <button className="rounded p-1 hover:bg-gray-100" onClick={e => e.stopPropagation()}>
      <MoreHorizontal className="h-4 w-4 text-gray-400" />
    </button>
  )
}

function EmployeesTab({
  employees,
  setEmployees,
}: {
  employees: Employee[]
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>
}) {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)

  const handleRowClick = (e: Employee) => {
    setSelectedEmployee(e)
    setPanelOpen(true)
  }

  const handleAdd = () => {
    setSelectedEmployee(null)
    setPanelOpen(true)
  }

  const handleSave = (emp: Employee) => {
    if (!emp.id) {
      const newId = `E-${String(employees.length + 1).padStart(3, '0')}`
      setEmployees(prev => [...prev, { ...emp, id: newId }])
    } else {
      setEmployees(prev => prev.map(e => e.id === emp.id ? emp : e))
    }
    setPanelOpen(false)
  }

  return (
    <>
      <SearchableTable addLabel="Add Employee" count={employees.length} onAdd={handleAdd}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Hire Date</TableHead>
              <TableHead>Apps</TableHead>
              <TableHead>Business Units</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map(e => {
              const nameParts = e.name.split(' ')
              const firstName = e.firstName ?? nameParts[0] ?? ''
              const lastName = e.lastName ?? nameParts.slice(1).join(' ') ?? ''
              return (
                <TableRow
                  key={e.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(e)}
                >
                  <TableCell><code className="text-xs">{e.id}</code></TableCell>
                  <TableCell className="font-medium">{firstName}</TableCell>
                  <TableCell className="font-medium">{lastName}</TableCell>
                  <TableCell className="text-sm text-gray-600">{e.title}</TableCell>
                  <TableCell className="text-sm text-gray-500">{e.department}</TableCell>
                  <TableCell>
                    <Badge variant={e.status === 'Active' ? 'success' : e.status === 'On Leave' ? 'warning' : 'secondary'}>
                      {e.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{e.hireDate}</TableCell>
                  <TableCell><AppBadges apps={e.assignedApps} /></TableCell>
                  <TableCell><BuBadges bus={e.businessUnits} /></TableCell>
                  <TableCell><RowActions /></TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </SearchableTable>
      <EmployeePanel
        employee={selectedEmployee}
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        onSave={handleSave}
      />
    </>
  )
}

function AssetsTab({
  assets,
  setAssets,
}: {
  assets: Asset[]
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>
}) {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)

  const handleRowClick = (eq: Asset) => {
    setSelectedAsset(eq)
    setPanelOpen(true)
  }

  const handleAdd = () => {
    setSelectedAsset(null)
    setPanelOpen(true)
  }

  const handleSave = (asset: Asset) => {
    if (!asset.assetId) {
      const newId = `EQ-${String(assets.length + 1).padStart(3, '0')}`
      setAssets(prev => [...prev, { ...asset, assetId: newId }])
    } else {
      setAssets(prev => prev.map(e => e.assetId === asset.assetId ? asset : e))
    }
    setPanelOpen(false)
  }

  return (
    <>
      <SearchableTable addLabel="Add Asset" count={assets.length} onAdd={handleAdd}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Apps</TableHead>
              <TableHead>Business Units</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map(e => (
              <TableRow
                key={e.assetId}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(e)}
              >
                <TableCell><code className="text-xs">{e.assetId}</code></TableCell>
                <TableCell className="font-medium">{e.name}</TableCell>
                <TableCell className="text-sm text-gray-600">{e.type}</TableCell>
                <TableCell>
                  <Badge variant={e.status === 'Active' ? 'success' : e.status === 'In Maintenance' ? 'warning' : 'secondary'}>
                    {e.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-500 max-w-[140px] truncate">{e.location}</TableCell>
                <TableCell className="text-sm text-gray-500">{e.year}</TableCell>
                <TableCell><AppBadges apps={e.assignedApps} /></TableCell>
                <TableCell><BuBadges bus={e.businessUnits} /></TableCell>
                <TableCell><RowActions /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SearchableTable>
      <AssetPanel
        asset={selectedAsset}
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        onSave={handleSave}
      />
    </>
  )
}

function MaterialsTab() {
  return (
    <SearchableTable addLabel="Add Material" count={materials.length}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead><TableHead>Description</TableHead><TableHead>Unit</TableHead>
            <TableHead>Unit Cost</TableHead><TableHead>Category</TableHead><TableHead>Last Updated</TableHead><TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map(m => (
            <TableRow key={m.code}>
              <TableCell><code className="text-xs">{m.code}</code></TableCell>
              <TableCell className="text-sm font-medium max-w-xs">{m.description}</TableCell>
              <TableCell><Badge variant="secondary" className="text-xs">{m.unit}</Badge></TableCell>
              <TableCell className="font-medium">${m.unitCost.toFixed(2)}</TableCell>
              <TableCell><Badge variant="info" className="text-xs">{m.category}</Badge></TableCell>
              <TableCell className="text-sm text-gray-500">{m.lastUpdated}</TableCell>
              <TableCell><RowActions /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SearchableTable>
  )
}

function LocationsTab() {
  return (
    <SearchableTable addLabel="Add Location" count={locations.length}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead><TableHead>Name</TableHead><TableHead>Type</TableHead>
            <TableHead>Address</TableHead><TableHead>Region</TableHead><TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map(l => (
            <TableRow key={l.code}>
              <TableCell><code className="text-xs">{l.code}</code></TableCell>
              <TableCell className="font-medium">{l.name}</TableCell>
              <TableCell>
                <Badge variant={l.type === 'Yard' ? 'info' : l.type === 'Job Site' ? 'warning' : 'secondary'} className="text-xs">
                  {l.type}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-500 max-w-xs truncate">{l.address}</TableCell>
              <TableCell className="text-sm text-gray-500">{l.region}</TableCell>
              <TableCell><RowActions /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SearchableTable>
  )
}

function CostStructuresTab() {
  return (
    <SearchableTable addLabel="Add Cost Code" count={costStructures.length}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead><TableHead>Description</TableHead><TableHead>Type</TableHead>
            <TableHead>Rate</TableHead><TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {costStructures.map(c => (
            <TableRow key={c.code}>
              <TableCell><code className="text-xs">{c.code}</code></TableCell>
              <TableCell className="font-medium text-sm">{c.description}</TableCell>
              <TableCell>
                <Badge variant={
                  c.type === 'Labor' ? 'info' :
                  c.type === 'Equipment' ? 'warning' :
                  c.type === 'Material' ? 'success' : 'purple'
                } className="text-xs">{c.type}</Badge>
              </TableCell>
              <TableCell className="font-medium">{c.rate < 1 ? `${(c.rate * 100).toFixed(0)}%` : `$${c.rate.toFixed(2)}`}</TableCell>
              <TableCell><RowActions /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SearchableTable>
  )
}

function BusinessUnitsTab() {
  return (
    <SearchableTable addLabel="Add Business Unit" count={businessUnits.length}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead><TableHead>Code</TableHead><TableHead>Region</TableHead>
            <TableHead>Manager</TableHead><TableHead>Projects</TableHead><TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {businessUnits.map(b => (
            <TableRow key={b.code}>
              <TableCell className="font-medium">{b.name}</TableCell>
              <TableCell><code className="text-xs">{b.code}</code></TableCell>
              <TableCell className="text-sm text-gray-500">{b.region}</TableCell>
              <TableCell className="text-sm text-gray-600">{b.manager}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{b.projectsCount}</span>
                </div>
              </TableCell>
              <TableCell><RowActions /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SearchableTable>
  )
}

function JobsTab() {
  return (
    <SearchableTable addLabel="Add Job" count={jobs.length}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job #</TableHead><TableHead>Name</TableHead><TableHead>Client</TableHead>
            <TableHead>Status</TableHead><TableHead>Start Date</TableHead><TableHead>Contract Value</TableHead><TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map(j => (
            <TableRow key={j.jobNumber}>
              <TableCell><code className="text-xs">{j.jobNumber}</code></TableCell>
              <TableCell className="font-medium">{j.name}</TableCell>
              <TableCell className="text-sm text-gray-500 max-w-xs truncate">{j.client}</TableCell>
              <TableCell>
                <Badge variant={
                  j.status === 'Active' ? 'success' :
                  j.status === 'Completed' ? 'info' :
                  j.status === 'On Hold' ? 'warning' : 'secondary'
                } className="text-xs">{j.status}</Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-500">{j.startDate}</TableCell>
              <TableCell className="font-medium">${j.contractValue.toLocaleString()}</TableCell>
              <TableCell><RowActions /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SearchableTable>
  )
}

function CompanyDefaultsTab() {
  return (
    <div className="max-w-2xl">
      <div className="rounded-lg border bg-white p-6 space-y-5">
        <h3 className="font-semibold text-gray-900">Company Defaults</h3>
        {[
          { label: 'Fiscal Year Start', type: 'select', options: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], default: 'January' },
          { label: 'Default Timezone', type: 'select', options: ['America/Chicago', 'America/New_York', 'America/Denver', 'America/Los_Angeles'], default: 'America/Chicago' },
          { label: 'Default Currency', type: 'select', options: ['USD', 'CAD', 'EUR', 'MXN'], default: 'USD' },
          { label: 'Date Format', type: 'select', options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'], default: 'MM/DD/YYYY' },
          { label: 'Job Number Format', type: 'text', placeholder: 'J-{YEAR}-{SEQ}' },
          { label: 'Employee ID Format', type: 'text', placeholder: 'E-{SEQ}' },
          { label: 'Invoice Prefix', type: 'text', placeholder: 'INV-' },
        ].map(field => (
          <div key={field.label} className="flex items-center gap-4">
            <Label className="w-44 shrink-0 text-sm">{field.label}</Label>
            {field.type === 'select' ? (
              <Select className="flex-1" defaultValue={field.default}>
                {field.options?.map(o => <option key={o}>{o}</option>)}
              </Select>
            ) : (
              <Input className="flex-1" placeholder={field.placeholder} />
            )}
          </div>
        ))}
        <div className="flex justify-end pt-2">
          <Button>Save Defaults</Button>
        </div>
      </div>
    </div>
  )
}

export function SetupData() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') ?? 'businessUnits'
  const setTab = (v: string) => setSearchParams({ tab: v })

  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [assets, setAssets] = useState<Asset[]>(initialAssets)

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Setup Data</h1>
        <p className="text-sm text-gray-500 mt-1">Manage master data used across HCSS products</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsContent value="employees">
          <EmployeesTab employees={employees} setEmployees={setEmployees} />
        </TabsContent>
        <TabsContent value="assets">
          <AssetsTab assets={assets} setAssets={setAssets} />
        </TabsContent>
        <TabsContent value="materials"><MaterialsTab /></TabsContent>
        <TabsContent value="locations"><LocationsTab /></TabsContent>
        <TabsContent value="costStructures"><CostStructuresTab /></TabsContent>
        <TabsContent value="businessUnits"><BusinessUnitsTab /></TabsContent>
        <TabsContent value="jobs"><JobsTab /></TabsContent>
        <TabsContent value="companyDefaults"><CompanyDefaultsTab /></TabsContent>
      </Tabs>
    </div>
  )
}
