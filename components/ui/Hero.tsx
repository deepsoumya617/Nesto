'use client'

import { useAuth } from '@clerk/nextjs'
import { InteractiveHoverButton } from '../magicui/interactive-hover-button'
import { useRouter } from 'next/navigation'
import { AuroraText } from "@/components/magicui/aurora-text"

export default function Hero() {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  return (
    <div className="text-center mt-32 max-w-3xl mx-auto md:px-4">
      <h3 className="font-bold text-5xl md:text-6xl tracking-wide leading-14 md:leading-16">
        Notes, code <AuroraText className="text-purple-500">snippets</AuroraText>, and {}
        <span className="underline underline-offset-8 decoration-purple-500">
          ideas
        </span>{' '}
       — all in one place.
      </h3>
      <p className="mt-4 text-zinc-400 text-[15px] md:text-[17px] leading-relaxed tracking-wide px-5">
        Stay organized, write better, and never lose your ideas again.{' '}
        <br className="hidden md:block" />
        Start capturing your thoughts today.
      </p>
      {isSignedIn ? (
        <InteractiveHoverButton
          className="mt-8 tracking-wide text-sm"
          onClick={() => {
            router.push('/dashboard')
          }}
        >
          Go to Dashboard
        </InteractiveHoverButton>
      ) : (
        <InteractiveHoverButton
          className="mt-3 tracking-wide text-sm"
          onClick={() => {
            router.push('/sign-up')
          }}
        >
          Get Started
        </InteractiveHoverButton>
      )}
    </div>
  )
}
