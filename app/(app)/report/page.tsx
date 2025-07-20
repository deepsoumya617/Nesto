'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { sendReportEmail } from '@/lib/actions/report'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'
import React, { useRef } from 'react'

export default function ReportPage() {
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(formRef.current!)
    const result = await sendReportEmail(formData)

    if (result.success) {
      toast.success(result.message)
      formRef.current?.reset()
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="font-geist mx-auto flex w-full max-w-4xl flex-col px-10 py-9 tracking-tight">
      <h1 className="text-3xl underline underline-offset-2">Report an Issue</h1>
      <p className="text-muted-foreground text-[17px] tracking-tight">
        Spotted a bug or problem? We're here to fix it—just give us the details.
      </p>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="mt-4 w-full space-y-4 md:w-[70%] lg:w-[60%]"
      >
        <div className="space-y-2">
          <Label htmlFor="title" className="text-muted-foreground">
            Issue Title
          </Label>
          <Input
            type="text"
            id="title"
            name="title"
            required
            // placeholder="Short title for your report"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-muted-foreground">
            Description
          </Label>
          <Textarea id="description" name="description" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-muted-foreground">
            Your Email (optional)
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type" className="text-muted-foreground">
            Issue Type (optional)
          </Label>
          <Select name="type">
            <SelectTrigger className="w-full cursor-pointer py-6">
              <SelectValue placeholder="Select Issue Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bug">Bug</SelectItem>
              <SelectItem value="feedback">Feedback</SelectItem>
              <SelectItem value="ui">UI</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="screenshots" className="text-muted-foreground">
            Screenshot (optional, multiples allowed)
          </Label>
          <Input
            type="file"
            id="screenshots"
            name="screenshots"
            accept="image/*"
            className="cursor-pointer"
            multiple
          />
        </div>
        <SubmitButton />
      </form>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button className="font-geist cursor-pointer">
      {pending ? 'Submitting...' : 'Submit Report'}
    </Button>
  )
}
