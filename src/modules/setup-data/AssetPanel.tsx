import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Asset, AppName } from '@/types'
import { businessUnits as buList } from '@/data/setupData'
import { CATEGORIES } from '@/lib/products'
import { Sheet, SheetHeader, SheetTitle, SheetClose, SheetContent, SheetFooter } from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { MultiSelect } from '@/components/ui/multiselect'

interface AssetPanelProps {
  asset: Asset | null
  open: boolean
  onClose: () => void
  onSave: (asset: Asset) => void
}

type AssetTab = 'common' | 'hj' | 'telematics' | 'e360' | 'dispatcher'

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

type FormState = Record<string, string | boolean | number>

function initForm(asset: Asset | null): FormState {
  return {
    name: asset?.name ?? '',
    type: asset?.type ?? '',
    category: asset?.category ?? '',
    status: asset?.status ?? 'Active',
    location: asset?.location ?? '',
    year: asset?.year ?? new Date().getFullYear(),
    code: asset?.code ?? asset?.assetId ?? '',
    rentalFlag: asset?.rentalFlag ?? false,
    fuelerFlag: asset?.fuelerFlag ?? false,
    eqActiveFlag: asset?.eqActiveFlag ?? true,
    description: asset?.description ?? '',
    serialNumber: asset?.serialNumber ?? '',
    vinNumber: asset?.vinNumber ?? '',
    make: asset?.make ?? '',
    model: asset?.model ?? '',
    gpsId: asset?.gpsId ?? '',
    accountingCode: asset?.accountingCode ?? '',
    licensePlate: asset?.licensePlate ?? '',
    licensedState: asset?.licensedState ?? '',
    height: asset?.height ?? '',
    weight: asset?.weight ?? '',
    length: asset?.length ?? '',
    width: asset?.width ?? '',
    purchaseValue: asset?.purchaseValue ?? '',
    fuelCapacity: asset?.fuelCapacity ?? '',
    numberOfAxles: asset?.numberOfAxles ?? '',
    purchaseDate: asset?.purchaseDate ?? '',
    hjJobAssignments: asset?.hjJobAssignments ?? '',
    dashcam: asset?.dashcam ?? '',
    fuelType: asset?.fuelType ?? '',
    expectedConsumptionRate: asset?.expectedConsumptionRate ?? '',
    expectedConsumptionRateType: asset?.expectedConsumptionRateType ?? '',
    expectedRunTime: asset?.expectedRunTime ?? '',
    ratePerHour: asset?.ratePerHour ?? '',
    ownershipCostPerHour: asset?.ownershipCostPerHour ?? '',
    operatingCostPerHour: asset?.operatingCostPerHour ?? '',
    enableMobileGeofence: asset?.enableMobileGeofence ?? false,
    mobileGeofenceSize: asset?.mobileGeofenceSize ?? '',
    assignedDriver: asset?.assignedDriver ?? '',
    odometer: asset?.odometer ?? '',
    meter: asset?.meter ?? '',
    isAttachment: asset?.isAttachment ?? false,
    leasedFlag: asset?.leasedFlag ?? false,
    partTaxExemptFlag: asset?.partTaxExemptFlag ?? false,
    serviceEquipmentFlag: asset?.serviceEquipmentFlag ?? false,
    e360Location: asset?.e360Location ?? '',
    e360Job: asset?.e360Job ?? '',
    foreman: asset?.foreman ?? '',
    region: asset?.region ?? '',
    division: asset?.division ?? '',
    color: asset?.color ?? '',
    e360AssignedDriver: asset?.e360AssignedDriver ?? '',
    purchasedFrom: asset?.purchasedFrom ?? '',
    defaultMechanic: asset?.defaultMechanic ?? '',
    tireSizeFront: asset?.tireSizeFront ?? '',
    tireSizeRear: asset?.tireSizeRear ?? '',
    defaultFuel: asset?.defaultFuel ?? '',
    engineMake: asset?.engineMake ?? '',
    engineSerialNo: asset?.engineSerialNo ?? '',
    engineTier: asset?.engineTier ?? '',
    engineRatedPowerKw: asset?.engineRatedPowerKw ?? '',
    engineRatedPowerHp: asset?.engineRatedPowerHp ?? '',
    engineArrangement: asset?.engineArrangement ?? '',
    engineTransmissionSerialNo: asset?.engineTransmissionSerialNo ?? '',
    replacementCycle: asset?.replacementCycle ?? '',
    hoursPerYear: asset?.hoursPerYear ?? '',
    equipmentBudget: asset?.equipmentBudget ?? '',
    hideEquipment: asset?.hideEquipment ?? false,
    gvwr: asset?.gvwr ?? '',
    gcwr: asset?.gcwr ?? '',
    maximumHaulingCapacity: asset?.maximumHaulingCapacity ?? '',
    eqHourlyRate: asset?.eqHourlyRate ?? '',
    eqPurchaseDate: asset?.eqPurchaseDate ?? '',
  }
}

const BU_OPTIONS = buList.map(b => ({ label: `${b.code} — ${b.name}`, value: b.code }))

export function AssetPanel({ asset, open, onClose, onSave }: AssetPanelProps) {
  const [tab, setTab] = useState<AssetTab>('common')
  const [form, setForm] = useState<FormState>(() => initForm(asset))
  const [apps, setApps] = useState<AppName[]>([])
  const [bus, setBus] = useState<string[]>([])

  useEffect(() => {
    setForm(initForm(asset))
    setApps(asset?.assignedApps ?? [])
    setBus(asset?.businessUnits ?? [])
    setTab('common')
  }, [asset, open])

  const str = (k: string) => (form[k] as string) ?? ''
  const bool = (k: string) => (form[k] as boolean) ?? false
  const setStr = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))
  const setBool = (k: string) => (v: boolean) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    onSave({
      assetId: asset?.assetId ?? '',
      name: str('name'),
      type: str('type'),
      category: str('category'),
      status: (str('status') as Asset['status']) || 'Active',
      location: str('location'),
      year: Number(form['year']) || new Date().getFullYear(),
      assignedApps: apps,
      businessUnits: bus.length > 0 ? bus : undefined,
      code: str('code') || undefined,
      rentalFlag: bool('rentalFlag'),
      fuelerFlag: bool('fuelerFlag'),
      eqActiveFlag: bool('eqActiveFlag'),
      description: str('description') || undefined,
      serialNumber: str('serialNumber') || undefined,
      vinNumber: str('vinNumber') || undefined,
      make: str('make') || undefined,
      model: str('model') || undefined,
      gpsId: str('gpsId') || undefined,
      accountingCode: str('accountingCode') || undefined,
      licensePlate: str('licensePlate') || undefined,
      licensedState: str('licensedState') || undefined,
      height: str('height') || undefined,
      weight: str('weight') || undefined,
      length: str('length') || undefined,
      width: str('width') || undefined,
      purchaseValue: str('purchaseValue') || undefined,
      fuelCapacity: str('fuelCapacity') || undefined,
      numberOfAxles: str('numberOfAxles') || undefined,
      purchaseDate: str('purchaseDate') || undefined,
      hjJobAssignments: str('hjJobAssignments') || undefined,
      dashcam: str('dashcam') || undefined,
      fuelType: str('fuelType') || undefined,
      expectedConsumptionRate: str('expectedConsumptionRate') || undefined,
      expectedConsumptionRateType: str('expectedConsumptionRateType') || undefined,
      expectedRunTime: str('expectedRunTime') || undefined,
      ratePerHour: str('ratePerHour') || undefined,
      ownershipCostPerHour: str('ownershipCostPerHour') || undefined,
      operatingCostPerHour: str('operatingCostPerHour') || undefined,
      enableMobileGeofence: bool('enableMobileGeofence'),
      mobileGeofenceSize: str('mobileGeofenceSize') || undefined,
      assignedDriver: str('assignedDriver') || undefined,
      odometer: str('odometer') || undefined,
      meter: str('meter') || undefined,
      isAttachment: bool('isAttachment'),
      leasedFlag: bool('leasedFlag'),
      partTaxExemptFlag: bool('partTaxExemptFlag'),
      serviceEquipmentFlag: bool('serviceEquipmentFlag'),
      e360Location: str('e360Location') || undefined,
      e360Job: str('e360Job') || undefined,
      foreman: str('foreman') || undefined,
      region: str('region') || undefined,
      division: str('division') || undefined,
      color: str('color') || undefined,
      e360AssignedDriver: str('e360AssignedDriver') || undefined,
      purchasedFrom: str('purchasedFrom') || undefined,
      defaultMechanic: str('defaultMechanic') || undefined,
      tireSizeFront: str('tireSizeFront') || undefined,
      tireSizeRear: str('tireSizeRear') || undefined,
      defaultFuel: str('defaultFuel') || undefined,
      engineMake: str('engineMake') || undefined,
      engineSerialNo: str('engineSerialNo') || undefined,
      engineTier: str('engineTier') || undefined,
      engineRatedPowerKw: str('engineRatedPowerKw') || undefined,
      engineRatedPowerHp: str('engineRatedPowerHp') || undefined,
      engineArrangement: str('engineArrangement') || undefined,
      engineTransmissionSerialNo: str('engineTransmissionSerialNo') || undefined,
      replacementCycle: str('replacementCycle') || undefined,
      hoursPerYear: str('hoursPerYear') || undefined,
      equipmentBudget: str('equipmentBudget') || undefined,
      hideEquipment: bool('hideEquipment'),
      gvwr: str('gvwr') || undefined,
      gcwr: str('gcwr') || undefined,
      maximumHaulingCapacity: str('maximumHaulingCapacity') || undefined,
      eqHourlyRate: str('eqHourlyRate') || undefined,
      eqPurchaseDate: str('eqPurchaseDate') || undefined,
    })
  }

  return (
    <Sheet open={open} onOpenChange={onClose} className="max-w-2xl">
      <SheetHeader>
        <SheetTitle>{asset ? 'Edit Asset' : 'Add Asset'}</SheetTitle>
        <SheetClose onClose={onClose} />
      </SheetHeader>
      <SheetContent>
        <Tabs value={tab} onValueChange={v => setTab(v as AssetTab)}>
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="common">Common Data</TabsTrigger>
            <TabsTrigger value="hj">HJ Fields</TabsTrigger>
            <TabsTrigger value="telematics">Telematics</TabsTrigger>
            <TabsTrigger value="e360">E360</TabsTrigger>
            <TabsTrigger value="dispatcher">Dispatcher</TabsTrigger>
          </TabsList>

          {/* ── Common Data ── */}
          <TabsContent value="common" className="mt-0">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {/* Checkboxes first */}
              <div className="col-span-2 flex items-center gap-6 pb-1">
                <CheckField label="Active" checked={bool('eqActiveFlag')} onChange={setBool('eqActiveFlag')} />
                <CheckField label="Rental Flag" checked={bool('rentalFlag')} onChange={setBool('rentalFlag')} />
                <CheckField label="Fueler Flag" checked={bool('fuelerFlag')} onChange={setBool('fuelerFlag')} />
              </div>
              {/* Text fields */}
              <Field label="Code"><Input value={str('code')} onChange={setStr('code')} /></Field>
              <Field label="Type"><Input value={str('type')} onChange={setStr('type')} /></Field>
              <Field label="Name" className="col-span-2"><Input value={str('name')} onChange={setStr('name')} /></Field>
              <Field label="Description" className="col-span-2"><Input value={str('description')} onChange={setStr('description')} /></Field>
              <Field label="Make"><Input value={str('make')} onChange={setStr('make')} /></Field>
              <Field label="Model"><Input value={str('model')} onChange={setStr('model')} /></Field>
              <Field label="Year"><Input type="number" value={String(form['year'])} onChange={setStr('year')} /></Field>
              <Field label="Serial #"><Input value={str('serialNumber')} onChange={setStr('serialNumber')} /></Field>
              <Field label="VIN #"><Input value={str('vinNumber')} onChange={setStr('vinNumber')} /></Field>
              <Field label="GPS ID">
                <Select value={str('gpsId')} onChange={setStr('gpsId')}>
                  <option value="">— None —</option>
                  <option value="GPS-001">GPS-001</option>
                  <option value="GPS-002">GPS-002</option>
                  <option value="GPS-003">GPS-003</option>
                </Select>
              </Field>
              <Field label="Accounting Code"><Input value={str('accountingCode')} onChange={setStr('accountingCode')} /></Field>
              <Field label="License Plate"><Input value={str('licensePlate')} onChange={setStr('licensePlate')} /></Field>
              <Field label="Licensed State"><Input value={str('licensedState')} onChange={setStr('licensedState')} /></Field>
              <Field label="Location"><Input value={str('location')} onChange={setStr('location')} /></Field>
              <Field label="Status">
                <Select value={str('status')} onChange={setStr('status')}>
                  <option value="Active">Active</option>
                  <option value="In Maintenance">In Maintenance</option>
                  <option value="Retired">Retired</option>
                </Select>
              </Field>
              <Field label="Height"><Input value={str('height')} onChange={setStr('height')} /></Field>
              <Field label="Weight"><Input value={str('weight')} onChange={setStr('weight')} /></Field>
              <Field label="Length"><Input value={str('length')} onChange={setStr('length')} /></Field>
              <Field label="Width"><Input value={str('width')} onChange={setStr('width')} /></Field>
              <Field label="Purchase Value"><Input value={str('purchaseValue')} onChange={setStr('purchaseValue')} /></Field>
              <Field label="Fuel Capacity"><Input value={str('fuelCapacity')} onChange={setStr('fuelCapacity')} /></Field>
              <Field label="Number of Axles"><Input value={str('numberOfAxles')} onChange={setStr('numberOfAxles')} /></Field>
              <Field label="Purchase Date"><Input type="date" value={str('purchaseDate')} onChange={setStr('purchaseDate')} /></Field>
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
              <Field label="Job Assignments"><Input value={str('hjJobAssignments')} onChange={setStr('hjJobAssignments')} /></Field>
            </div>
          </TabsContent>

          {/* ── Telematics ── */}
          <TabsContent value="telematics" className="mt-0">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {/* Checkboxes first */}
              <div className="col-span-2 flex items-center gap-6 pb-1">
                <CheckField label="Enable Mobile Geofence" checked={bool('enableMobileGeofence')} onChange={setBool('enableMobileGeofence')} />
              </div>
              <Field label="Dashcam">
                <Select value={str('dashcam')} onChange={setStr('dashcam')}>
                  <option value="">— None —</option>
                  <option value="Samsara">Samsara</option>
                  <option value="Lytx">Lytx</option>
                  <option value="Motive">Motive</option>
                </Select>
              </Field>
              <Field label="Fuel Type">
                <Select value={str('fuelType')} onChange={setStr('fuelType')}>
                  <option value="">— Select —</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="CNG">CNG</option>
                </Select>
              </Field>
              <Field label="Expected Consumption Rate"><Input value={str('expectedConsumptionRate')} onChange={setStr('expectedConsumptionRate')} /></Field>
              <Field label="Consumption Rate Type"><Input value={str('expectedConsumptionRateType')} onChange={setStr('expectedConsumptionRateType')} /></Field>
              <Field label="Expected Run Time"><Input value={str('expectedRunTime')} onChange={setStr('expectedRunTime')} /></Field>
              <Field label="Rate / Hour"><Input value={str('ratePerHour')} onChange={setStr('ratePerHour')} /></Field>
              <Field label="Ownership Cost / Hour"><Input value={str('ownershipCostPerHour')} onChange={setStr('ownershipCostPerHour')} /></Field>
              <Field label="Operating Cost / Hour"><Input value={str('operatingCostPerHour')} onChange={setStr('operatingCostPerHour')} /></Field>
              <Field label="Mobile Geofence Size"><Input value={str('mobileGeofenceSize')} onChange={setStr('mobileGeofenceSize')} /></Field>
              <Field label="Assigned Driver"><Input value={str('assignedDriver')} onChange={setStr('assignedDriver')} /></Field>
              <Field label="Odometer"><Input value={str('odometer')} onChange={setStr('odometer')} /></Field>
              <Field label="Meter"><Input value={str('meter')} onChange={setStr('meter')} /></Field>
            </div>
          </TabsContent>

          {/* ── E360 ── */}
          <TabsContent value="e360" className="mt-0">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {/* Checkboxes first */}
              <div className="col-span-2 flex items-center gap-6 pb-1 flex-wrap">
                <CheckField label="Is Attachment" checked={bool('isAttachment')} onChange={setBool('isAttachment')} />
                <CheckField label="Leased" checked={bool('leasedFlag')} onChange={setBool('leasedFlag')} />
                <CheckField label="Part Tax Exempt" checked={bool('partTaxExemptFlag')} onChange={setBool('partTaxExemptFlag')} />
                <CheckField label="Service Equipment" checked={bool('serviceEquipmentFlag')} onChange={setBool('serviceEquipmentFlag')} />
              </div>
              <Field label="Location"><Input value={str('e360Location')} onChange={setStr('e360Location')} /></Field>
              <Field label="Job"><Input value={str('e360Job')} onChange={setStr('e360Job')} /></Field>
              <Field label="Foreman"><Input value={str('foreman')} onChange={setStr('foreman')} /></Field>
              <Field label="Region"><Input value={str('region')} onChange={setStr('region')} /></Field>
              <Field label="Division"><Input value={str('division')} onChange={setStr('division')} /></Field>
              <Field label="Color"><Input value={str('color')} onChange={setStr('color')} /></Field>
              <Field label="Assigned Driver"><Input value={str('e360AssignedDriver')} onChange={setStr('e360AssignedDriver')} /></Field>
              <Field label="Purchased From"><Input value={str('purchasedFrom')} onChange={setStr('purchasedFrom')} /></Field>
              <Field label="Default Mechanic"><Input value={str('defaultMechanic')} onChange={setStr('defaultMechanic')} /></Field>
              <Field label="Default Fuel"><Input value={str('defaultFuel')} onChange={setStr('defaultFuel')} /></Field>
              <Field label="Tire Size Front"><Input value={str('tireSizeFront')} onChange={setStr('tireSizeFront')} /></Field>
              <Field label="Tire Size Rear"><Input value={str('tireSizeRear')} onChange={setStr('tireSizeRear')} /></Field>
              <Field label="Engine Make"><Input value={str('engineMake')} onChange={setStr('engineMake')} /></Field>
              <Field label="Engine Serial No"><Input value={str('engineSerialNo')} onChange={setStr('engineSerialNo')} /></Field>
              <Field label="Engine Tier"><Input value={str('engineTier')} onChange={setStr('engineTier')} /></Field>
              <Field label="Engine Arrangement"><Input value={str('engineArrangement')} onChange={setStr('engineArrangement')} /></Field>
              <Field label="Engine Rated Power (kW)"><Input value={str('engineRatedPowerKw')} onChange={setStr('engineRatedPowerKw')} /></Field>
              <Field label="Engine Rated Power (HP)"><Input value={str('engineRatedPowerHp')} onChange={setStr('engineRatedPowerHp')} /></Field>
              <Field label="Engine Transmission Serial No" className="col-span-2"><Input value={str('engineTransmissionSerialNo')} onChange={setStr('engineTransmissionSerialNo')} /></Field>
              <Field label="Replacement Cycle (years)"><Input value={str('replacementCycle')} onChange={setStr('replacementCycle')} /></Field>
              <Field label="Hours Per Year"><Input value={str('hoursPerYear')} onChange={setStr('hoursPerYear')} /></Field>
              <Field label="Equipment Budget"><Input value={str('equipmentBudget')} onChange={setStr('equipmentBudget')} /></Field>
            </div>
          </TabsContent>

          {/* ── Dispatcher ── */}
          <TabsContent value="dispatcher" className="mt-0">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {/* Checkbox first */}
              <div className="col-span-2 flex items-center gap-6 pb-1">
                <CheckField label="Hide Asset" checked={bool('hideEquipment')} onChange={setBool('hideEquipment')} />
              </div>
              <Field label="GVWR"><Input value={str('gvwr')} onChange={setStr('gvwr')} /></Field>
              <Field label="GCWR"><Input value={str('gcwr')} onChange={setStr('gcwr')} /></Field>
              <Field label="Maximum Hauling Capacity"><Input value={str('maximumHaulingCapacity')} onChange={setStr('maximumHaulingCapacity')} /></Field>
              <Field label="Hourly Rate"><Input value={str('eqHourlyRate')} onChange={setStr('eqHourlyRate')} /></Field>
              <Field label="Purchase Date"><Input type="date" value={str('eqPurchaseDate')} onChange={setStr('eqPurchaseDate')} /></Field>
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
