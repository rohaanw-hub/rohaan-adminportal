import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Employee, EmployeeStatus, AppName } from '@/types'
import { businessUnits as buList } from '@/data/setupData'
import { CATEGORIES } from '@/lib/products'
import { Sheet, SheetHeader, SheetTitle, SheetClose, SheetContent, SheetFooter } from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { MultiSelect } from '@/components/ui/multiselect'

interface EmployeePanelProps {
  employee: Employee | null
  open: boolean
  onClose: () => void
  onSave: (emp: Employee) => void
}

type EmpTab = 'common' | 'hj' | 'dispatcher' | 'rp'

const STATUS_OPTIONS: EmployeeStatus[] = ['Active', 'Inactive', 'On Leave']

const ACTIVE_COLORS: Record<string, string> = {
  HeavyBid: 'bg-green-100 text-green-800 border-green-200',
  HeavyJob: 'bg-blue-100 text-blue-800 border-blue-200',
  Fleet:    'bg-teal-100 text-teal-800 border-teal-200',
  Platform: 'bg-purple-100 text-purple-800 border-purple-200',
}

function AppToggle({ apps, onChange }: { apps: AppName[]; onChange: (a: AppName[]) => void }) {
  return (
    <div className="space-y-3">
      {CATEGORIES.map(cat => (
        <div key={cat.name}>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{cat.name}</div>
          <div className="flex flex-wrap gap-1.5">
            {cat.products.map(app => {
              const active = apps.includes(app)
              return (
                <button
                  key={app}
                  type="button"
                  onClick={() => onChange(active ? apps.filter(a => a !== app) : [...apps, app])}
                  className={cn(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors',
                    active
                      ? ACTIVE_COLORS[cat.name]
                      : 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100 hover:text-gray-600'
                  )}
                >
                  {app}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('space-y-1', className)}>
      <Label className="text-xs text-gray-500">{label}</Label>
      {children}
    </div>
  )
}

function CheckField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 accent-[#0f2137]"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <Label className="text-sm cursor-pointer">{label}</Label>
    </div>
  )
}

type FormState = Record<string, string | boolean>

function initForm(employee: Employee | null): FormState {
  // Pre-split name into firstName/lastName if not already set
  const nameParts = (employee?.name ?? '').split(' ')
  return {
    title: employee?.title ?? '',
    department: employee?.department ?? '',
    status: employee?.status ?? 'Active',
    hireDate: employee?.hireDate ?? '',
    code: employee?.code ?? employee?.id ?? '',
    firstName: employee?.firstName ?? nameParts[0] ?? '',
    middleInitial: employee?.middleInitial ?? '',
    lastName: employee?.lastName ?? nameParts.slice(1).join(' ') ?? '',
    suffix: employee?.suffix ?? '',
    email: employee?.email ?? '',
    active: employee?.active ?? true,
    payClass: employee?.payClass ?? '',
    address1: employee?.address1 ?? '',
    address2: employee?.address2 ?? '',
    city: employee?.city ?? '',
    state: employee?.state ?? '',
    zip: employee?.zip ?? '',
    country: employee?.country ?? '',
    phone: employee?.phone ?? '',
    mobilePhone: employee?.mobilePhone ?? '',
    otherPhone: employee?.otherPhone ?? '',
    employeeType: employee?.employeeType ?? '',
    salaried: employee?.salaried ?? false,
    assignedEquipment: employee?.assignedEquipment ?? '',
    costAdjustments: employee?.costAdjustments ?? '',
    jobAssignments: employee?.jobAssignments ?? '',
    hjAccountingCode: employee?.hjAccountingCode ?? '',
    hideEmployee: employee?.hideEmployee ?? false,
    homeRegion: employee?.homeRegion ?? '',
    dispatcherStatus: employee?.dispatcherStatus ?? '',
    dispatcherPhone: employee?.dispatcherPhone ?? '',
    county: employee?.county ?? '',
    hourlyRate: employee?.hourlyRate ?? '',
    dispatcherAccountingCode: employee?.dispatcherAccountingCode ?? '',
    generalNote: employee?.generalNote ?? '',
    restrictions: employee?.restrictions ?? '',
    comments: employee?.comments ?? '',
    rpRestrictions: employee?.rpRestrictions ?? '',
    rpComments: employee?.rpComments ?? '',
  }
}

const BU_OPTIONS = buList.map(b => ({ label: `${b.code} — ${b.name}`, value: b.code }))

export function EmployeePanel({ employee, open, onClose, onSave }: EmployeePanelProps) {
  const [tab, setTab] = useState<EmpTab>('common')
  const [form, setForm] = useState<FormState>(() => initForm(employee))
  const [apps, setApps] = useState<AppName[]>([])
  const [bus, setBus] = useState<string[]>([])

  useEffect(() => {
    setForm(initForm(employee))
    setApps(employee?.assignedApps ?? [])
    setBus(employee?.businessUnits ?? [])
    setTab('common')
  }, [employee, open])

  const str = (k: string) => (form[k] as string) ?? ''
  const bool = (k: string) => (form[k] as boolean) ?? false
  const setStr = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))
  const setBool = (k: string) => (v: boolean) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    const firstName = str('firstName')
    const lastName = str('lastName')
    const fullName = [firstName, str('middleInitial'), lastName].filter(Boolean).join(' ') || `${firstName} ${lastName}`.trim()
    onSave({
      id: employee?.id ?? '',
      name: fullName,
      title: str('title'),
      department: str('department'),
      status: (str('status') as EmployeeStatus) || 'Active',
      hireDate: str('hireDate'),
      assignedApps: apps,
      businessUnits: bus.length > 0 ? bus : undefined,
      code: str('code') || undefined,
      firstName: firstName || undefined,
      middleInitial: str('middleInitial') || undefined,
      lastName: lastName || undefined,
      suffix: str('suffix') || undefined,
      email: str('email') || undefined,
      active: bool('active'),
      payClass: str('payClass') || undefined,
      address1: str('address1') || undefined,
      address2: str('address2') || undefined,
      city: str('city') || undefined,
      state: str('state') || undefined,
      zip: str('zip') || undefined,
      country: str('country') || undefined,
      phone: str('phone') || undefined,
      mobilePhone: str('mobilePhone') || undefined,
      otherPhone: str('otherPhone') || undefined,
      employeeType: str('employeeType') || undefined,
      salaried: bool('salaried'),
      assignedEquipment: str('assignedEquipment') || undefined,
      costAdjustments: str('costAdjustments') || undefined,
      jobAssignments: str('jobAssignments') || undefined,
      hjAccountingCode: str('hjAccountingCode') || undefined,
      hideEmployee: bool('hideEmployee'),
      homeRegion: str('homeRegion') || undefined,
      dispatcherStatus: str('dispatcherStatus') || undefined,
      dispatcherPhone: str('dispatcherPhone') || undefined,
      county: str('county') || undefined,
      hourlyRate: str('hourlyRate') || undefined,
      dispatcherAccountingCode: str('dispatcherAccountingCode') || undefined,
      generalNote: str('generalNote') || undefined,
      restrictions: str('restrictions') || undefined,
      comments: str('comments') || undefined,
      rpRestrictions: str('rpRestrictions') || undefined,
      rpComments: str('rpComments') || undefined,
    })
  }

  return (
    <Sheet open={open} onOpenChange={onClose} className="max-w-2xl">
      <SheetHeader>
        <SheetTitle>{employee ? 'Edit Employee' : 'Add Employee'}</SheetTitle>
        <SheetClose onClose={onClose} />
      </SheetHeader>
      <SheetContent>
        <Tabs value={tab} onValueChange={v => setTab(v as EmpTab)}>
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="common">Common Data</TabsTrigger>
            <TabsTrigger value="hj">HJ Fields</TabsTrigger>
            <TabsTrigger value="dispatcher">Dispatcher</TabsTrigger>
            <TabsTrigger value="rp">Resource Planner</TabsTrigger>
          </TabsList>

          {/* ── Common Data ── */}
          <TabsContent value="common" className="mt-0">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {/* Checkbox first */}
              <div className="col-span-2 flex items-center gap-6 pb-1">
                <CheckField label="Active" checked={bool('active')} onChange={setBool('active')} />
              </div>
              <Field label="Code"><Input value={str('code')} onChange={setStr('code')} /></Field>
              <Field label="Employee Type"><Input value={str('employeeType')} onChange={setStr('employeeType')} /></Field>
              <Field label="First Name"><Input value={str('firstName')} onChange={setStr('firstName')} /></Field>
              <Field label="Middle Initial"><Input value={str('middleInitial')} onChange={setStr('middleInitial')} /></Field>
              <Field label="Last Name"><Input value={str('lastName')} onChange={setStr('lastName')} /></Field>
              <Field label="Suffix"><Input value={str('suffix')} onChange={setStr('suffix')} /></Field>
              <Field label="Title"><Input value={str('title')} onChange={setStr('title')} /></Field>
              <Field label="Department"><Input value={str('department')} onChange={setStr('department')} /></Field>
              <Field label="Email"><Input value={str('email')} onChange={setStr('email')} /></Field>
              <Field label="Pay Class"><Input value={str('payClass')} onChange={setStr('payClass')} /></Field>
              <Field label="Status">
                <Select value={str('status')} onChange={setStr('status')}>
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </Select>
              </Field>
              <Field label="Hire Date"><Input type="date" value={str('hireDate')} onChange={setStr('hireDate')} /></Field>
              <Field label="Address 1"><Input value={str('address1')} onChange={setStr('address1')} /></Field>
              <Field label="Address 2"><Input value={str('address2')} onChange={setStr('address2')} /></Field>
              <Field label="City"><Input value={str('city')} onChange={setStr('city')} /></Field>
              <Field label="State"><Input value={str('state')} onChange={setStr('state')} /></Field>
              <Field label="Zip"><Input value={str('zip')} onChange={setStr('zip')} /></Field>
              <Field label="Country"><Input value={str('country')} onChange={setStr('country')} /></Field>
              <Field label="Phone"><Input value={str('phone')} onChange={setStr('phone')} /></Field>
              <Field label="Mobile Phone"><Input value={str('mobilePhone')} onChange={setStr('mobilePhone')} /></Field>
              <Field label="Other Phone"><Input value={str('otherPhone')} onChange={setStr('otherPhone')} /></Field>
              {/* Apps */}
              <Field label="Apps" className="col-span-2">
                <AppToggle apps={apps} onChange={setApps} />
              </Field>
              {/* Business Units */}
              <Field label="Business Units" className="col-span-2">
                <MultiSelect options={BU_OPTIONS} value={bus} onChange={setBus} placeholder="Select business units…" />
              </Field>
            </div>
          </TabsContent>

          {/* ── HJ Fields ── */}
          <TabsContent value="hj" className="mt-0">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {/* Checkbox first */}
              <div className="col-span-2 flex items-center gap-6 pb-1">
                <CheckField label="Salaried" checked={bool('salaried')} onChange={setBool('salaried')} />
              </div>
              <Field label="Accounting Code"><Input value={str('hjAccountingCode')} onChange={setStr('hjAccountingCode')} /></Field>
              <Field label="Assigned Equipment"><Input value={str('assignedEquipment')} onChange={setStr('assignedEquipment')} /></Field>
              <Field label="Cost Adjustments"><Input value={str('costAdjustments')} onChange={setStr('costAdjustments')} /></Field>
              <Field label="Job Assignments"><Input value={str('jobAssignments')} onChange={setStr('jobAssignments')} /></Field>
            </div>
          </TabsContent>

          {/* ── Dispatcher ── */}
          <TabsContent value="dispatcher" className="mt-0">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {/* Checkbox first */}
              <div className="col-span-2 flex items-center gap-6 pb-1">
                <CheckField label="Hide Employee" checked={bool('hideEmployee')} onChange={setBool('hideEmployee')} />
              </div>
              <Field label="Home Region"><Input value={str('homeRegion')} onChange={setStr('homeRegion')} /></Field>
              <Field label="Status"><Input value={str('dispatcherStatus')} onChange={setStr('dispatcherStatus')} /></Field>
              <Field label="Phone"><Input value={str('dispatcherPhone')} onChange={setStr('dispatcherPhone')} /></Field>
              <Field label="County"><Input value={str('county')} onChange={setStr('county')} /></Field>
              <Field label="Hourly Rate"><Input value={str('hourlyRate')} onChange={setStr('hourlyRate')} /></Field>
              <Field label="Accounting Code"><Input value={str('dispatcherAccountingCode')} onChange={setStr('dispatcherAccountingCode')} /></Field>
              <Field label="General Note" className="col-span-2"><Input value={str('generalNote')} onChange={setStr('generalNote')} /></Field>
              <Field label="Restrictions" className="col-span-2"><Input value={str('restrictions')} onChange={setStr('restrictions')} /></Field>
              <Field label="Comments" className="col-span-2"><Input value={str('comments')} onChange={setStr('comments')} /></Field>
            </div>
          </TabsContent>

          {/* ── Resource Planner ── */}
          <TabsContent value="rp" className="mt-0">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <Field label="Restrictions" className="col-span-2"><Input value={str('rpRestrictions')} onChange={setStr('rpRestrictions')} /></Field>
              <Field label="Comments" className="col-span-2"><Input value={str('rpComments')} onChange={setStr('rpComments')} /></Field>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
      <SheetFooter>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </SheetFooter>
    </Sheet>
  )
}
