import * as React from 'react'
import { cn } from '@/lib/utils'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials?: string
  size?: 'sm' | 'md' | 'lg'
}

function Avatar({ className, initials, size = 'md', ...props }: AvatarProps) {
  const sizes = { sm: 'h-7 w-7 text-xs', md: 'h-9 w-9 text-sm', lg: 'h-12 w-12 text-base' }
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-[#1a3350] text-white font-semibold select-none',
        sizes[size],
        className
      )}
      {...props}
    >
      {initials}
    </div>
  )
}

export { Avatar }
