import { useState } from 'react'
import { CreditCard, Lock, Edit2 } from 'lucide-react'
import { paymentMethod } from '@/data/billing'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

const CARD_ICONS: Record<string, string> = {
  Visa: '💳',
  Mastercard: '💳',
  Amex: '💳',
}

export function PaymentPage() {
  const [updateOpen, setUpdateOpen] = useState(false)
  const pm = paymentMethod

  return (
    <div className="max-w-2xl space-y-6">
      {/* Current card */}
      <div className="rounded-lg border bg-white p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-gray-900">Payment Method</h2>
          <Button variant="outline" size="sm" onClick={() => setUpdateOpen(true)}>
            <Edit2 className="h-3.5 w-3.5 mr-1.5" />Update
          </Button>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-lg border bg-gradient-to-r from-[#0f2137] to-[#1a3350] text-white">
          <CreditCard className="h-8 w-8 text-amber-400" />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="font-bold text-lg">{pm.brand}</span>
              <span className="text-white/60">ending in</span>
              <span className="font-mono text-lg">•••• {pm.last4}</span>
            </div>
            <div className="text-sm text-white/70">Expires {pm.expMonth}/{pm.expYear}</div>
          </div>
          <Lock className="h-4 w-4 text-white/40" />
        </div>
      </div>

      {/* Billing contact */}
      <div className="rounded-lg border bg-white p-6">
        <h2 className="font-semibold text-gray-900 mb-5">Billing Contact</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Name</Label>
              <Input defaultValue={pm.billingName} />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Email</Label>
              <Input type="email" defaultValue={pm.billingEmail} />
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium mb-1.5 block">Billing Address</Label>
            <Input defaultValue={pm.billingAddress} />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button size="sm">Save Contact Info</Button>
        </div>
      </div>

      {/* Update payment dialog (Stripe-style) */}
      <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
        <DialogContent onClose={() => setUpdateOpen(false)} className="relative">
          <DialogHeader>
            <DialogTitle>Update Payment Method</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-md border bg-gray-50 p-3 flex items-center gap-2 text-xs text-gray-500">
              <Lock className="h-3.5 w-3.5 text-green-600" />
              Secured by TLS encryption. Card details are tokenized and never stored.
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Card Number</Label>
              <div className="relative">
                <Input placeholder="1234 5678 9012 3456" className="pr-12 font-mono" />
                <CreditCard className="absolute right-3 top-2 h-5 w-5 text-gray-300" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Expiry</Label>
                <Input placeholder="MM / YY" className="font-mono" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1.5 block">CVC</Label>
                <Input placeholder="•••" className="font-mono" />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Cardholder Name</Label>
              <Input placeholder="Marcus Webb" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateOpen(false)}>Cancel</Button>
            <Button onClick={() => setUpdateOpen(false)}>Update Card</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
