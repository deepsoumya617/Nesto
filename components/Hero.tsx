'use client'

import { ArrowRight, ArrowRightIcon } from 'lucide-react'
import { AnimatedShinyText } from './magicui/animated-shiny-text'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from './ui/button'

export default function Hero() {
  return (
    <section className="flex w-full flex-col items-center justify-center pt-24">
      {/* <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-grid-pan-slow h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-[size:14px_24px] opacity-50 dark:opacity-70" />
      </div> */}
      <Link
        href="/changelog"
        className={cn(
          'group absolute top-32 rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 sm:top-36 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800',
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 tracking-wide transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Introducing Nesto v1.0</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </Link>
      <div className="max-w-4xl px-4 text-center">
        <h1 className="mt-8 mb-6 px-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Write less.Think better.Let AI assist. Snippets and notes, together at
          last.
        </h1>

        <p className="text-md text-muted-foreground mx-auto mb-8 hidden max-w-2xl px-16 md:block font-geist">
          Capture ideas, draft notes, and save code—without the noise. Nesto is
          your AI-powered thinking space for everything that matters.
        </p>

        <div className="flex flex-row justify-center gap-1">
          <Link href="/sign-in">
            <Button
              size="lg"
              className="group cursor-pointer rounded-md font-semibold tracking-wider"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-2" />
            </Button>
          </Link>
          <Link href="/about-us">
            <Button
              size="lg"
              variant="ghost"
              className="group cursor-pointer rounded-md font-semibold tracking-wide"
            >
              Learn More
              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-2" />
            </Button>
          </Link>
        </div>
      </div>
      {/* hero image */}
      {/* <Container>
        <motion.div
          className="relative mt-20 rounded-[32px] border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-700 dark:bg-neutral-800"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full scale-[1.1] bg-gradient-to-b from-transparent via-white to-white dark:via-black/50 dark:to-black"></div>
          <div className="rounded-[24px] border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-black">
            <img
              src="/preview.png"
              alt="hero"
              width="1920"
              height="1080"
              className="h-auto w-full rounded-xl object-contain"
            />
          </div>
        </motion.div>
      </Container> */}
      <div className="mt-10 w-full border-y border-black/45">
        <div className="mx-auto w-full max-w-6xl border-x border-black/45">
          <img
            src="/preview.png"
            alt="hero"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  )
}
