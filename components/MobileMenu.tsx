'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  navMenuLinksSignedIn,
  navMenuLinksSignedOut,
} from '@/lib/constants/nav'
import { useAuth, useClerk } from '@clerk/nextjs'
import ModeToggleButton from './themes/mode-toggle'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from './ui/button'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { signOut } = useClerk()

  // animation variants
  // Stagger group for nav menu
  const navMenuVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  // Each nav item comes from top
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    },
  }

  // Auth button comes from bottom
  const buttonVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
        delay: 0.5,
      },
    },
  }

  // Underline animation
  const underlineVariants = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1 },
  }

  return (
    <>
      <div className="fixed top-3.5 right-8 z-40 flex items-center gap-3 md:hidden">
        {isSignedIn && (
          <>
            <ModeToggleButton />
            <button
              onClick={() => setIsOpen(true)}
              className="flex size-9 items-center justify-center rounded-full border focus:outline-none"
            >
              <Menu size={22} />
            </button>
          </>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, type: 'tween' }}
            className="bg-background/80 fixed top-0 right-0 z-50 flex h-screen w-[80%] flex-col items-start gap-4 px-8 backdrop-blur-md"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-6 flex size-9 items-center justify-center rounded-full border dark:border-stone-50"
            >
              <X size={22} className="text-stone-900 dark:text-stone-50" />
            </button>
            <motion.nav
              variants={navMenuVariants}
              initial="hidden"
              animate="show"
              className="font-geist mt-40 flex flex-col gap-1"
            >
              {navMenuLinksSignedIn.map((link) => {
                return (
                  <motion.button
                    key={link.href}
                    variants={navItemVariants}
                    onClick={() => {
                      router.push(link.href)
                      setIsOpen(false)
                    }}
                    className="text-left text-2xl font-medium tracking-tight text-stone-900 dark:text-stone-50"
                  >
                    <p className="flex items-center">
                      {link.label}
                      {/* <span>
                            <ArrowUpRight size={26} className="mb-2" />
                          </span> */}
                    </p>
                    {/* <motion.div
                          variants={underlineVariants}
                          transition={{ duration: 0.4 }}
                          className="h-[0.1rem] w-full bg-stone-900 dark:bg-stone-50"
                        /> */}
                  </motion.button>
                )
              })}
            </motion.nav>
            {/* auth buttons */}
            <motion.div
              className="w-full"
              variants={buttonVariants}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.6 }}
            >
              <Button
                className="font-geist mt-3 w-full cursor-pointer rounded-md px-5 py-6 text-sm font-medium"
                // variant="destructive"
                onClick={() => {
                  if (isSignedIn) signOut()
                  else router.push('/sign-in')
                }}
              >
                {isSignedIn ? 'Sign Out' : 'Get Started'}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
