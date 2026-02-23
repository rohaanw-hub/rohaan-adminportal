import * as React from 'react'
import { cn } from '@/lib/utils'

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  )
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
  )
)
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  )
)
TableBody.displayName = 'TableBody'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-gray-50',
        className
      )}
      {...props}
    />
  )
)
TableRow.displayName = 'TableRow'

// ── Resizable TableHead ────────────────────────────────────────────────────

function TableHead({ className, children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  const thRef = React.useRef<HTMLTableCellElement>(null)

  const getTable = (): HTMLTableElement | null =>
    (thRef.current?.closest('table') as HTMLTableElement) ?? null

  /** Snapshot all th widths and switch table to fixed layout (idempotent). */
  const lockLayout = () => {
    const table = getTable()
    if (!table || table.style.tableLayout === 'fixed') return
    const ths = Array.from(table.querySelectorAll<HTMLTableCellElement>('thead th'))
    ths.forEach(th => { th.style.width = `${th.offsetWidth}px` })
    table.style.tableLayout = 'fixed'
    table.style.width = `${table.offsetWidth}px`
  }

  /** Mousedown on the resize handle — drag to resize. */
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const th = thRef.current
    if (!th) return
    lockLayout()

    const startX = e.clientX
    const startW = th.offsetWidth
    let moved = false

    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'col-resize'

    const onMove = (ev: MouseEvent) => {
      const delta = ev.clientX - startX
      if (!moved && Math.abs(delta) < 3) return
      moved = true
      th.style.width = `${Math.max(48, startW + delta)}px`
    }

    const onUp = () => {
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  return (
    <th
      ref={thRef}
      className={cn(
        'relative h-10 px-4 text-left align-middle font-medium text-gray-500 text-xs uppercase tracking-wide [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    >
      {children}
      {/* Resize handle — 8 px hit zone on the right edge */}
      <div
        className="absolute right-0 top-0 h-full w-2 cursor-col-resize select-none z-10 group flex items-center justify-center"
        onMouseDown={handleMouseDown}
        title="Drag to resize"
      >
        <div className="h-4 w-px rounded-full bg-transparent group-hover:bg-blue-400 transition-colors duration-100" />
      </div>
    </th>
  )
}
TableHead.displayName = 'TableHead'

// ──────────────────────────────────────────────────────────────────────────

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    />
  )
)
TableCell.displayName = 'TableCell'

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
