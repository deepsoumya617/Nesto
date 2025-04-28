import heart from '@/public/heart.png'
import Image from 'next/image'
import { Press_Start_2P } from 'next/font/google'

const ps = Press_Start_2P({
  weight: '400',
})

export default function Footer() {
  return (
    <footer
      className={`${ps.className} mt-auto px-4 flex flex-col justify-center items-center font-ps`}
    >
      <div className="flex items-center gap-1">
        <h4 className="text-zinc-500 dark:text-zinc-600">Made with</h4>
        <Image
          src={heart}
          width={20}
          height={20}
          alt="heart"
          className="w-6 h-6"
        />
      </div>
      <h4 className="text-zinc-500">
        by{' '}
        <a
          href="https://github.com/deepsoumya617"
          target="_blank"
          className="text-zinc-700 hover:text-purple-500"
        >
          deepsoumya!
        </a>
      </h4>
    </footer>
  )
}
