import { MoveRight } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="font-geist mx-auto flex w-full max-w-4xl flex-col px-10 py-10 tracking-tight">
      <h1 className="text-3xl underline underline-offset-2">Contact Us</h1>
      <p className="text-muted-foreground text-[17px] tracking-tight">
        Get in touch with the Nesto team.
      </p>
      <div className="mt-4 w-full rounded-md border px-6 py-5 md:w-[70%] lg:w-[60%]">
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <div className="flex items-center gap-1">
            <MoveRight className="size-4" />
            <p className="font-medium">Primary Email - </p>
          </div>
          <a
            href="mailto:soumyadeepghosh617@gmail.com"
            className="text-gray-700 underline-offset-4 transition hover:text-gray-900 hover:underline"
          >
            soumyadeepghosh617@gmail.com
          </a>
        </div>
        <div className="mt-3 flex flex-col gap-1 md:mt-0 md:flex-row md:items-center">
          <div className="flex items-center gap-1">
            <MoveRight className="size-4" />
            <p className="font-medium">Secondary Email - </p>
          </div>
          <a
            href="mailto:mrinalkarmakar565@gmail.com"
            className="text-gray-700 underline-offset-4 transition hover:text-gray-900 hover:underline"
          >
            mrinalkarmakar565@gmail.com
          </a>
        </div>
      </div>
      <div className="text-muted-foreground mt-6 text-sm">
        <p>
          For technical issues or bug reports, please use the{' '}
          <a href="/report" className="hover:text-primary underline underline-offset-4">
            Report an Issue
          </a>{' '}
          page.
        </p>
      </div>
    </div>
  )
}
