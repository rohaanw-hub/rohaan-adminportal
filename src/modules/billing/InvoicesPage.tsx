import { useState } from 'react'
import { Download, ChevronRight, FileText } from 'lucide-react'
import { invoices } from '@/data/billing'
import { Invoice } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Sheet, SheetHeader, SheetTitle, SheetClose, SheetContent } from '@/components/ui/sheet'

const STATUS_VARIANT: Record<string, 'success' | 'warning' | 'destructive' | 'info'> = {
  Paid: 'success',
  Due: 'warning',
  Failed: 'destructive',
  Processing: 'info',
}

function InvoicePanel({ invoice, open, onClose }: { invoice: Invoice | null; open: boolean; onClose: () => void }) {
  if (!invoice) return null
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetHeader>
        <div>
          <SheetTitle>{invoice.number}</SheetTitle>
          <p className="text-sm text-gray-500 mt-0.5">{invoice.date}</p>
        </div>
        <SheetClose onClose={onClose} />
      </SheetHeader>
      <SheetContent>
        {/* Invoice header */}
        <div className="flex justify-between mb-6">
          <div>
            <div className="text-xl font-bold text-[#0f2137]">HCSS</div>
            <div className="text-xs text-gray-500 mt-1">Heavy Construction Systems Specialists<br />3 Waterway Square Pl, The Woodlands, TX</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">{invoice.number}</div>
            <div className="text-sm text-gray-500">{invoice.date}</div>
            <Badge variant={STATUS_VARIANT[invoice.status]} className="mt-1">{invoice.status}</Badge>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Billed To</div>
          <div className="text-sm font-medium">Acme Construction</div>
          <div className="text-xs text-gray-500">mwebb@acmeconst.com</div>
        </div>

        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 text-xs text-gray-500 uppercase">Description</th>
              <th className="text-right py-2 text-xs text-gray-500 uppercase">Qty</th>
              <th className="text-right py-2 text-xs text-gray-500 uppercase">Unit Price</th>
              <th className="text-right py-2 text-xs text-gray-500 uppercase">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoice.items.map((item, i) => (
              <tr key={i}>
                <td className="py-2.5 text-gray-700">{item.description}</td>
                <td className="py-2.5 text-right text-gray-500">{item.qty}</td>
                <td className="py-2.5 text-right text-gray-500">${item.unitPrice}</td>
                <td className="py-2.5 text-right font-medium">${(item.qty * item.unitPrice).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-t pt-3 space-y-1 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>${invoice.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Tax (0%)</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-bold text-base mt-2 pt-2 border-t">
            <span>Total</span>
            <span>${invoice.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div className="mt-6">
          <Button className="w-full" variant="outline">
            <Download className="h-4 w-4 mr-2" />Download PDF
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function InvoicesPage() {
  const [selected, setSelected] = useState<Invoice | null>(null)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">{invoices.length} invoices</span>
      </div>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map(inv => (
              <TableRow key={inv.id} className="cursor-pointer" onClick={() => setSelected(inv)}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-blue-600">{inv.number}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{inv.date}</TableCell>
                <TableCell className="font-medium">${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANT[inv.status]}>{inv.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={e => { e.stopPropagation() }}
                      className="text-gray-500"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <InvoicePanel invoice={selected} open={!!selected} onClose={() => setSelected(null)} />
    </div>
  )
}
