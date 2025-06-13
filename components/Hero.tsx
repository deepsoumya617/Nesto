'use client'

import { ArrowRight, ArrowRightIcon, Check } from 'lucide-react'
import { AnimatedShinyText } from './magicui/animated-shiny-text'
import { RainbowButton } from './magicui/rainbow-button'
import { cn } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'

export default function Hero() {
  const { isSignedIn } = useAuth()
  return (
    <section className="w-full flex items-center justify-center py-24">
      <div
        className={cn(
          'group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800 absolute top-40  sm:top-46'
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 tracking-wide">
          <span>✨ Introducing Nesto v1.0</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
      <div className="max-w-4xl text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 mt-8 sm:mt-14 hidden sm:block">
          Where code meets clarity. <br />
          Snippets and notes, together at last.
        </h1>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 mt-8 sm:mt-14 sm:hidden">
          Where code <br /> meets clarity. 
          Snippets and notes, together at last.
        </h1>

        <p className="text-md text-muted-foreground mb-8 max-w-2xl mx-auto tracking-wide">
          Capture ideas, draft notes, and save code without distractions. Nesto
          is your personal thinking space for everything that matters.
        </p>

        <div className="flex justify-center gap-3">
          {isSignedIn ? (
            <Link href="/">
              <RainbowButton size="lg" className="group">
                Start Writing
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-4" />
              </RainbowButton>
            </Link>
          ) : (
            <Link href="/">
              <RainbowButton size="lg" className="group">
                Get Started
                <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-2" />
              </RainbowButton>
            </Link>
          )}
          <Link href="/" className='group'>
            <RainbowButton size="lg" variant={'outline'}>
              Learn More
              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-2" />
            </RainbowButton>
          </Link>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-muted-foreground tracking-wide">
          <div className="flex items-center gap-2">
            <Check className="text-primary w-4 h-4" />
            Syntax-Highlighted Snippets
          </div>
          <div className="flex items-center gap-2">
            <Check className="text-primary w-4 h-4" />
            Markdown Note Support
          </div>
          <div className="flex items-center gap-2">
            <Check className="text-primary w-4 h-4" />
            Instant Search & Filtering
          </div>
        </div>
      </div>
    </section>
  )
}
