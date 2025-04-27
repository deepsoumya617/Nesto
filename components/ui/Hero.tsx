import { Inter } from 'next/font/google'
import { InteractiveHoverButton } from '../magicui/interactive-hover-button'

const inter = Inter({})

export default function Hero() {
  return (
    <div className="text-center mt-32 max-w-3xl mx-auto md:px-4">
      <h3
        className={`${inter.className} font-bold text-5xl md:text-6xl tracking-wide`}
      >
        Notes, code <span className="text-purple-500">snippets</span>, and
        creativity — all in one place.
      </h3>
      <p className="mt-4 text-zinc-400 text-[15px] md:text-lg leading-relaxed tracking-wide px-5">
        Stay organized, write better, and never lose your ideas again. <br className="hidden md:block" />
        Start capturing your thoughts today.
      </p>
      <InteractiveHoverButton className='mt-3 tracking-wide'>
        Get Started
      </InteractiveHoverButton>
    </div>
  )
}
