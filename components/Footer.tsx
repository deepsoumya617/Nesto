import Link from 'next/link'
import { Badge } from './ui/badge'

export default function Footer() {
  return (
    <footer className="font-geist dark:border-muted-foreground/20 w-full border-t border-black/20 px-4 py-8 tracking-tight sm:px-8 lg:px-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <div className="flex items-center gap-1">
            <button className="font-geist h-6 w-6 cursor-pointer rounded-full bg-gradient-to-br from-orange-300 to-pink-500 text-center text-[13px] font-black text-white">
              ん
            </button>
            <h1 className="font-roboto-slab text-2xl tracking-tight">Nesto</h1>
            <Badge variant="outline" className="ml-1.5 rounded-none">
              Beta
            </Badge>
          </div>
          <p className="text-muted-foreground text-[13px] tracking-normal">
            © 2025 Nesto. All rights reserved.
          </p>
        </div>
        <div className="flex justify-center gap-8">
          <div className="flex flex-col">
            <p className="font-medium">Product</p>
            <div className="mt-1 flex flex-col gap-0.5 text-sm text-black/80">
              <Link
                href="/changelog"
                className="dark:text-muted-foreground hover:text-blue-500 dark:hover:text-blue-400"
              >
                Changelog
              </Link>
              <Link
                href="https://github.com/deepsoumya617/nesto"
                target="_blank"
                className="dark:text-muted-foreground hover:text-blue-500 dark:hover:text-blue-400"
              >
                Github
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Support</p>
            <div className="mt-1 flex flex-col gap-0.5 text-sm text-black/80">
              <Link
                href="/contact"
                className="dark:text-muted-foreground hover:text-blue-500 dark:hover:text-blue-400"
              >
                Contact Us
              </Link>
              <Link
                href="/report"
                className="dark:text-muted-foreground hover:text-blue-500 dark:hover:text-blue-400"
              >
                Report an Issue
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Legal</p>
            <div className="mt-1 flex flex-col gap-0.5 text-sm text-black/80">
              <Link
                href="/privacy-policy"
                className="dark:text-muted-foreground hover:text-blue-500 dark:hover:text-blue-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="dark:text-muted-foreground hover:text-blue-500 dark:hover:text-blue-400"
              >
                Terms of Service
              </Link>
            </div>
          </div>
          {/* <div className="flex flex-col">
            <p className="font-medium">Language</p>
            <div className="mt-1 flex flex-col gap-0.5 text-sm text-black/80">
              <p>English</p>
              <p>日本語</p>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
