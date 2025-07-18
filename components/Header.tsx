'use client'

import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useAuth, useClerk } from '@clerk/nextjs'
import {
  navMenuLinksSignedIn,
  navMenuLinksSignedOut,
} from '@/lib/constants/nav'
import Link from 'next/link'
import ModeToggleButton from './themes/mode-toggle'

export default function Header() {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { signOut } = useClerk()

  return (
    <header className="border-border supports-backdrop-blur:bg-background/80 bg-background/40 sticky top-0 z-40 w-full border-b px-6 py-4 backdrop-blur-lg">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        {/* LEFT SIDE — logo + nav links */}
        <div className="flex items-center gap-3">
          <div className="flex">
            <p className="text-2xl">~</p>
            <h3 className="font-geist text-xl">Nesto.ai</h3>
          </div>

          {/* nav menu - desktop */}
          {isSignedIn ? (
            <div className="font-geist hidden items-center font-medium md:flex">
              {navMenuLinksSignedIn.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className="rounded-md px-3 py-1.5 text-[12px] font-semibold tracking-tight hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ) : (
            <div className="font-geist hidden items-center font-medium md:flex">
              {navMenuLinksSignedOut.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className="rounded-md px-3 py-1.5 text-[12px] font-semibold tracking-tight hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE — mode toggle + button */}
        <div className="hidden items-center gap-4 md:flex">
          {!isSignedIn ? (
            // <Badge className="pointer-events-none flex items-center rounded-lg px-4 py-2 text-[13px] tracking-wide">
            //   {resolvedTheme === 'dark' ? (
            //     <img src="/Github_light.svg" className="size-4" />
            //   ) : (
            //     <img src="/Github_dark.svg" className="size-4" />
            //   )}
            //   <p className="text-[13px] font-medium">Star on Github ⭐</p>
            //   {stars !== null && (
            //     <span className="-ml-1 text-sm font-semibold">
            //       {stars.toLocaleString()}
            //     </span>
            //   )}
            // </Badge>
            <div className="font-geist flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="cursor-pointer font-bold shadow-none"
                onClick={() => router.push('/sign-in')}
              >
                Log in
              </Button>
              <Button
                size="sm"
                className="cursor-pointer font-semibold"
                onClick={() => router.push('/sign-up')}
              >
                Sign up
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <ModeToggleButton />
              <Button
                className="cursor-pointer rounded-md font-geist"
                onClick={() => signOut()}
                size='sm'
              >
                Log out
              </Button>
            </div>
          )}
          {/* {!isSignedIn && (
            <div className="flex h-5 items-center space-x-3 text-sm">
              <ModeToggleButton />
              <Separator orientation="vertical" />
              <Link href="https://github.com/deepsoumya617/nesto">
                {resolvedTheme === 'dark' ? (
                  <img src="/Github_dark.svg" className="size-4" />
                ) : (
                  <img src="/Github_light.svg" className="size-4" />
                )}
              </Link>
              <Separator orientation="vertical" />
              {resolvedTheme === 'dark' ? (
                <img src="/x-dark.svg" className="size-4" />
              ) : (
                <img src="/x-light.svg" className="size-4" />
              )}
            </div>
          )} */}
        </div>
      </div>
    </header>
  )
}
