'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center gap-2 pl-1 py-0.5 cursor-pointer"
    >
      {isDark ? (
        <>
          <Sun size={16} className="inline-block" />
          <span className="text-sm leading-none tracking-wide">Light</span>
        </>
      ) : (
        <>
          <Moon size={16} className="inline-block" />
          <span className="text-sm leading-none tracking-wide">Dark</span>
        </>
      )}
    </button>
  )
}