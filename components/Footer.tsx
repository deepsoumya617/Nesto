import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-3 px-4 flex flex-col justify-center items-center text-sm tracking-wider text-zinc-400">
      <h4>
        © 2025 Nesto. Crafted with love by{' '}
        <Link
          href="https://www.github.com/deepsoumya617/"
          target="_blank"
          className="hover:text-purple-500 text-zinc-600"
        >
          deepsoumya ↗
        </Link>
        .
      </h4>
    </footer>
  )
}
