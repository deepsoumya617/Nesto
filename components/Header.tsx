'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

const navLinks = [
  {
    href: '/notes',
    label: 'Notes',
  },
  {
    href: '/snippets',
    label: 'Snippets',
  },
]

export default function Header() {
  const router = useRouter()
  const { isSignedIn, signOut } = useAuth()
  const pathName = usePathname()
  const [showMenu, setShowMenu] = useState(false)

  function handleLogout() {
    signOut()
    router.push('/')
  }

  return (
    <header className="flex items-center justify-between">
      <Link href="/">
        <button className="border-2 border-black px-5 py-2 rounded-[3px] shadow-[5px_5px_0px_rgba(0,0,0,1)] transition-[box-shadow] duration-300 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer group">
          <h1 className="text-xl font-bold tracking-wide transition-transform duration-300 group-hover:scale-90">
            Nesto
          </h1>
        </button>
      </Link>
      {/* desktop menu */}
      {isSignedIn && (
        <ul className="hidden md:inline-flex space-x-4 font-medium text-[13px] tracking-wider">
          {navLinks.map((link, idx) => {
            return (
              <li key={idx}>
                <Link
                  className={`${
                    pathName === link.href ? 'text-zinc-900' : 'text-zinc-400'
                  }`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
      {isSignedIn ? (
        <Button
          className="hidden md:inline-flex tracking-wider text-[12px] cursor-pointer mr-4"
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <Button
          className="hidden md:inline-flex tracking-wider text-[12px] cursor-pointer"
          onClick={() => router.push('/sign-up')}
        >
          Get Started
        </Button>
      )}

      {/* Mobile Menu Toggle */}
      <button className="md:hidden" onClick={() => setShowMenu(!showMenu)}>
        <Menu size={24} />
      </button>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed top-0 left-0 w-full h-full bg-white flex flex-col items-start gap-8 z-40 px-10 py-20">
          <button
            className="absolute top-8 right-4"
            onClick={() => setShowMenu(false)}
          >
            <X size={28} />
          </button>

          {/* Mobile nav links */}
          <ul className="font-medium text-xl tracking-wider flex flex-col space-y-4">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  className={`${
                    pathName === link.href ? 'text-zinc-900' : 'text-zinc-400'
                  }`}
                  href={link.href}
                  onClick={() => setShowMenu(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Auth Button */}
          {isSignedIn ? (
            <Button
              className="tracking-wider text-xl px-8 py-6"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              className="tracking-wider text-xl px-8 py-6"
              onClick={() => {
                setShowMenu(false)
                router.push('/sign-up')
              }}
            >
              Get Started
            </Button>
          )}
        </div>
      )}
    </header>
  )
}
