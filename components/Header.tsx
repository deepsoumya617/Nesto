'use client'

import { Button } from './ui/button'
import { Waves } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { UserAvatar } from './UserAvatar'
import { MobileMenu } from './MobileMenu'
import { Geist } from 'next/font/google'
import { navMenuLinks, navMenuLinksSignedIn } from '@/lib/constants/nav'
import Link from 'next/link'

const geist = Geist({
  subsets: ['latin'],
  preload: true,
})

export default function Header() {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const pathname = usePathname()
  // const [showMenu, setShowMenu] = useState(false)

  return (
    <header
      className={`w-full border-b px-6 py-3 sticky top-0 z-40 border-border supports-backdrop-blur:bg-background/80 bg-background/40 backdrop-blur-lg  ${
        isSignedIn ? '' : 'shadow-md shadow-zinc-100/70 dark:shadow-none'
      }`}
    >
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
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${geist.className} text-[13px] tracking-wider transition-colors cursor-pointer font-semibold text-gray-600 dark:text-gray-100 hover:text-gray-900 hover:underline underline-gray-900 underline-offset-2`}
                >
                  {link.label}
                </Link>
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
          <div className="flex items-center">
            <div className="hidden md:flex items-center gap-7 mr-10">
              {navMenuLinksSignedIn.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className={`${
                    geist.className
                  } text-sm tracking-normal transition-colors cursor-pointer hover:underline underline-gray-900 hover:text-black underline-offset-4 decoration-2 ${
                    pathname === link.href
                      ? 'text-gray-900 dark:text-gray-100 underline underline-gray-900 underline-offset-4 decoration-2'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <UserAvatar />
          </div>
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
