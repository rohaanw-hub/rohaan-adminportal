import { AppName } from '@/types'

export type ProductCategory = 'HeavyBid' | 'HeavyJob' | 'Fleet' | 'Platform'

export const CATEGORIES: {
  name: ProductCategory
  products: AppName[]
  badgeVariant: 'info' | 'success' | 'warning' | 'purple' | 'teal'
  color: string
}[] = [
  {
    name: 'HeavyBid',
    products: ['Estimating', 'Quotes', 'Pre-Construction', 'Desktop'],
    badgeVariant: 'success',
    color: 'text-green-700',
  },
  {
    name: 'HeavyJob',
    products: ['Manager', 'Safety', 'Skills', 'Forms', 'Docs & Plans', 'myField', 'Resource Planner'],
    badgeVariant: 'info',
    color: 'text-blue-700',
  },
  {
    name: 'Fleet',
    products: ['Telematics', 'Maintenance'],
    badgeVariant: 'teal',
    color: 'text-teal-700',
  },
  {
    name: 'Platform',
    products: ['Chats', 'Copilot', 'Additional Access'],
    badgeVariant: 'purple',
    color: 'text-purple-700',
  },
]

export const ALL_PRODUCTS: AppName[] = CATEGORIES.flatMap(c => c.products)

export const PRODUCT_CATEGORY: Record<AppName, ProductCategory> = Object.fromEntries(
  CATEGORIES.flatMap(c => c.products.map(p => [p, c.name]))
) as Record<AppName, ProductCategory>

export const CATEGORY_BADGE_VARIANT: Record<ProductCategory, 'info' | 'success' | 'warning' | 'purple' | 'teal'> =
  Object.fromEntries(CATEGORIES.map(c => [c.name, c.badgeVariant])) as Record<
    ProductCategory,
    'info' | 'success' | 'warning' | 'purple' | 'teal'
  >
