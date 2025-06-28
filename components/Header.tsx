'use client'

import { Button } from './ui/button'
import { Waves } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth, useClerk } from '@clerk/nextjs'
import { MobileMenu } from './MobileMenu'
import { navMenuLinksSignedOut, navMenuLinksSignedIn } from '@/lib/constants/nav'
import Link from 'next/link'
import ModeToggleButton from './themes/mode-toggle'

export default function Header() {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { signOut } = useClerk()
  const pathname = usePathname()

  return (
    <header
      className={`border-border supports-backdrop-blur:bg-background/80 bg-background/40 sticky top-0 z-40 w-full border-b px-6 py-3 backdrop-blur-lg ${
        isSignedIn ? '' : 'shadow-md shadow-zinc-100/70 dark:shadow-none'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* LEFT SIDE — logo + nav links */}
        <div className="flex items-center gap-6">
          <Waves
            className="h-12 w-12 cursor-pointer rounded-md p-2 text-black transition dark:text-white"
            onClick={() => router.push('/')}
          />

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
            <button
              className="bg-red-orange-50 cursor-pointer rounded-md px-4 py-2.5 text-[13px] tracking-wider text-stone-100"
              onClick={() => router.push('/sign-in')}
            >
              GET STARTED
            </button>
          ) : (
            <button
              className="bg-red-orange-50 cursor-pointer rounded-md px-5 py-2.5 text-[12px] tracking-widest text-stone-100"
              onClick={() => signOut()}
            >
              SIGN OUT
            </button>
          )}
        </div>

        {/* mobile menu — only for unsigned users */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
