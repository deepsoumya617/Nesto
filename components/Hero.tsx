'use client'

import { ArrowRight, ArrowRightIcon, Check } from 'lucide-react'
import { AnimatedShinyText } from './magicui/animated-shiny-text'
import { RainbowButton } from './magicui/rainbow-button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { TextAnimate } from './magicui/text-animate'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="flex w-full items-center justify-center py-24">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="animate-grid-pan-slow h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-[size:14px_24px] opacity-50 dark:opacity-70" />
      </div>
      <div
        className={cn(
          'group absolute top-40 rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 sm:top-46 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800',
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 tracking-wide transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Introducing Nesto v1.0</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
      <div className="max-w-4xl px-4 text-center">
        {/* desktop */}
        <TextAnimate
          className="mt-14 mb-6 hidden px-6 text-5xl font-bold tracking-tight md:block"
          animate="blurInUp"
          by="character"
          duration={0.9}
          once
        >
          Where code meets clarity - Snippets and notes, together at last.
        </TextAnimate>

        {/* mobile */}
        <TextAnimate
          className="mt-8 mb-6 px-5 text-4xl font-bold tracking-tight md:hidden"
          animate="blurInUp"
          by="word"
          duration={0.9}
          once
        >
          Where code meets clarity. Snippets and notes, together at last.
        </TextAnimate>

        {/* optimized for desktop */}
        <TextAnimate
          className="text-md text-muted-foreground mx-auto mb-8 hidden max-w-2xl px-5 tracking-wider md:block"
          animate="blurInUp"
          by="character"
          delay={0.7}
          duration={0.9}
          once
        >
          Capture ideas, draft notes, and save code without distractions. Nesto
          is your personal thinking space for everything that matters.
        </TextAnimate>

        {/* optimized for mobile */}
        <TextAnimate
          className="text-muted-foreground mx-auto mb-8 max-w-2xl px-5 text-sm tracking-wider md:hidden"
          animate="blurInUp"
          by="word"
          delay={0.7}
          duration={0.9}
          once
        >
          Capture ideas, draft notes, and save code without distractions. Nesto
          is your personal thinking space for everything that matters.
        </TextAnimate>

        <div className="flex justify-center gap-3">
          <Link href="/">
            <RainbowButton
              size="lg"
              className="group animate-fade-in-up animate-delay-300 tracking-wider"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-2" />
            </RainbowButton>
          </Link>
          <Link href="/">
            <RainbowButton
              size="lg"
              variant={'outline'}
              className="group animate-fade-in-up animate-delay-400 tracking-wide"
            >
              Learn More
              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-2" />
            </RainbowButton>
          </Link>
        </div>

        <div className="text-muted-foreground mt-10 flex flex-col items-center justify-center gap-4 text-sm tracking-wide sm:flex-row">
          <div className="animate-fade-in-up animate-delay-500 flex items-center gap-2">
            <Check className="text-primary h-4 w-4" />
            Syntax-Highlighted Snippets
          </div>
          <div className="animate-fade-in-up animate-delay-600 flex items-center gap-2">
            <Check className="text-primary h-4 w-4" />
            Markdown Note Support
          </div>
          <div className="animate-fade-in-up animate-delay-700 flex items-center gap-2">
            <Check className="text-primary h-4 w-4" />
            Instant Search & Filtering
          </div>
        </div>

        {/* hero dialog */}
        {/* <div className="relative z-40 mt-14 px-4">
          <div className="overflow-hidden rounded-md border bg-white">
            <Image
              src="/dashboard.png"
              alt="Dashboard"
              width={1200}
              height={800}
              className="block h-auto w-full"
              unoptimized
              priority
            />
          </div>
        </div> */}
      </div>
    </section>
  )
}
