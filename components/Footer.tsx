import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="font-geist w-full border-t border-black/20 px-4 py-8 tracking-tight sm:px-8 lg:px-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col justify-between gap-4 md:flex-row">
        <h1 className="text-center text-2xl font-black">ねすと</h1>
        <div className="flex justify-center gap-8">
          <div className="flex flex-col">
            <p className="font-medium">Product</p>
            <div className="mt-1 flex flex-col gap-0.5 text-sm text-black/80">
              <Link href="/changelog" className="hover:text-blue-500">
                Changelog
              </Link>
              <Link
                href="https://github.com/deepsoumya617/nesto"
                target="_blank"
                className="hover:text-blue-500"
              >
                Github
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Support</p>
            <div className="mt-1 flex flex-col gap-0.5 text-sm text-black/80">
              <Link href="/contact" className="hover:text-blue-500">
                Contact Us
              </Link>
              <Link href="/report" className="hover:text-blue-500">
                Report an Issue
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Legal</p>
            <div className="mt-1 flex flex-col gap-0.5 text-sm text-black/80">
              <Link href="/privacy-policy" className="hover:text-blue-500">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-blue-500">
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
