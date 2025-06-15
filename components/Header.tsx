'use client'

import { Button } from './ui/button'
import { Menu, X, Waves } from 'lucide-react'
// import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { UserAvatar } from './UserAvatar'

export default function Header() {
  const router = useRouter()
  const { isSignedIn, signOut } = useAuth()
  // const [showMenu, setShowMenu] = useState(false)

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
            <UserAvatar />
          ) : (
            <Button
              className="tracking-wider text-[12px] cursor-pointer"
              onClick={() => router.push('/sign-in')}
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
