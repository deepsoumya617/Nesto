export default function Footer() {
  return (
    <footer className="font-geist w-full border-t border-black/20 px-4 py-8 tracking-tight sm:px-8 lg:px-16">
      <div className="mx-auto flex w-full max-w-4xl justify-between">
        <h1 className="text-xl">Nesto</h1>
        <div className="flex gap-8">
          <div className="flex flex-col">
            <p className="font-medium">Product</p>
            <div className="mt-1 flex flex-col gap-0.5 text-sm text-black/80">
              <a href="/changelog">Changelog</a>
              <a href="https://github.com/deepsoumya617/nesto" target="_blank">
                Github
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Support</p>
            <div className="mt-1 flex flex-col gap-0.5 text-sm text-black/80">
              <a href="/contact">Contact Us</a>
              <a href="/report">Report an Issue</a>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Legal</p>
            <div className="mt-1 flex flex-col gap-0.5 text-sm text-black/80">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Language</p>
            <div className="mt-1 flex flex-col gap-0.5 text-sm text-black/80">
              <p>English</p>
              <p>日本語</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
