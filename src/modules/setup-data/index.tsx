import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Plus, MoreHorizontal, Building2 } from 'lucide-react'
import {
  employees, equipment, materials, locations, costStructures, businessUnits, jobs,
} from '@/data/setupData'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Select } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

function SearchableTable({
  children,
  addLabel,
  count,
}: {
  children: React.ReactNode
  addLabel: string
  count: number
}) {
  const [search, setSearch] = useState('')
  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search…" className="pl-8" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Button size="sm">
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
    <button className="rounded p-1 hover:bg-gray-100">
      <MoreHorizontal className="h-4 w-4 text-gray-400" />
    </button>
  )
}

function EmployeesTab() {
  return (
    <SearchableTable addLabel="Add Employee" count={employees.length}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Title</TableHead>
            <TableHead>Department</TableHead><TableHead>Status</TableHead>
            <TableHead>Hire Date</TableHead><TableHead>Apps</TableHead><TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map(e => (
            <TableRow key={e.id}>
              <TableCell><code className="text-xs">{e.id}</code></TableCell>
              <TableCell className="font-medium">{e.name}</TableCell>
              <TableCell className="text-sm text-gray-600">{e.title}</TableCell>
              <TableCell className="text-sm text-gray-500">{e.department}</TableCell>
              <TableCell>
                <Badge variant={e.status === 'Active' ? 'success' : e.status === 'On Leave' ? 'warning' : 'secondary'}>
                  {e.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-500">{e.hireDate}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {e.assignedApps.slice(0, 2).map(a => <Badge key={a} variant="info" className="text-xs">{a}</Badge>)}
                  {e.assignedApps.length > 2 && <Badge variant="outline" className="text-xs">+{e.assignedApps.length - 2}</Badge>}
                  {e.assignedApps.length === 0 && <span className="text-xs text-gray-400">None</span>}
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

function EquipmentTab() {
  return (
    <SearchableTable addLabel="Add Equipment" count={equipment.length}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset ID</TableHead><TableHead>Name</TableHead><TableHead>Type</TableHead>
            <TableHead>Category</TableHead><TableHead>Status</TableHead>
            <TableHead>Location</TableHead><TableHead>Year</TableHead><TableHead>Operator</TableHead><TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map(e => (
            <TableRow key={e.assetId}>
              <TableCell><code className="text-xs">{e.assetId}</code></TableCell>
              <TableCell className="font-medium">{e.name}</TableCell>
              <TableCell className="text-sm text-gray-600">{e.type}</TableCell>
              <TableCell><Badge variant="secondary" className="text-xs">{e.category}</Badge></TableCell>
              <TableCell>
                <Badge variant={e.status === 'Active' ? 'success' : e.status === 'In Maintenance' ? 'warning' : 'secondary'}>
                  {e.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-500 max-w-[140px] truncate">{e.location}</TableCell>
              <TableCell className="text-sm text-gray-500">{e.year}</TableCell>
              <TableCell className="text-sm text-gray-600">{e.operator}</TableCell>
              <TableCell><RowActions /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SearchableTable>
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
  const tab = searchParams.get('tab') ?? 'employees'
  const setTab = (v: string) => setSearchParams({ tab: v })

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Setup Data</h1>
        <p className="text-sm text-gray-500 mt-1">Manage master data used across HCSS products</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-6 flex-wrap gap-1 h-auto">
          {[
            { value: 'employees', label: 'Employees' },
            { value: 'equipment', label: 'Equipment' },
            { value: 'materials', label: 'Materials' },
            { value: 'locations', label: 'Locations' },
            { value: 'costStructures', label: 'Cost Structures' },
            { value: 'businessUnits', label: 'Business Units' },
            { value: 'jobs', label: 'Jobs' },
            { value: 'companyDefaults', label: 'Company Defaults' },
          ].map(t => (
            <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="employees"><EmployeesTab /></TabsContent>
        <TabsContent value="equipment"><EquipmentTab /></TabsContent>
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
