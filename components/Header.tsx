'use client'

import { Button } from './ui/button'
import { Menu, X, Waves } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { ModeToggle } from './themes/mode-toggle'

export default function Header() {
  const router = useRouter()
  const { isSignedIn, signOut } = useAuth()
  const [showMenu, setShowMenu] = useState(false)

  function handleLogout() {
    signOut()
    router.push('/')
  }

  return (
    <header className="w-full border-b px-6 py-4 sticky top-0 z-40 border-border supports-backdrop-blur:bg-background/80 bg-background/40 backdrop-blur-lg shadow-md shadow-zinc-100/70 dark:shadow-none">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <Waves
          className="text-black dark:text-white cursor-pointer rounded-md w-12 h-12 p-2 transition"
          onClick={() => router.push('/')}
        />

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isSignedIn ? (
            <Button
              className="tracking-wider text-[12px] cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              className="tracking-wider text-[12px] cursor-pointer"
              onClick={() => router.push('/sign-in')}
            >
              Get Started
            </Button>
          )}
          <ModeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setShowMenu(!showMenu)}>
          <Menu size={24} />
        </button>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-white dark:bg-black flex flex-col items-start gap-8 z-50 px-10 py-20 overflow-y-auto">
            <button
              className="absolute top-8 right-4"
              onClick={() => setShowMenu(false)}
            >
              <X size={28} />
            </button>

            {/* Optional: Add ModeToggle to mobile menu */}
            <ModeToggle />

            {/* Mobile Auth Button */}
            {isSignedIn ? (
              <Button
                className="tracking-wider text-xl px-8 py-6"
                onClick={() => {
                  setShowMenu(false)
                  handleLogout()
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                className="tracking-wider text-xl px-8 py-6"
                onClick={() => {
                  setShowMenu(false)
                  router.push('/sign-in')
                }}
              >
                Get Started
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
