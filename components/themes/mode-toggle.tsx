'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ModeToggle({
  children,
}: {
  children: (props: { isDark: boolean; toggle: () => void }) => React.ReactNode
}) {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'
  const toggle = () => setTheme(isDark ? 'light' : 'dark')

  return <>{children({ isDark, toggle })}</>
}
