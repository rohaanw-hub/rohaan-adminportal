import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Bell, Globe, Sliders, Building2, Save, AlertTriangle } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

// ── Notifications ─────────────────────────────────────────────────

const NOTIFICATION_EVENTS = [
  'User Invited', 'User Deactivated', 'Invoice Due', 'Invoice Paid',
  'Integration Error', 'Integration Sync Completed', 'Seat Limit Warning',
  'New Safety Incident', 'Login from New Device', 'API Rate Limit Reached',
]

const CHANNELS = ['In-App', 'Email', 'SMS']

function NotificationsTab() {
  const [matrix, setMatrix] = useState<Record<string, Record<string, boolean>>>(() => {
    const m: Record<string, Record<string, boolean>> = {}
    NOTIFICATION_EVENTS.forEach(ev => {
      m[ev] = { 'In-App': true, 'Email': ['Invoice Due', 'Integration Error', 'Login from New Device'].includes(ev), 'SMS': false }
    })
    return m
  })

  const toggle = (ev: string, ch: string) =>
    setMatrix(p => ({ ...p, [ev]: { ...p[ev], [ch]: !p[ev][ch] } }))

  return (
    <div className="max-w-3xl">
      <div className="rounded-lg border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left px-5 py-3 font-medium text-gray-700 w-72">Event</th>
                {CHANNELS.map(ch => (
                  <th key={ch} className="text-center px-6 py-3 font-medium text-gray-700 w-32">{ch}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {NOTIFICATION_EVENTS.map(ev => (
                <tr key={ev} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-800">{ev}</td>
                  {CHANNELS.map(ch => (
                    <td key={ch} className="px-6 py-3 text-center">
                      <div className="flex justify-center">
                        <Switch
                          checked={matrix[ev]?.[ch] ?? false}
                          onCheckedChange={() => toggle(ev, ch)}
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
      <div className="mt-4 flex justify-end">
        <Button>
          <Save className="h-4 w-4 mr-2" />Save Notification Preferences
        </Button>
      </div>
    </div>
  )
}

// ── Language & Region ─────────────────────────────────────────────

function LanguageTab() {
  const [lang, setLang] = useState('en-US')
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY')
  const [timeFormat, setTimeFormat] = useState('12h')
  const [timezone, setTimezone] = useState('America/Chicago')
  const [numFormat, setNumFormat] = useState('1,234.56')
  const [currency, setCurrency] = useState('USD')

  const today = new Date('2026-02-18')
  const formatted = dateFormat === 'MM/DD/YYYY'
    ? '02/18/2026'
    : dateFormat === 'DD/MM/YYYY'
    ? '18/02/2026'
    : '2026-02-18'

  return (
    <div className="max-w-xl space-y-6">
      <div className="rounded-lg border bg-white p-6 space-y-5">
        <div>
          <Label className="text-sm font-medium mb-1.5 block">Language</Label>
          <Select value={lang} onChange={e => setLang(e.target.value)}>
            <option value="en-US">English (United States)</option>
            <option value="es-MX">Spanish (Mexico)</option>
            <option value="fr-CA">French (Canada)</option>
            <option value="pt-BR">Portuguese (Brazil)</option>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-medium mb-1.5 block">Date Format</Label>
          <Select value={dateFormat} onChange={e => setDateFormat(e.target.value)}>
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
            <option>YYYY-MM-DD</option>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-medium mb-1.5 block">Time Format</Label>
          <Select value={timeFormat} onChange={e => setTimeFormat(e.target.value)}>
            <option value="12h">12-hour (2:30 PM)</option>
            <option value="24h">24-hour (14:30)</option>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-medium mb-1.5 block">Timezone</Label>
          <Select value={timezone} onChange={e => setTimezone(e.target.value)}>
            <option value="America/Chicago">Central Time (US & Canada)</option>
            <option value="America/New_York">Eastern Time (US & Canada)</option>
            <option value="America/Denver">Mountain Time (US & Canada)</option>
            <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-medium mb-1.5 block">Number Format</Label>
          <Select value={numFormat} onChange={e => setNumFormat(e.target.value)}>
            <option>1,234.56</option>
            <option>1.234,56</option>
            <option>1 234,56</option>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-medium mb-1.5 block">Currency</Label>
          <Select value={currency} onChange={e => setCurrency(e.target.value)}>
            <option>USD</option>
            <option>CAD</option>
            <option>EUR</option>
            <option>MXN</option>
          </Select>
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-lg border bg-amber-50 border-amber-200 p-4">
        <div className="text-xs font-medium text-amber-700 mb-2 uppercase tracking-wide">Preview</div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between"><span className="text-gray-600">Date:</span><span className="font-mono">{formatted}</span></div>
          <div className="flex justify-between"><span className="text-gray-600">Time:</span><span className="font-mono">{timeFormat === '12h' ? '2:30 PM' : '14:30'}</span></div>
          <div className="flex justify-between"><span className="text-gray-600">Number:</span><span className="font-mono">{numFormat === '1,234.56' ? '1,234.56' : numFormat === '1.234,56' ? '1.234,56' : '1 234,56'}</span></div>
          <div className="flex justify-between"><span className="text-gray-600">Currency:</span><span className="font-mono">{currency === 'USD' ? '$12,450.00' : currency === 'CAD' ? 'CA$12,450.00' : '€12.450,00'}</span></div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Save Language Settings</Button>
      </div>
    </div>
  )
}

// ── Preferences ───────────────────────────────────────────────────

function PreferencesTab() {
  const [theme, setTheme] = useState('light')
  const [density, setDensity] = useState('default')
  const [landing, setLanding] = useState('/access')
  const [timeout, setTimeout] = useState('30')

  return (
    <div className="max-w-xl space-y-4">
      <div className="rounded-lg border bg-white p-6 space-y-5">
        <div>
          <Label className="text-sm font-medium mb-2 block">Theme</Label>
          <div className="flex gap-2">
            {[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }, { value: 'system', label: 'System' }].map(t => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={`flex-1 py-2 rounded-md border text-sm font-medium transition-colors ${theme === t.value ? 'border-[#0f2137] bg-[#0f2137] text-white' : 'hover:bg-gray-50'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-1.5 block">Default Landing Page</Label>
          <Select value={landing} onChange={e => setLanding(e.target.value)}>
            <option value="/access">Access Management</option>
            <option value="/billing">Billing</option>
            <option value="/insights">HCSS Insights</option>
            <option value="/integrations">Integrations</option>
            <option value="/setup">Setup Data</option>
            <option value="/settings">System Settings</option>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Table Row Density</Label>
          <div className="flex gap-2">
            {[{ value: 'compact', label: 'Compact' }, { value: 'default', label: 'Default' }, { value: 'comfortable', label: 'Comfortable' }].map(d => (
              <button
                key={d.value}
                onClick={() => setDensity(d.value)}
                className={`flex-1 py-2 rounded-md border text-sm font-medium transition-colors ${density === d.value ? 'border-[#0f2137] bg-[#0f2137] text-white' : 'hover:bg-gray-50'}`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-1.5 block">Session Timeout (minutes)</Label>
          <Select value={timeout} onChange={e => setTimeout(e.target.value)}>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">60 minutes</option>
            <option value="120">2 hours</option>
            <option value="0">Never</option>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  )
}

// ── Company Settings ──────────────────────────────────────────────

function CompanySettingsTab() {
  const [multiTenantDialog, setMultiTenantDialog] = useState(false)
  const [multiTenant, setMultiTenant] = useState(true)

  return (
    <div className="max-w-xl space-y-4">
      <div className="rounded-lg border bg-white p-6 space-y-5">
        <div>
          <Label className="text-sm font-medium mb-1.5 block">Company Name</Label>
          <Input defaultValue="Acme Construction" />
        </div>
        <div>
          <Label className="text-sm font-medium mb-1.5 block">Company Logo</Label>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <Button variant="outline" size="sm">Upload Logo</Button>
            <span className="text-xs text-gray-500">PNG, SVG up to 2MB</span>
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium mb-1.5 block">Subdomain</Label>
          <div className="flex items-center gap-2">
            <Input defaultValue="acme" className="max-w-40" />
            <span className="text-sm text-gray-500">.hcss.com/admin</span>
            <Badge variant="success" className="ml-1">Active</Badge>
          </div>
        </div>
        <div className="flex items-center justify-between py-2 border-t">
          <div>
            <div className="text-sm font-medium">Multi-Tenant Mode</div>
            <div className="text-xs text-gray-500">Manage multiple company accounts from one login</div>
          </div>
          <Switch
            checked={multiTenant}
            onCheckedChange={() => multiTenant ? setMultiTenantDialog(true) : setMultiTenant(true)}
          />
        </div>
      </div>

      {/* SSO Section */}
      <div className="rounded-lg border bg-white p-6">
        <h3 className="font-semibold text-gray-900 mb-1">SSO Configuration</h3>
        <p className="text-sm text-gray-500 mb-4">Configure SAML 2.0 or OIDC single sign-on for your organization.</p>
        <div className="rounded-lg border bg-gray-50 p-4 text-center text-sm text-gray-500">
          <div className="mb-1 font-medium">SSO Setup Wizard</div>
          <div className="text-xs">Configure your identity provider (Okta, Azure AD, Google Workspace…)</div>
          <Button variant="outline" size="sm" className="mt-3">Configure SSO</Button>
        </div>
      </div>

      {/* Data retention */}
      <div className="rounded-lg border bg-white p-6">
        <h3 className="font-semibold text-gray-900 mb-1">Data Retention Policy</h3>
        <p className="text-sm text-gray-500 mb-4">Set how long data is retained before automatic archival.</p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Audit Logs', default: '12 months' },
            { label: 'Event Logs', default: '6 months' },
            { label: 'Deleted Users', default: '90 days' },
            { label: 'Reports', default: '24 months' },
          ].map(r => (
            <div key={r.label}>
              <Label className="text-sm font-medium mb-1.5 block">{r.label}</Label>
              <Select defaultValue={r.default}>
                <option>30 days</option>
                <option>90 days</option>
                <option>6 months</option>
                <option>12 months</option>
                <option>24 months</option>
                <option>Indefinitely</option>
              </Select>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button>Save Company Settings</Button>
        </div>
      </div>

      {/* Multi-tenant warning dialog */}
      <Dialog open={multiTenantDialog} onOpenChange={setMultiTenantDialog}>
        <DialogContent onClose={() => setMultiTenantDialog(false)} className="relative">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Disable Multi-Tenant Mode?
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm text-gray-600 space-y-2">
            <p>Disabling multi-tenant mode will:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Remove access to Bridge Builders Inc and Skyline Development</li>
              <li>Merge all user sessions to Acme Construction</li>
              <li>Take up to 5 minutes to propagate</li>
            </ul>
            <p className="font-medium text-amber-700 bg-amber-50 p-2 rounded">This action cannot be easily reversed. Are you sure?</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMultiTenantDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => { setMultiTenant(false); setMultiTenantDialog(false) }}>
              Disable Multi-Tenant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────

export function SystemSettings() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') ?? 'notifications'
  const setTab = (v: string) => setSearchParams({ tab: v })

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Configure platform-wide settings for your organization</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="notifications">
            <Bell className="h-3.5 w-3.5 mr-1.5" />Notifications
          </TabsTrigger>
          <TabsTrigger value="language">
            <Globe className="h-3.5 w-3.5 mr-1.5" />Language & Region
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Sliders className="h-3.5 w-3.5 mr-1.5" />Preferences
          </TabsTrigger>
          <TabsTrigger value="company">
            <Building2 className="h-3.5 w-3.5 mr-1.5" />Company Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="notifications"><NotificationsTab /></TabsContent>
        <TabsContent value="language"><LanguageTab /></TabsContent>
        <TabsContent value="preferences"><PreferencesTab /></TabsContent>
        <TabsContent value="company"><CompanySettingsTab /></TabsContent>
      </Tabs>
    </div>
  )
}
