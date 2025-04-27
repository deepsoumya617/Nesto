'use client'

import Link from 'next/link'
import { Button } from './button'
import { Press_Start_2P } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const ps = Press_Start_2P({
  weight: '400',
})

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
  const pathName = usePathname()
  const [showMenu, setShowMenu] = useState(false)
  const isAuthenticated = false

  return (
    <header className="flex items-center justify-between">
      <Link href="/" className={ps.className}>
        <h1 className="text-xl font-bold underline decoration-purple-500">
          Nesto
        </h1>
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
      {isAuthenticated ? (
        <Button
          className="hidden md:inline-flex tracking-wider text-[12px] cursor-pointer"
          variant="outline"
        >
          Logout
        </Button>
      ) : (
        <div className="space-x-2">
          <Button
            className="hidden md:inline-flex tracking-wider text-[12px] cursor-pointer"
            variant="outline"
          >
            Login
          </Button>
          <Button className="hidden md:inline-flex tracking-wider text-[12px] cursor-pointer">
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
