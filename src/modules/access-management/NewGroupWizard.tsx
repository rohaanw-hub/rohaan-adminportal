import { useState, useEffect, useRef } from 'react'
import { X, LayoutTemplate, Pencil, Check } from 'lucide-react'
import { AppName } from '@/types'
import { CATEGORIES, PRODUCT_CATEGORY, CATEGORY_BADGE_VARIANT } from '@/lib/products'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

// ── Product descriptions ─────────────────────────────────────────────────────

export const PRODUCT_DESC: Record<AppName, string> = {
  'Estimating':        'Bid preparation and cost estimation',
  'Quotes':            'Quote management and tracking',
  'Pre-Construction':  'Pre-bid project planning tools',
  'Desktop':           'Full desktop estimating application',
  'Manager':           'Job cost tracking and project management',
  'Safety':            'Safety incidents and compliance management',
  'Skills':            'Workforce skills and certifications tracking',
  'Forms':             'Digital field forms and inspections',
  'Docs & Plans':      'Document and drawing management',
  'myField':           'Mobile field data capture',
  'Resource Planner':  'Labor and equipment scheduling',
  'Telematics':        'GPS tracking and asset monitoring',
  'Maintenance':       'Equipment maintenance and service records',
  'Chats':             'Team messaging and communication',
  'Copilot':           'AI-powered project insights',
  'Additional Access': 'Extended platform permissions',
}

// ── Templates ────────────────────────────────────────────────────────────────

interface Template {
  role: string
  products: AppName[]
}

const TEMPLATES: Template[] = [
  {
    role: 'Super Admin',
    products: [
      'Estimating', 'Quotes', 'Pre-Construction', 'Desktop',
      'Manager', 'Safety', 'Skills', 'Forms', 'Docs & Plans', 'myField', 'Resource Planner',
      'Telematics', 'Maintenance',
      'Chats', 'Copilot', 'Additional Access',
    ],
  },
  {
    role: 'Admin',
    products: [
      'Manager', 'Safety', 'Skills', 'Forms', 'Docs & Plans', 'myField', 'Resource Planner',
      'Estimating', 'Quotes', 'Pre-Construction',
      'Chats', 'Copilot', 'Additional Access',
    ],
  },
  {
    role: 'Project Manager',
    products: ['Manager', 'Safety', 'Estimating', 'Quotes', 'Pre-Construction', 'Chats'],
  },
  {
    role: 'Field Supervisor',
    products: ['Manager', 'Safety', 'Skills', 'Forms', 'myField', 'Resource Planner'],
  },
  {
    role: 'Estimator',
    products: ['Estimating', 'Quotes', 'Pre-Construction', 'Desktop', 'Manager'],
  },
  {
    role: 'Foreman',
    products: ['Manager', 'Safety', 'Forms', 'myField'],
  },
  {
    role: 'Safety Manager',
    products: ['Manager', 'Safety'],
  },
  {
    role: 'Equipment Operator',
    products: ['Manager', 'myField'],
  },
  {
    role: 'Payroll Admin',
    products: ['Manager'],
  },
  {
    role: 'Fleet Manager',
    products: ['Manager', 'Telematics', 'Maintenance'],
  },
  {
    role: 'Dispatcher',
    products: ['Manager', 'myField', 'Resource Planner'],
  },
  {
    role: 'HR Manager',
    products: ['Manager', 'Skills'],
  },
]

// ── Step indicator ───────────────────────────────────────────────────────────

type WizardStep = 1 | 2 | 3 | 4

const STEP_LABELS = ['Method', 'Configure', 'Products', 'Review']

function StepIndicator({ step }: { step: WizardStep }) {
  return (
    <div className="flex items-center justify-center mb-6">
      {STEP_LABELS.map((label, i) => {
        const num = (i + 1) as WizardStep
        const done = step > num
        const active = step === num
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors',
                  done   ? 'bg-[#0f2137] border-[#0f2137] text-white' :
                  active ? 'border-[#0f2137] text-[#0f2137] bg-white' :
                           'border-gray-200 text-gray-400 bg-white'
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : num}
              </div>
              <span className={cn('text-xs', active ? 'text-[#0f2137] font-medium' : 'text-gray-400')}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={cn('w-12 h-0.5 mb-4 mx-1', step > num ? 'bg-[#0f2137]' : 'bg-gray-200')} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Step 1 — Choose method ───────────────────────────────────────────────────

type Method = 'template' | 'scratch'

function Step1({ method, setMethod }: { method: Method | null; setMethod: (m: Method) => void }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => setMethod('template')}
        className={cn(
          'flex flex-col items-center gap-3 rounded-lg border-2 p-6 text-center transition-colors',
          method === 'template'
            ? 'border-[#0f2137] bg-blue-50'
            : 'border-gray-200 hover:border-gray-300 bg-white'
        )}
      >
        <div className={cn('rounded-full p-3', method === 'template' ? 'bg-[#0f2137] text-white' : 'bg-gray-100 text-gray-600')}>
          <LayoutTemplate className="h-6 w-6" />
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-sm">Start from a Template</div>
          <div className="text-xs text-gray-500 mt-1">
            Choose a predefined role with common product access patterns.
          </div>
        </div>
      </button>

      <button
        onClick={() => setMethod('scratch')}
        className={cn(
          'flex flex-col items-center gap-3 rounded-lg border-2 p-6 text-center transition-colors',
          method === 'scratch'
            ? 'border-[#0f2137] bg-blue-50'
            : 'border-gray-200 hover:border-gray-300 bg-white'
        )}
      >
        <div className={cn('rounded-full p-3', method === 'scratch' ? 'bg-[#0f2137] text-white' : 'bg-gray-100 text-gray-600')}>
          <Pencil className="h-6 w-6" />
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-sm">Create from Scratch</div>
          <div className="text-xs text-gray-500 mt-1">
            Build a custom access group with a unique name and product selection.
          </div>
        </div>
      </button>
    </div>
  )
}

// ── Step 2a — Template selection ─────────────────────────────────────────────

function Step2Template({
  selected,
  onSelect,
}: {
  selected: Template | null
  onSelect: (t: Template) => void
}) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {TEMPLATES.map(t => {
        const isSelected = selected?.role === t.role
        const cats = [...new Set(t.products.map(p => PRODUCT_CATEGORY[p]))]
        return (
          <button
            key={t.role}
            onClick={() => onSelect(t)}
            className={cn(
              'flex flex-col gap-2 rounded-lg border-2 p-3 text-left transition-colors',
              isSelected
                ? 'border-[#0f2137] bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            )}
          >
            <div className="font-semibold text-sm text-gray-900">{t.role}</div>
            <div className="flex flex-wrap gap-1">
              {cats.map(cat => (
                <Badge key={cat} variant={CATEGORY_BADGE_VARIANT[cat]} className="text-xs">
                  {cat}
                </Badge>
              ))}
            </div>
            <div className="text-xs text-gray-400">
              {t.products.length} product{t.products.length !== 1 ? 's' : ''}
            </div>
          </button>
        )
      })}
    </div>
  )
}

// ── Step 2b — Scratch form ───────────────────────────────────────────────────

function Step2Scratch({
  name,
  desc,
  setName,
  setDesc,
}: {
  name: string
  desc: string
  setName: (v: string) => void
  setDesc: (v: string) => void
}) {
  return (
    <div className="space-y-4 max-w-lg">
      <div className="space-y-1.5">
        <Label className="text-sm font-medium">
          Group Name <span className="text-red-500">*</span>
        </Label>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Project Managers"
        />
      </div>
      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Description</Label>
        <textarea
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f2137] focus:border-transparent resize-none"
          rows={4}
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Describe this access group's purpose…"
        />
      </div>
    </div>
  )
}

// ── Step 3 — Product checklist ───────────────────────────────────────────────

function Step3Products({
  selected,
  setSelected,
}: {
  selected: AppName[]
  setSelected: React.Dispatch<React.SetStateAction<AppName[]>>
}) {
  const toggle = (p: AppName) =>
    setSelected(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])

  const toggleAll = (products: AppName[], selectAll: boolean) =>
    setSelected(prev =>
      selectAll
        ? [...new Set([...prev, ...products])]
        : prev.filter(p => !products.includes(p))
    )

  return (
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
  )
}

// ── Step 4 — Review ──────────────────────────────────────────────────────────

function Step4Review({ name, desc, products }: { name: string; desc: string; products: AppName[] }) {
  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-gray-200 p-4 space-y-3">
        <div>
          <div className="text-xs text-gray-500 mb-0.5">Group Name</div>
          <div className="text-sm font-semibold text-gray-900">{name || '—'}</div>
        </div>
        {desc && (
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Description</div>
            <div className="text-sm text-gray-700">{desc}</div>
          </div>
        )}
      </div>

      <div>
        <div className="text-xs text-gray-500 mb-3">
          {products.length} product{products.length !== 1 ? 's' : ''} selected
        </div>
        {products.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No products selected.</p>
        ) : (
          <div className="space-y-4">
            {CATEGORIES.map(cat => {
              const catProducts = cat.products.filter(p => products.includes(p))
              if (catProducts.length === 0) return null
              return (
                <div key={cat.name}>
                  <div className={cn('text-xs font-semibold uppercase tracking-wide mb-1.5', cat.color)}>
                    {cat.name}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {catProducts.map(p => (
                      <Badge key={p} variant={CATEGORY_BADGE_VARIANT[cat.name]} className="text-xs">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main wizard ──────────────────────────────────────────────────────────────

export interface NewGroupResult {
  name: string
  desc: string
  products: AppName[]
}

export interface WizardPrefill {
  name: string
  desc: string
  products: AppName[]
}

interface NewGroupWizardProps {
  open: boolean
  onClose: () => void
  onCreate: (result: NewGroupResult) => void
  prefill?: WizardPrefill
}

const STEP_TITLES: Record<WizardStep, string> = {
  1: 'Create a New Group',
  2: 'Configure Group',
  3: 'Configure Products',
  4: 'Review & Save',
}

export function NewGroupWizard({ open, onClose, onCreate, prefill }: NewGroupWizardProps) {
  const [step, setStep] = useState<WizardStep>(1)
  const [method, setMethod] = useState<Method | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [groupName, setGroupName] = useState('')
  const [groupDesc, setGroupDesc] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<AppName[]>([])

  // When prefill is provided, skip to step 2 (scratch) with data pre-filled
  const prevOpen = useRef(false)
  useEffect(() => {
    if (open && !prevOpen.current && prefill) {
      setMethod('scratch')
      setGroupName(prefill.name)
      setGroupDesc(prefill.desc)
      setSelectedProducts(prefill.products)
      setStep(2)
    }
    prevOpen.current = open
  }, [open, prefill])

  const canNext =
    step === 1 ? method !== null :
    step === 2 ? (method === 'template' ? selectedTemplate !== null : groupName.trim().length > 0) :
    true

  const handleNext = () => {
    if (step === 2 && method === 'template' && selectedTemplate) {
      setSelectedProducts(selectedTemplate.products)
      if (!groupName) setGroupName(selectedTemplate.role)
    }
    setStep(s => (s + 1) as WizardStep)
  }

  const handleBack = () => setStep(s => (s - 1) as WizardStep)

  const handleCreate = () => {
    onCreate({ name: groupName, desc: groupDesc, products: selectedProducts })
    doClose()
  }

  const doClose = () => {
    onClose()
    setTimeout(() => {
      setStep(1)
      setMethod(null)
      setSelectedTemplate(null)
      setGroupName('')
      setGroupDesc('')
      setSelectedProducts([])
    }, 200)
  }

  if (!open) return null

  const title =
    step === 2 && method === 'template' ? 'Choose a Template' :
    step === 2 && method === 'scratch'  ? 'Group Details' :
    STEP_TITLES[step]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={doClose} />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-3xl mx-4 bg-white rounded-lg shadow-xl border flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={doClose}
            className="rounded-sm p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="px-6 pt-5 shrink-0">
          <StepIndicator step={step} />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          {step === 1 && (
            <Step1 method={method} setMethod={setMethod} />
          )}
          {step === 2 && method === 'template' && (
            <Step2Template selected={selectedTemplate} onSelect={setSelectedTemplate} />
          )}
          {step === 2 && method === 'scratch' && (
            <Step2Scratch
              name={groupName}
              desc={groupDesc}
              setName={setGroupName}
              setDesc={setGroupDesc}
            />
          )}
          {step === 3 && (
            <Step3Products selected={selectedProducts} setSelected={setSelectedProducts} />
          )}
          {step === 4 && (
            <Step4Review name={groupName} desc={groupDesc} products={selectedProducts} />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t shrink-0">
          <div>
            {step > 1 && (
              <Button variant="ghost" onClick={handleBack}>Back</Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={doClose}>Cancel</Button>
            {step < 4 ? (
              <Button onClick={handleNext} disabled={!canNext}>Next</Button>
            ) : (
              <Button onClick={handleCreate}>Create Group</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
