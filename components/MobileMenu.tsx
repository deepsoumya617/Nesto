'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { navMenuLinks } from '@/lib/constans/nav'
import { Button } from './ui/button'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isOpen && (
        <div className="absolute top-10 right-0 z-50 w-[200px] p-4 bg-white shadow-lg rounded-md flex flex-col gap-4">
          {navMenuLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => {
                router.push(link.href)
                setIsOpen(false)
              }}
              className="text-sm font-medium text-gray-700  text-left tracking-wide"
            >
              {link.label}
            </button>
          ))}

          <Button
            onClick={() => {
              router.push('/sign-in')
              setIsOpen(false)
            }}
            className="tracking-wider text-[12px]"
          >
            Get Started
          </Button>
        </div>
      )}
    </div>
  )
}
