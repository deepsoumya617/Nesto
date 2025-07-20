'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { sendContactEmail } from '@/lib/actions/contact-us'
import { Send } from 'lucide-react'
import { useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(formRef.current!)
    const result = await sendContactEmail(formData)

    if (result.success) {
      toast.success(result.message)
      formRef.current?.reset()
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="font-geist mx-auto flex w-full max-w-4xl flex-col px-10 py-9 tracking-tight">
      <h1 className="text-3xl underline underline-offset-2">Contact us.</h1>
      <p className="text-muted-foreground text-[17px] tracking-tight">
        We're always improving. Tell us what’s broken or what could be better.
      </p>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-4 w-full space-y-4 md:w-[70%] lg:w-[60%]"
      >
        <div className="space-y-2">
          <Label htmlFor="name" className="text-muted-foreground">
            Name
          </Label>
          <Input type="text" id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-muted-foreground">
            Your Email
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-muted-foreground">
            Description
          </Label>
          <Textarea id="description" name="description" required />
        </div>
        <SubmitButton />
      </form>
      <div className="text-muted-foreground mt-6 text-sm">
        <p>
          For technical issues or bug reports, please use the{' '}
          <a
            href="/report"
            className="hover:text-primary underline underline-offset-4"
          >
            Report an Issue
          </a>{' '}
          page.
        </p>
      </div>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button className="font-geist flex cursor-pointer items-center gap-1">
      <p>{pending ? 'Sending...' : 'Send Message'}</p>
      <Send />
    </Button>
  )
}
