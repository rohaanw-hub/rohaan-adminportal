import { ProductSubscription, Invoice, PaymentMethod } from '@/types'

export const subscriptions: ProductSubscription[] = [
  { id: 'ps1', name: 'HeavyJob', tier: 'Enterprise', seatsUsed: 42, seatsLicensed: 50, unitPrice: 85, renewalDate: '2026-07-01' },
  { id: 'ps2', name: 'HeavyBid', tier: 'Professional', seatsUsed: 8, seatsLicensed: 10, unitPrice: 120, renewalDate: '2026-07-01' },
  { id: 'ps3', name: 'Dispatcher', tier: 'Professional', seatsUsed: 5, seatsLicensed: 10, unitPrice: 75, renewalDate: '2026-07-01' },
  { id: 'ps4', name: 'Safety', tier: 'Starter', seatsUsed: 12, seatsLicensed: 15, unitPrice: 45, renewalDate: '2026-07-01' },
]

export const invoices: Invoice[] = [
  { id: 'inv1', number: 'INV-2026-0218', date: '2026-02-01', amount: 5475.00, status: 'Paid', items: [{ description: 'HeavyJob Enterprise (50 seats)', qty: 50, unitPrice: 85 }, { description: 'HeavyBid Professional (10 seats)', qty: 10, unitPrice: 120 }, { description: 'Dispatcher Professional (10 seats)', qty: 10, unitPrice: 75 }, { description: 'Safety Starter (15 seats)', qty: 15, unitPrice: 45 }] },
  { id: 'inv2', number: 'INV-2026-0117', date: '2026-01-01', amount: 5475.00, status: 'Paid', items: [{ description: 'HeavyJob Enterprise (50 seats)', qty: 50, unitPrice: 85 }, { description: 'HeavyBid Professional (10 seats)', qty: 10, unitPrice: 120 }, { description: 'Dispatcher Professional (10 seats)', qty: 10, unitPrice: 75 }, { description: 'Safety Starter (15 seats)', qty: 15, unitPrice: 45 }] },
  { id: 'inv3', number: 'INV-2025-1201', date: '2025-12-01', amount: 5475.00, status: 'Paid', items: [{ description: 'HeavyJob Enterprise (50 seats)', qty: 50, unitPrice: 85 }, { description: 'HeavyBid Professional (10 seats)', qty: 10, unitPrice: 120 }, { description: 'Dispatcher Professional (10 seats)', qty: 10, unitPrice: 75 }, { description: 'Safety Starter (15 seats)', qty: 15, unitPrice: 45 }] },
  { id: 'inv4', number: 'INV-2025-1101', date: '2025-11-01', amount: 4900.00, status: 'Paid', items: [{ description: 'HeavyJob Enterprise (50 seats)', qty: 50, unitPrice: 85 }, { description: 'HeavyBid Professional (10 seats)', qty: 10, unitPrice: 120 }, { description: 'Dispatcher Starter (5 seats)', qty: 5, unitPrice: 75 }, { description: 'Safety Starter (10 seats)', qty: 10, unitPrice: 45 }] },
  { id: 'inv5', number: 'INV-2025-1001', date: '2025-10-01', amount: 4900.00, status: 'Paid', items: [{ description: 'HeavyJob Enterprise (50 seats)', qty: 50, unitPrice: 85 }, { description: 'HeavyBid Professional (10 seats)', qty: 10, unitPrice: 120 }, { description: 'Dispatcher Starter (5 seats)', qty: 5, unitPrice: 75 }, { description: 'Safety Starter (10 seats)', qty: 10, unitPrice: 45 }] },
  { id: 'inv6', number: 'INV-2025-0901', date: '2025-09-01', amount: 4900.00, status: 'Paid', items: [{ description: 'HeavyJob Enterprise (50 seats)', qty: 50, unitPrice: 85 }, { description: 'HeavyBid Professional (10 seats)', qty: 10, unitPrice: 120 }, { description: 'Dispatcher Starter (5 seats)', qty: 5, unitPrice: 75 }, { description: 'Safety Starter (10 seats)', qty: 10, unitPrice: 45 }] },
  { id: 'inv7', number: 'INV-2025-0801', date: '2025-08-01', amount: 4250.00, status: 'Paid', items: [{ description: 'HeavyJob Enterprise (50 seats)', qty: 50, unitPrice: 85 }, { description: 'HeavyBid Professional (10 seats)', qty: 10, unitPrice: 120 }] },
  { id: 'inv8', number: 'INV-2025-0701', date: '2025-07-01', amount: 4250.00, status: 'Paid', items: [{ description: 'HeavyJob Enterprise (50 seats)', qty: 50, unitPrice: 85 }, { description: 'HeavyBid Professional (10 seats)', qty: 10, unitPrice: 120 }] },
  { id: 'inv9', number: 'INV-2026-0301', date: '2026-03-01', amount: 5475.00, status: 'Due', items: [{ description: 'HeavyJob Enterprise (50 seats)', qty: 50, unitPrice: 85 }, { description: 'HeavyBid Professional (10 seats)', qty: 10, unitPrice: 120 }, { description: 'Dispatcher Professional (10 seats)', qty: 10, unitPrice: 75 }, { description: 'Safety Starter (15 seats)', qty: 15, unitPrice: 45 }] },
  { id: 'inv10', number: 'INV-2025-0501', date: '2025-05-01', amount: 4250.00, status: 'Paid', items: [{ description: 'HeavyJob Enterprise (50 seats)', qty: 50, unitPrice: 85 }, { description: 'HeavyBid Professional (10 seats)', qty: 10, unitPrice: 120 }] },
  { id: 'inv11', number: 'INV-2025-0401', date: '2025-04-01', amount: 4250.00, status: 'Paid', items: [{ description: 'HeavyJob Enterprise (50 seats)', qty: 50, unitPrice: 85 }, { description: 'HeavyBid Professional (10 seats)', qty: 10, unitPrice: 120 }] },
  { id: 'inv12', number: 'INV-2024-1201', date: '2024-12-01', amount: 3400.00, status: 'Failed', items: [{ description: 'HeavyJob Professional (40 seats)', qty: 40, unitPrice: 85 }] },
]

export const paymentMethod: PaymentMethod = {
  last4: '4242',
  brand: 'Visa',
  expMonth: 8,
  expYear: 2027,
  billingName: 'Marcus Webb',
  billingEmail: 'mwebb@acmeconst.com',
  billingAddress: '4500 Highway 6 N, Houston, TX 77084',
}
