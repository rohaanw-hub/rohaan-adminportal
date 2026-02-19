import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'
import { SecondaryNav } from './SecondaryNav'
import { AiCommandPalette } from './AiCommandPalette'

export function Shell() {
  const [aiOpen, setAiOpen] = useState(false)

  // Global ⌘K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setAiOpen(p => !p)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopNav onAiOpen={() => setAiOpen(true)} />

      <div className="flex flex-1 pt-14">
        <SecondaryNav />
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <AiCommandPalette open={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  )
}
