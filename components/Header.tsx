'use client'

import { Button } from './ui/button'
import { Waves } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth, useClerk } from '@clerk/nextjs'
import { UserAvatar } from './UserAvatar'
import { MobileMenu } from './MobileMenu'
import { Geist } from 'next/font/google'
import { navMenuLinks, navMenuLinksSignedIn } from '@/lib/constants/nav'
import Link from 'next/link'
import { AuroraText } from './magicui/aurora-text'

const geist = Geist({
  subsets: ['latin'],
  preload: true,
})

export default function Header() {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { signOut } = useClerk()
  const pathname = usePathname()
  // const [showMenu, setShowMenu] = useState(false)

  return (
    <header
      className={`border-border supports-backdrop-blur:bg-background/80 bg-background/40 sticky top-0 z-40 w-full border-b px-6 py-3 backdrop-blur-lg ${
        isSignedIn ? '' : 'shadow-md shadow-zinc-100/70 dark:shadow-none'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Waves
          className="h-12 w-12 cursor-pointer rounded-md p-2 text-black transition dark:text-white"
          onClick={() => router.push('/')}
        />

        {/* nav menu - desktop */}
        {!isSignedIn ? (
          <div className="hidden items-center gap-8 md:flex">
            <div className="hidden items-center gap-5 md:flex">
              {navMenuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${geist.className} underline-gray-900 cursor-pointer text-[13px] font-semibold tracking-wider text-gray-600 underline-offset-2 transition-colors hover:text-gray-900 hover:underline dark:text-gray-100`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Button
              className="cursor-pointer text-[12px] tracking-wider"
              onClick={() => router.push('/sign-in')}
            >
              Get Started
            </Button>
          </div>
        ) : (
          <div className={`flex items-center ${geist.className}`}>
            <div className="mr-6 hidden items-center gap-7 md:flex">
              {navMenuLinksSignedIn.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className={`underline-gray-900 cursor-pointer text-sm tracking-normal decoration-2 underline-offset-4 transition-colors hover:text-black hover:underline ${
                    pathname === link.href
                      ? 'underline-gray-900 text-gray-900 underline decoration-2 underline-offset-4 dark:text-gray-100'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* <UserAvatar /> */}
            <Button
              size="sm"
              className="cursor-pointer px-4 tracking-wide"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
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
