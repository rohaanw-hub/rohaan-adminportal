import { useState, useMemo, useRef } from 'react'
import { Sparkles, Save, X, Copy, Check, CheckCircle2, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// ── Types ─────────────────────────────────────────────────────────

type FieldType = 'string' | 'number' | 'date'
type MappingMode = 'simple' | 'combine' | 'transform'
type Separator = 'space' | 'hyphen' | 'slash' | 'underscore'
type TransformOp = 'margin10' | 'round2' | 'formatDate' | 'conditionalHighLow'

interface SourceField { name: string; category: 'Job' | 'Employee' | 'Financial' | 'Time'; type: FieldType }
interface DestField   { name: string; type: FieldType }

interface SimpleMapping    { mode: 'simple';    sourceField:  string | null }
interface CombineMapping   { mode: 'combine';   sourceFields: string[]; separator: Separator }
interface TransformMapping { mode: 'transform'; sourceField:  string | null; transform: TransformOp; threshold: number }
type FieldMapping = SimpleMapping | CombineMapping | TransformMapping

// ── Constants ─────────────────────────────────────────────────────

const INTEGRATIONS = ['Vista by Viewpoint', 'Sage 300 CRE', 'Foundation Software', 'CMIC', 'Spectrum Construction']

const SOURCE_FIELDS: SourceField[] = [
  { name: 'Job Number',      category: 'Job',       type: 'string' },
  { name: 'Job Name',        category: 'Job',       type: 'string' },
  { name: 'Phase Code',      category: 'Job',       type: 'string' },
  { name: 'Cost Code',       category: 'Job',       type: 'string' },
  { name: 'First Name',      category: 'Employee',  type: 'string' },
  { name: 'Last Name',       category: 'Employee',  type: 'string' },
  { name: 'Total Cost',      category: 'Financial', type: 'number' },
  { name: 'Labor Hours',     category: 'Financial', type: 'number' },
  { name: 'Equipment Hours', category: 'Financial', type: 'number' },
  { name: 'Start Date',      category: 'Time',      type: 'date'   },
  { name: 'Completion Date', category: 'Time',      type: 'date'   },
]

const DEST_FIELDS: DestField[] = [
  { name: 'Project ID',          type: 'string' },
  { name: 'Project Description', type: 'string' },
  { name: 'Full Name',           type: 'string' },
  { name: 'Budget Amount',       type: 'number' },
  { name: 'Work Classification', type: 'string' },
  { name: 'Start Date',          type: 'date'   },
  { name: 'Resource Type',       type: 'string' },
]

const CATEGORY_COLORS: Record<string, string> = {
  Job:       'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200',
  Employee:  'bg-blue-50  text-blue-700  border-blue-200  hover:bg-blue-100',
  Financial: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
  Time:      'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
}

const TYPE_BADGE: Record<FieldType, string> = {
  string: 'bg-blue-100 text-blue-700',
  number: 'bg-green-100 text-green-700',
  date:   'bg-purple-100 text-purple-700',
}

const SEP_LABELS: Record<Separator, string> = {
  space: 'Space', hyphen: 'Hyphen', slash: 'Slash', underscore: '_',
}
const SEP_CHAR: Record<Separator, string> = {
  space: "' '", hyphen: "'-'", slash: "'/'", underscore: "'_'",
}
const SEP_DISPLAY: Record<Separator, string> = {
  space: '·', hyphen: '—', slash: '/', underscore: '_',
}

const TRANSFORM_LABELS: Record<TransformOp, string> = {
  margin10:           'Add 10% margin',
  round2:             'Round to 2 decimals',
  formatDate:         'Format as date',
  conditionalHighLow: 'Conditional (High / Low)',
}

const INITIAL_MAPPINGS: Record<string, FieldMapping> = {
  'Project ID':          { mode: 'simple',    sourceField: 'Job Number' },
  'Project Description': { mode: 'simple',    sourceField: 'Job Name' },
  'Full Name':           { mode: 'combine',   sourceFields: ['First Name', 'Last Name'], separator: 'space' },
  'Budget Amount':       { mode: 'transform', sourceField: 'Total Cost',  transform: 'margin10',    threshold: 1000 },
  'Work Classification': { mode: 'simple',    sourceField: null },
  'Start Date':          { mode: 'transform', sourceField: 'Start Date',  transform: 'formatDate',  threshold: 1000 },
  'Resource Type':       { mode: 'simple',    sourceField: null },
}

// ── Formula Generator ─────────────────────────────────────────────

function generateFormula(mapping: FieldMapping): string {
  if (mapping.mode === 'simple') {
    return mapping.sourceField ? `#{${mapping.sourceField}}` : '(unmapped)'
  }
  if (mapping.mode === 'combine') {
    if (mapping.sourceFields.length === 0) return '(unmapped)'
    const sep = SEP_CHAR[mapping.separator]
    return mapping.sourceFields.map(f => `#{${f}}`).join(` + ${sep} + `)
  }
  // transform
  if (!mapping.sourceField) return '(unmapped)'
  const f = `#{${mapping.sourceField}}`
  switch (mapping.transform) {
    case 'margin10':           return `${f} * 1.10`
    case 'round2':             return `round(${f}, 2)`
    case 'formatDate':         return `format_date(${f}, 'MM/DD/YYYY')`
    case 'conditionalHighLow': return `if(${f} >= ${mapping.threshold}, 'High', 'Low')`
  }
}

// ── MappedPill ────────────────────────────────────────────────────

function MappedPill({ name, onRemove }: { name: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
      bg-[#0f2137]/10 text-[#0f2137] border border-[#0f2137]/20 shrink-0">
      #{name}
      <button
        onClick={onRemove}
        className="ml-0.5 text-[#0f2137]/50 hover:text-red-500 transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  )
}

// ── SourcePill ────────────────────────────────────────────────────

function SourcePill({
  field, isUsed, isDragging,
  onDragStart, onDragEnd,
}: {
  field: SourceField
  isUsed: boolean
  isDragging: boolean
  onDragStart: (name: string) => void
  onDragEnd: () => void
}) {
  return (
    <div
      draggable
      onDragStart={e => { e.dataTransfer.setData('text/plain', field.name); e.dataTransfer.effectAllowed = 'copy'; onDragStart(field.name) }}
      onDragEnd={onDragEnd}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border cursor-grab select-none transition-all',
        CATEGORY_COLORS[field.category],
        isDragging ? 'opacity-40 scale-95' : 'hover:shadow-sm active:cursor-grabbing',
      )}
    >
      <GripVertical className="h-3 w-3 opacity-40" />
      {field.name}
      {isUsed && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50 shrink-0" />}
    </div>
  )
}

// ── SourcePalette ─────────────────────────────────────────────────

function SourcePalette({
  usedFields, draggedField, onDragStart, onDragEnd,
}: {
  usedFields: Set<string>
  draggedField: string | null
  onDragStart: (name: string) => void
  onDragEnd: () => void
}) {
  const categories = ['Job', 'Employee', 'Financial', 'Time'] as const
  return (
    <aside className="w-60 shrink-0 border-r bg-white flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b shrink-0">
        <div className="text-sm font-semibold text-gray-800">HCSS Source Fields</div>
        <div className="text-xs text-gray-400 mt-0.5">Drag fields onto destination slots</div>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
        {categories.map(cat => {
          const fields = SOURCE_FIELDS.filter(f => f.category === cat)
          return (
            <div key={cat}>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">{cat}</div>
              <div className="flex flex-wrap gap-1.5">
                {fields.map(f => (
                  <SourcePill
                    key={f.name}
                    field={f}
                    isUsed={usedFields.has(f.name)}
                    isDragging={draggedField === f.name}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <div className="px-4 py-3 border-t bg-gray-50 shrink-0">
        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
          {(['Job', 'Employee', 'Financial', 'Time'] as const).map(cat => (
            <span key={cat} className={cn('px-2 py-0.5 rounded-full border', CATEGORY_COLORS[cat])}>{cat}</span>
          ))}
        </div>
      </div>
    </aside>
  )
}

// ── DestCard ──────────────────────────────────────────────────────

function DestCard({
  dest, mapping, isDragOver, isHighlighted,
  onModeChange, onDrop, onDragOver, onDragLeave,
  onRemoveSource, onSeparatorChange, onTransformChange, onThresholdChange,
}: {
  dest: DestField
  mapping: FieldMapping
  isDragOver: boolean
  isHighlighted: boolean
  onModeChange: (mode: MappingMode) => void
  onDrop: (destName: string, src: string) => void
  onDragOver: (destName: string) => void
  onDragLeave: () => void
  onRemoveSource: (destName: string, src: string) => void
  onSeparatorChange: (destName: string, sep: Separator) => void
  onTransformChange: (destName: string, op: TransformOp) => void
  onThresholdChange: (destName: string, val: number) => void
}) {
  const formula = generateFormula(mapping)
  const isMapped = formula !== '(unmapped)'

  const dropZoneProps = {
    onDragOver: (e: React.DragEvent) => { e.preventDefault(); onDragOver(dest.name) },
    onDrop: (e: React.DragEvent) => { e.preventDefault(); const f = e.dataTransfer.getData('text/plain'); if (f) onDrop(dest.name, f) },
    onDragLeave,
  }

  return (
    <div className={cn(
      'rounded-xl border bg-white p-4 transition-all duration-150',
      isDragOver && 'border-[#0f2137] shadow-lg ring-2 ring-[#0f2137]/20',
      isHighlighted && 'ring-2 ring-amber-400 border-amber-300',
      !isDragOver && !isHighlighted && 'border-gray-200 hover:border-gray-300',
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-800">{dest.name}</span>
          <span className={cn('px-1.5 py-0.5 rounded text-xs font-medium', TYPE_BADGE[dest.type])}>
            {dest.type}
          </span>
        </div>
        <code className={cn(
          'text-xs font-mono truncate max-w-[180px]',
          isMapped ? 'text-green-600' : 'text-gray-400 italic',
        )}>
          {formula}
        </code>
      </div>

      {/* Mode toggle */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden mb-3 w-fit text-xs">
        {(['simple', 'combine', 'transform'] as MappingMode[]).map(mode => (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={cn(
              'px-3 py-1.5 font-medium capitalize transition-colors border-r last:border-r-0 border-gray-200',
              mapping.mode === mode
                ? 'bg-[#0f2137] text-white'
                : 'bg-white text-gray-500 hover:bg-gray-50',
            )}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Simple mode */}
      {mapping.mode === 'simple' && (
        <div
          {...dropZoneProps}
          className={cn(
            'min-h-[38px] rounded-lg border-2 border-dashed flex items-center gap-2 px-3 py-2 transition-colors',
            isDragOver ? 'border-[#0f2137] bg-blue-50' : 'border-gray-200 bg-gray-50',
            mapping.sourceField ? 'bg-white border-transparent' : '',
          )}
        >
          {mapping.sourceField
            ? <MappedPill name={mapping.sourceField} onRemove={() => onRemoveSource(dest.name, mapping.sourceField!)} />
            : <span className="text-xs text-gray-400">Drop a source field here</span>
          }
        </div>
      )}

      {/* Combine mode */}
      {mapping.mode === 'combine' && (
        <div className="space-y-2">
          <div
            {...dropZoneProps}
            className={cn(
              'min-h-[38px] rounded-lg border-2 border-dashed flex flex-wrap items-center gap-1.5 px-3 py-2 transition-colors',
              isDragOver ? 'border-[#0f2137] bg-blue-50' : 'border-gray-200 bg-gray-50',
            )}
          >
            {mapping.sourceFields.length > 0
              ? mapping.sourceFields.map((sf, i) => (
                  <span key={sf} className="inline-flex items-center gap-1">
                    <MappedPill name={sf} onRemove={() => onRemoveSource(dest.name, sf)} />
                    {i < mapping.sourceFields.length - 1 && (
                      <span className="text-xs font-mono text-gray-400 px-0.5">{SEP_DISPLAY[mapping.separator]}</span>
                    )}
                  </span>
                ))
              : <span className="text-xs text-gray-400">Drop multiple fields to combine</span>
            }
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 shrink-0">Separator:</span>
            <div className="flex gap-1">
              {(['space', 'hyphen', 'slash', 'underscore'] as Separator[]).map(sep => (
                <button
                  key={sep}
                  onClick={() => onSeparatorChange(dest.name, sep)}
                  className={cn(
                    'px-2 py-0.5 rounded text-xs border transition-colors font-medium',
                    mapping.separator === sep
                      ? 'bg-[#0f2137] text-white border-[#0f2137]'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white',
                  )}
                >
                  {SEP_LABELS[sep]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Transform mode */}
      {mapping.mode === 'transform' && (
        <div className="space-y-2">
          <div
            {...dropZoneProps}
            className={cn(
              'min-h-[38px] rounded-lg border-2 border-dashed flex items-center gap-2 px-3 py-2 transition-colors',
              isDragOver ? 'border-[#0f2137] bg-blue-50' : 'border-gray-200 bg-gray-50',
              mapping.sourceField ? 'bg-white border-transparent' : '',
            )}
          >
            {mapping.sourceField
              ? <MappedPill name={mapping.sourceField} onRemove={() => onRemoveSource(dest.name, mapping.sourceField!)} />
              : <span className="text-xs text-gray-400">Drop a source field</span>
            }
          </div>
          <Select
            value={mapping.transform}
            onChange={e => onTransformChange(dest.name, e.target.value as TransformOp)}
            className="h-8 text-xs"
          >
            {(Object.keys(TRANSFORM_LABELS) as TransformOp[]).map(op => (
              <option key={op} value={op}>{TRANSFORM_LABELS[op]}</option>
            ))}
          </Select>
          {mapping.transform === 'conditionalHighLow' && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 shrink-0">Threshold ≥</span>
              <Input
                type="number"
                value={mapping.threshold}
                onChange={e => onThresholdChange(dest.name, Number(e.target.value))}
                className="h-7 w-24 text-xs"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── FormulaPreviewPanel ───────────────────────────────────────────

function FormulaPreviewPanel({
  mappings, copiedAll, onCopyAll,
}: {
  mappings: Record<string, FieldMapping>
  copiedAll: boolean
  onCopyAll: () => void
}) {
  return (
    <div className="shrink-0 border-t bg-gray-950">
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Formula Preview</span>
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>
        <button
          onClick={onCopyAll}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          {copiedAll ? <><Check className="h-3 w-3 text-green-400" /><span className="text-green-400">Copied!</span></>
                     : <><Copy className="h-3 w-3" />Copy All</>}
        </button>
      </div>
      <div className="px-5 py-3 font-mono text-xs grid grid-cols-2 gap-x-8 gap-y-1.5 max-h-36 overflow-y-auto">
        {DEST_FIELDS.map(d => {
          const formula = generateFormula(mappings[d.name])
          return (
            <div key={d.name} className="flex gap-2 min-w-0">
              <span className="text-gray-500 shrink-0">{d.name.toLowerCase().replace(/ /g, '_')}:</span>
              <span className={cn('truncate', formula === '(unmapped)' ? 'text-gray-600 italic' : 'text-green-400')}>
                {formula}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── AiAssistPanel ─────────────────────────────────────────────────

function AiAssistPanel({
  input, toast, onInputChange, onApply, onClose,
}: {
  input: string
  toast: string | null
  onInputChange: (v: string) => void
  onApply: () => void
  onClose: () => void
}) {
  return (
    <div className="absolute right-0 top-full mt-2 z-50 w-80 rounded-xl border border-purple-200 bg-white shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
        <Sparkles className="h-4 w-4 text-purple-500" />
        <span className="text-sm font-semibold text-gray-800">AI Mapping Assistant</span>
        <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-600">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4 space-y-3">
        <div className="text-xs text-gray-500 space-y-1">
          <div className="font-medium text-gray-600 mb-1.5">Try saying:</div>
          {[
            '"join first and last name with space"',
            '"map job number to project id"',
            '"add 10% margin to budget amount"',
            '"format start date as date"',
          ].map(hint => (
            <div key={hint}
              className="text-gray-400 cursor-pointer hover:text-purple-600 transition-colors pl-2 border-l-2 border-gray-100 hover:border-purple-300"
              onClick={() => onInputChange(hint.replace(/"/g, ''))}
            >
              {hint}
            </div>
          ))}
        </div>
        <textarea
          value={input}
          onChange={e => onInputChange(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onApply() } }}
          placeholder="Describe a mapping in plain English…"
          className="w-full rounded-lg border border-gray-200 p-2.5 text-sm resize-none h-20
            focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400 transition-colors"
          autoFocus
        />
        <button
          onClick={onApply}
          className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-colors"
        >
          Apply Mapping
        </button>
        {toast && (
          <div className={cn(
            'flex items-center gap-2 rounded-lg border px-3 py-2 text-xs',
            toast.startsWith('✗')
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-green-50 border-green-200 text-green-700',
          )}>
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            {toast}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────

export function IntegrationMapper() {
  const [integration, setIntegration] = useState('Vista by Viewpoint')
  const [mappings, setMappings] = useState<Record<string, FieldMapping>>({ ...INITIAL_MAPPINGS })
  const [draggedField, setDraggedField]   = useState<string | null>(null)
  const [dragOverDest, setDragOverDest]   = useState<string | null>(null)
  const [aiOpen, setAiOpen]               = useState(false)
  const [aiInput, setAiInput]             = useState('')
  const [aiToast, setAiToast]             = useState<string | null>(null)
  const [aiHighlight, setAiHighlight]     = useState<string | null>(null)
  const [copiedAll, setCopiedAll]         = useState(false)
  const [savedToast, setSavedToast]       = useState(false)

  const aiRef = useRef<HTMLDivElement>(null)

  // ── Derived ────────────────────────────────────────────────────

  const usedFields = useMemo(() => {
    const s = new Set<string>()
    Object.values(mappings).forEach(m => {
      if (m.mode === 'simple'    && m.sourceField)   s.add(m.sourceField)
      if (m.mode === 'transform' && m.sourceField)   s.add(m.sourceField)
      if (m.mode === 'combine')                       m.sourceFields.forEach(f => s.add(f))
    })
    return s
  }, [mappings])

  // ── DnD Handlers ──────────────────────────────────────────────

  const handleDragStart = (name: string) => setDraggedField(name)
  const handleDragEnd   = () => { setDraggedField(null); setDragOverDest(null) }
  const handleDragOver  = (dest: string) => setDragOverDest(dest)
  const handleDragLeave = () => setDragOverDest(null)

  const handleDrop = (destName: string, src: string) => {
    setDragOverDest(null); setDraggedField(null)
    setMappings(prev => {
      const m = prev[destName]
      if (m.mode === 'simple')    return { ...prev, [destName]: { ...m, sourceField: src } }
      if (m.mode === 'transform') return { ...prev, [destName]: { ...m, sourceField: src } }
      if (m.mode === 'combine' && !m.sourceFields.includes(src))
        return { ...prev, [destName]: { ...m, sourceFields: [...m.sourceFields, src] } }
      return prev
    })
  }

  // ── Mapping Handlers ──────────────────────────────────────────

  const handleModeChange = (destName: string, mode: MappingMode) => {
    setMappings(prev => {
      const cur = prev[destName]
      let next: FieldMapping
      if (mode === 'simple') {
        const sf = cur.mode !== 'combine' ? cur.sourceField : null
        next = { mode: 'simple', sourceField: sf }
      } else if (mode === 'combine') {
        next = { mode: 'combine', sourceFields: [], separator: 'space' }
      } else {
        const sf = cur.mode !== 'combine' ? cur.sourceField : null
        next = { mode: 'transform', sourceField: sf, transform: 'margin10', threshold: 1000 }
      }
      return { ...prev, [destName]: next }
    })
  }

  const handleRemoveSource = (destName: string, src: string) => {
    setMappings(prev => {
      const m = prev[destName]
      if (m.mode === 'simple')    return { ...prev, [destName]: { ...m, sourceField: null } }
      if (m.mode === 'transform') return { ...prev, [destName]: { ...m, sourceField: null } }
      if (m.mode === 'combine')   return { ...prev, [destName]: { ...m, sourceFields: m.sourceFields.filter(f => f !== src) } }
      return prev
    })
  }

  const handleSeparatorChange = (destName: string, sep: Separator) =>
    setMappings(prev => ({ ...prev, [destName]: { ...(prev[destName] as CombineMapping), separator: sep } }))

  const handleTransformChange = (destName: string, op: TransformOp) =>
    setMappings(prev => ({ ...prev, [destName]: { ...(prev[destName] as TransformMapping), transform: op } }))

  const handleThresholdChange = (destName: string, val: number) =>
    setMappings(prev => ({ ...prev, [destName]: { ...(prev[destName] as TransformMapping), threshold: val } }))

  // ── Copy All ──────────────────────────────────────────────────

  const handleCopyAll = () => {
    const text = DEST_FIELDS.map(d => `${d.name.toLowerCase().replace(/ /g, '_')}: ${generateFormula(mappings[d.name])}`).join('\n')
    navigator.clipboard.writeText(text).catch(() => {})
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
  }

  // ── Save ──────────────────────────────────────────────────────

  const handleSave = () => {
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 2500)
  }

  // ── AI Assist ─────────────────────────────────────────────────

  const showToast = (msg: string, dest: string | null) => {
    setAiToast(msg)
    setAiHighlight(dest)
    setTimeout(() => setAiToast(null), 3000)
    setTimeout(() => setAiHighlight(null), 1400)
  }

  const applyAiCommand = () => {
    const text = aiInput.toLowerCase().trim()
    if (!text) return

    // "join/combine first and last name"
    if (/join|combine.*(first|last|name)/.test(text) || /first.*last|last.*first/.test(text)) {
      const sep: Separator = /dash|hyphen/.test(text) ? 'hyphen'
        : /slash/.test(text) ? 'slash'
        : /underscore/.test(text) ? 'underscore'
        : 'space'
      setMappings(prev => ({
        ...prev,
        'Full Name': { mode: 'combine', sourceFields: ['First Name', 'Last Name'], separator: sep },
      }))
      showToast(`Combined First Name + Last Name on "Full Name" with ${SEP_LABELS[sep]} separator`, 'Full Name')
      setAiInput('')
      return
    }

    // "add 10% margin/markup to budget"
    if (/add.*(10%?|margin|markup)/.test(text) || /10%.*budget|margin.*budget/.test(text)) {
      setMappings(prev => ({
        ...prev,
        'Budget Amount': { mode: 'transform', sourceField: 'Total Cost', transform: 'margin10', threshold: 1000 },
      }))
      showToast('Applied "Add 10% margin" transform to Budget Amount', 'Budget Amount')
      setAiInput('')
      return
    }

    // "format start date as date" / "format date"
    if (/format.*(date|start)/.test(text) || /start date.*format/.test(text)) {
      setMappings(prev => ({
        ...prev,
        'Start Date': { mode: 'transform', sourceField: 'Start Date', transform: 'formatDate', threshold: 1000 },
      }))
      showToast('Applied date format transform to Start Date', 'Start Date')
      setAiInput('')
      return
    }

    // "combine X and Y with [sep]"
    const combineMatch = text.match(/combine\s+(.+?)\s+and\s+(.+?)(?:\s+with\s+(\w+))?$/)
    if (combineMatch) {
      const srcA = SOURCE_FIELDS.find(f => f.name.toLowerCase().includes(combineMatch[1].trim()))
      const srcB = SOURCE_FIELDS.find(f => f.name.toLowerCase().includes(combineMatch[2].trim()))
      const sepWord = combineMatch[3] || ''
      const sep: Separator = /dash|hyphen/.test(sepWord) ? 'hyphen'
        : /slash/.test(sepWord) ? 'slash'
        : /underscore/.test(sepWord) ? 'underscore'
        : 'space'
      if (srcA && srcB) {
        const destCand = DEST_FIELDS.find(d => {
          const m = mappings[d.name]
          return d.type === 'string' && m.mode === 'simple' && !m.sourceField
        }) || DEST_FIELDS[0]
        setMappings(prev => ({
          ...prev,
          [destCand.name]: { mode: 'combine', sourceFields: [srcA.name, srcB.name], separator: sep },
        }))
        showToast(`Combined "${srcA.name}" + "${srcB.name}" on "${destCand.name}"`, destCand.name)
        setAiInput('')
        return
      }
    }

    // "map X to Y"
    const mapMatch = text.match(/map\s+(.+?)\s+to\s+(.+)/)
    if (mapMatch) {
      const matchedSrc = SOURCE_FIELDS.find(f => f.name.toLowerCase().includes(mapMatch[1].trim()))
      const matchedDst = DEST_FIELDS.find(f => f.name.toLowerCase().includes(mapMatch[2].trim()))
      if (matchedSrc && matchedDst) {
        setMappings(prev => ({
          ...prev,
          [matchedDst.name]: { mode: 'simple', sourceField: matchedSrc.name },
        }))
        showToast(`Mapped "${matchedSrc.name}" → "${matchedDst.name}"`, matchedDst.name)
        setAiInput('')
        return
      }
    }

    showToast('✗ Couldn\'t understand that. Try: "map job number to project id"', null)
  }

  // ── Render ────────────────────────────────────────────────────

  return (
    <div className="-mt-6 -mx-6 flex flex-col overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>

      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-6 py-3.5 border-b bg-white shrink-0">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Integration Mapper</h2>
            <p className="text-xs text-gray-400">Configure field mappings without code</p>
          </div>
          <div className="h-5 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">ERP System:</span>
            <Select value={integration} onChange={e => setIntegration(e.target.value)} className="w-52 h-8 text-sm">
              {INTEGRATIONS.map(i => <option key={i} value={i}>{i}</option>)}
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {savedToast && (
            <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg">
              <Check className="h-3.5 w-3.5" />Mapping saved
            </div>
          )}
          {/* AI button */}
          <div className="relative" ref={aiRef}>
            <button
              onClick={() => setAiOpen(p => !p)}
              className={cn(
                'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors',
                aiOpen
                  ? 'bg-purple-50 border-purple-300 text-purple-700'
                  : 'border-purple-200 text-purple-600 hover:bg-purple-50',
              )}
            >
              <Sparkles className="h-4 w-4" />Ask AI
            </button>
            {aiOpen && (
              <AiAssistPanel
                input={aiInput}
                toast={aiToast}
                onInputChange={setAiInput}
                onApply={applyAiCommand}
                onClose={() => setAiOpen(false)}
              />
            )}
          </div>
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />Save Mapping
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex flex-1 overflow-hidden">

        {/* Source palette */}
        <SourcePalette
          usedFields={usedFields}
          draggedField={draggedField}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />

        {/* Destination cards */}
        <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
          <div className="grid gap-3 max-w-2xl">
            {DEST_FIELDS.map(dest => (
              <DestCard
                key={dest.name}
                dest={dest}
                mapping={mappings[dest.name]}
                isDragOver={dragOverDest === dest.name}
                isHighlighted={aiHighlight === dest.name}
                onModeChange={m => handleModeChange(dest.name, m)}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onRemoveSource={handleRemoveSource}
                onSeparatorChange={handleSeparatorChange}
                onTransformChange={handleTransformChange}
                onThresholdChange={handleThresholdChange}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Formula preview */}
      <FormulaPreviewPanel
        mappings={mappings}
        copiedAll={copiedAll}
        onCopyAll={handleCopyAll}
      />

      {/* Click outside AI panel */}
      {aiOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setAiOpen(false)}
        />
      )}
    </div>
  )
}
