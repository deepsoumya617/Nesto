'use client'

import { Button } from './ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth, useClerk } from '@clerk/nextjs'
import { navMenuLinksSignedIn } from '@/lib/constants/nav'
import Link from 'next/link'
import ModeToggleButton from './themes/mode-toggle'
import { RainbowButton } from './magicui/rainbow-button'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Header() {
  const { resolvedTheme } = useTheme()
  const { isSignedIn } = useAuth()
  const { signOut } = useClerk()
  const pathname = usePathname()

  // fetch stars
  const [stars, setStars] = useState<number | null>(null)
  useEffect(() => {
    const fetchStars = async () => {
      try {
        const res = await fetch(
          'https://api.github.com/repos/deepsoumya617/nesto',
        )
        if (!res.ok) throw new Error('Failed to fetch stars')
        const data = await res.json()
        setStars(data.stargazers_count)
      } catch (err) {
        console.error(err)
      }
    }
    fetchStars()
  }, [])

  return (
    <header
      className={`border-border supports-backdrop-blur:bg-background/80 bg-background/40 sticky top-0 z-40 w-full border-b px-6 py-4 backdrop-blur-lg ${
        isSignedIn ? '' : 'shadow-md shadow-zinc-100/70 dark:shadow-none'
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        {/* LEFT SIDE — logo + nav links */}
        <div className="flex items-center gap-6">
          <div className="flex">
            <p className="text-2xl">~</p>
            <h3 className="font-geist text-xl">Nesto.ai</h3>
          </div>

          {/* nav menu - desktop */}
          {isSignedIn && (
            <div className="font-geist hidden items-center gap-7 font-medium md:flex">
              {navMenuLinksSignedIn.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className={`underline-gray-900 cursor-pointer text-sm tracking-wide decoration-2 underline-offset-4 transition-colors hover:text-black hover:underline ${
                    pathname === link.href
                      ? 'underline-gray-900 text-gray-900 underline decoration-2 underline-offset-4 dark:text-gray-100'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE — mode toggle + button */}
        <div className="hidden items-center gap-4 md:flex">
          <ModeToggleButton />
          {!isSignedIn ? (
            <RainbowButton className="flex items-center rounded-lg text-[13px] tracking-wide pointer-events-none">
              {resolvedTheme === 'dark' ? (
                <img src="/Github_light.svg" className="size-4" />
              ) : (
                <img src="/Github_dark.svg" className="size-4" />
              )}
              <p className='font-normal'>Star on Github ⭐</p>
              {stars !== null && (
                <span className="-ml-1 text-sm font-semibold">
                  {stars.toLocaleString()}
                </span>
              )}
            </RainbowButton>
          ) : (
            <Button
              className="cursor-pointer rounded-md px-5 py-2.5 text-sm text-stone-100"
              onClick={() => signOut()}
              variant="destructive"
            >
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
