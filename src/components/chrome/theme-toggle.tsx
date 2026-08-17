'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Light/dark switch.
 *
 * The class is already on <html> before this mounts (see THEME_SCRIPT in the
 * layout), so this only ever reads the current state and writes the next one.
 * It renders a fixed-size placeholder until mounted rather than guessing, which
 * keeps the header from reflowing when the real icon arrives.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState<boolean | null>(null)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('pepay-theme', next ? 'dark' : 'light')
    } catch {
      // Private-mode storage failure is not worth breaking the toggle over.
    }
    setDark(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'grid h-9 w-9 place-items-center rounded-full border border-hairline bg-surface',
        'text-ink-3 shadow-e1 transition-colors duration-300 ease-pep hover:text-ink',
        className
      )}
    >
      {dark === null ? (
        <span className="h-4 w-4" />
      ) : dark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  )
}
