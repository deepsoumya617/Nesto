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
      <div
        className="absolute inset-0 -z-10 h-full w-full 
      bg-white dark:bg-black 
      bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] 
      bg-[size:14px_24px]
      [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_100%)] 
      [mask-repeat:no-repeat] [mask-size:100%_100%]"
      ></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />

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
