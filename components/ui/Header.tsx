'use client'

import Link from 'next/link'
import { Button } from './button'
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

  // handle logout
  function handleLogout() {
    signOut()
    router.push('/')
  }

  return (
    <header className="flex items-center justify-between">
      <Link href="/">
        <button className="border px-5 py-2 rounded shadow-[5px_5px_0px_rgba(0,0,0,1)] transition-[box-shadow] duration-300 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer group">
          <h1 className="text-xl font-bold tracking-wide transition-transform duration-300 group-hover:scale-90">
            Nesto
          </h1>
        </button>
      </Link>
      {/* desktop menu */}
      <ul
        className={` hidden md:inline-flex space-x-4 font-medium text-[13px] tracking-wider`}
      >
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
      {isSignedIn ? (
        <Button
          className="hidden md:inline-flex tracking-wider text-[12px] cursor-pointer mr-4"
          variant="outline"
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <div className="space-x-2">
          <Button
            className="hidden md:inline-flex tracking-wider text-[12px] cursor-pointer"
            variant="outline"
            onClick={() => router.push('/sign-in')}
          >
            Login
          </Button>
          <Button
            className="hidden md:inline-flex tracking-wider text-[12px] cursor-pointer"
            onClick={() => router.push('/sign-up')}
          >
            Signup
          </Button>
        </div>
      )}

      {/* Mobile menu - not completed*/}
      <button className="md:hidden" onClick={() => setShowMenu(!showMenu)}>
        {showMenu ? <X size={24} /> : <Menu size={24} />}
      </button>
      {showMenu && <div className="bg-white w-full h-screen"></div>}
    </header>
  )
}
