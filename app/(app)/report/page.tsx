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
import { useFormStatus } from 'react-dom'

export default function ReportPage() {
  return (
    <div className="font-geist mx-auto flex w-full max-w-4xl flex-col px-10 py-10 tracking-tight">
      <h1 className="text-3xl underline underline-offset-2">Report an Issue</h1>
      <p className="text-muted-foreground text-[17px] tracking-tight">
        Spotted a bug or problem? We're here to fix it—just give us the details.
      </p>
      <form className="mt-4 w-full space-y-4 md:w-[70%] lg:w-[60%]">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-muted-foreground">
            Issue Title
          </Label>
          <Input
            type="text"
            id="title"
            required
            // placeholder="Short title for your report"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-muted-foreground">
            Description
          </Label>
          <Textarea id="description" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-muted-foreground">
            Your Email (optional)
          </Label>
          <Input type="email" id="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type" className="text-muted-foreground">
            Issue Type (optional)
          </Label>
          <Select>
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
          <Label htmlFor="screenshot" className="text-muted-foreground">
            Screenshot (optional, multiples allowed)
          </Label>
          <Input
            type="file"
            id="screenshot"
            accept="image/*"
            className="cursor-pointer"
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
    <Button className="cursor-pointer font-geist">
      {pending ? 'Submitting...' : 'Submit Report'}
    </Button>
  )
}
