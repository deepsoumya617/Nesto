'use client'

import { useAuth } from '@clerk/nextjs'
import { InteractiveHoverButton } from './magicui/interactive-hover-button'
import { useRouter } from 'next/navigation'
import { AuroraText } from '@/components/magicui/aurora-text'

export default function Hero() {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  return (
    <div className="relative text-center mt-32 mx-auto md:px-4">
      <h3 className="font-medium text-5xl md:text-6xl tracking-wide leading-14 md:leading-16 text-slate-900">
        <AuroraText className="text-purple-500">Snippets</AuroraText>, notes,
        and {}
        <span className="underline underline-offset-8 decoration-purple-500">
          ideas!
        </span>{' '}
        <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent ">
          All in one tidy place.
        </span>
      </h3>
      <p className="mt-4 text-gray-400 text-[15px] md:text-[17px] leading-relaxed tracking-wide px-5">
        Stay organized, write better, and never lose your ideas again.{' '}
        <br className="hidden md:block" />
        Start capturing your thoughts today.
      </p>
      {isSignedIn ? (
        <InteractiveHoverButton
          className="mt-8 tracking-wide text-sm"
          onClick={() => {
            router.push('/snippets')
          }}
        >
          Go to Snippets
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
