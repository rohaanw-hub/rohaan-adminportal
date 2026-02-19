import { useState } from 'react'
import { TrendingUp, Package, Calendar, ChevronUp, ChevronDown } from 'lucide-react'
import { subscriptions } from '@/data/billing'
import { ProductSubscription } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'

const TIER_VARIANT: Record<string, 'success' | 'info' | 'purple'> = {
  Starter: 'success',
  Professional: 'info',
  Enterprise: 'purple',
}

function ManageSeatsDialog({ sub, open, onClose }: { sub: ProductSubscription | null; open: boolean; onClose: () => void }) {
  const [seats, setSeats] = useState(sub?.seatsLicensed ?? 0)
  if (!sub) return null

  const unitPrice = sub.unitPrice
  const monthlyCost = seats * unitPrice

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose} className="relative">
        <DialogHeader>
          <DialogTitle>Manage Seats — {sub.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="rounded-lg bg-gray-50 p-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Current plan</span>
              <Badge variant={TIER_VARIANT[sub.tier]}>{sub.tier}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Seats in use</span>
              <span className="font-medium">{sub.seatsUsed} / {sub.seatsLicensed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Unit price</span>
              <span className="font-medium">${unitPrice}/seat/mo</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">New seat count</label>
            <div className="flex items-center gap-3">
              <button
                className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-gray-50 disabled:opacity-50"
                onClick={() => setSeats(s => Math.max(sub.seatsUsed, s - 1))}
                disabled={seats <= sub.seatsUsed}
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <span className="w-16 text-center text-2xl font-bold">{seats}</span>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-gray-50"
                onClick={() => setSeats(s => s + 1)}
              >
                <ChevronUp className="h-4 w-4" />
              </button>
            </div>
            {seats < sub.seatsUsed && (
              <p className="text-xs text-red-500 mt-1.5">Minimum {sub.seatsUsed} seats required (seats in use)</p>
            )}
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Monthly cost preview</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#0f2137]">${monthlyCost.toLocaleString()}/mo</div>
                <div className="text-xs text-gray-500">
                  {seats !== sub.seatsLicensed && (
                    <span className={seats > sub.seatsLicensed ? 'text-amber-600' : 'text-green-600'}>
                      {seats > sub.seatsLicensed ? '+' : ''}${((seats - sub.seatsLicensed) * unitPrice).toLocaleString()}/mo vs current
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Update Seats</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function OverviewPage() {
  const [manageSub, setManageSub] = useState<ProductSubscription | null>(null)
  const totalMRR = subscriptions.reduce((sum, s) => sum + s.seatsLicensed * s.unitPrice, 0)

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border bg-white p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">${totalMRR.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Monthly Recurring Revenue</div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{subscriptions.length}</div>
              <div className="text-sm text-gray-500">Active Products</div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">Jul 1, 2026</div>
              <div className="text-sm text-gray-500">Next Renewal Date</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscriptions table */}
      <div className="rounded-lg border bg-white">
        <div className="px-5 py-4 border-b">
          <h2 className="font-semibold text-gray-900">Product Subscriptions</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Plan Tier</TableHead>
              <TableHead>Seats Used / Licensed</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Monthly Cost</TableHead>
              <TableHead>Renewal Date</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map(sub => {
              const utilPct = Math.round((sub.seatsUsed / sub.seatsLicensed) * 100)
              const monthlyCost = sub.seatsLicensed * sub.unitPrice
              return (
                <TableRow key={sub.id}>
                  <TableCell>
                    <div className="font-medium">{sub.name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={TIER_VARIANT[sub.tier]}>{sub.tier}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1.5">
                      <div className="text-sm">
                        <span className="font-medium">{sub.seatsUsed}</span>
                        <span className="text-gray-400"> / {sub.seatsLicensed}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 rounded-full bg-gray-200">
                          <div
                            className={`h-1.5 rounded-full ${utilPct >= 90 ? 'bg-red-500' : utilPct >= 70 ? 'bg-amber-500' : 'bg-green-500'}`}
                            style={{ width: `${utilPct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{utilPct}%</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">${sub.unitPrice}/seat/mo</TableCell>
                  <TableCell className="font-medium">${monthlyCost.toLocaleString()}/mo</TableCell>
                  <TableCell className="text-sm text-gray-500">{sub.renewalDate}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => setManageSub(sub)}>
                      Manage Seats
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <div className="px-5 py-3 border-t bg-gray-50 flex items-center justify-between text-sm">
          <span className="text-gray-500">Total</span>
          <span className="font-bold text-gray-900">${totalMRR.toLocaleString()}/month</span>
        </div>
      </div>

      <ManageSeatsDialog sub={manageSub} open={!!manageSub} onClose={() => setManageSub(null)} />
    </div>
  )
}
