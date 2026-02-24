import { Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function GroupProductPage({ product }: { product: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Users className="h-7 w-7 text-gray-300" />
      </div>
      <h2 className="text-base font-semibold text-gray-900 mb-1">{product} Groups</h2>
      <p className="text-sm text-gray-500 max-w-xs mb-6">
        Product-specific group management for {product} is coming soon.
      </p>
      <Button variant="outline" size="sm" disabled>Coming Soon</Button>
    </div>
  )
}
