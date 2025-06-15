'use client'

import { Button } from './ui/button'
import { Waves } from 'lucide-react'
// import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { UserAvatar } from './UserAvatar'
import { navMenuLinks } from '@/lib/constans/nav'
import { MobileMenu } from './MobileMenu'
import { Geist } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
  preload: true,
})

export default function Header() {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  // const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="w-full border-b px-6 py-4 sticky top-0 z-40 border-border supports-backdrop-blur:bg-background/80 bg-background/40 backdrop-blur-lg shadow-md shadow-zinc-100/70 dark:shadow-none">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <Waves
          className="text-black dark:text-white cursor-pointer rounded-md w-12 h-12 p-2 transition"
          onClick={() => router.push('/')}
        />

        {/* nav menu - desktop */}
        {!isSignedIn ? (
          <div className="hidden md:flex items-center gap-8">
            <div className="hidden md:flex items-center gap-5">
              {navMenuLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => router.push(link.href)}
                  className={`${geist.className} text-[13px] tracking-wider transition-colors cursor-pointer font-semibold text-gray-600 hover:text-gray-900 hover:underline underline-gray-900 underline-offset-2`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <Button
              className="tracking-wider text-[12px] cursor-pointer"
              onClick={() => router.push('/sign-in')}
            >
              Get Started
            </Button>
          </div>
        ) : (
          <UserAvatar />
        )}

        {/* mobile menu */}
        {!isSignedIn && (
          <div className="md:hidden">
            <MobileMenu />
          </div>
        )}
      </div>
    </header>
  )
}
