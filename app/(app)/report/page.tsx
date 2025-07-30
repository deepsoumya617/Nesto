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
import React, { useRef, useState } from 'react'
import { Bug } from 'lucide-react'

export default function ReportPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const newFiles = Array.from(e.target.files)

    // Avoid duplicates by checking name + size
    const uniqueFiles = newFiles.filter(
      (newFile) =>
        !selectedFiles.some(
          (existingFile) =>
            existingFile.name === newFile.name && existingFile.size === newFile.size
        )
    )

    setSelectedFiles((prev) => [...prev, ...uniqueFiles])
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(formRef.current!)

    // Append custom files from state
    selectedFiles.forEach((file) => {
      formData.append('screenshots', file)
    })

    const result = await sendReportEmail(formData)

    if (result.success) {
      toast.success(result.message)
      formRef.current?.reset()
      setSelectedFiles([]) // reset accumulated files
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="font-geist mx-auto flex w-full max-w-4xl flex-col px-10 py-9 tracking-tight">
      <div className="flex items-center gap-1">
        <Bug />
        <h1 className="text-3xl">Report an Issue.</h1>
      </div>
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
          <Input type="text" id="title" name="title" required />
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
          <Input type="email" name="email" id="email" placeholder="you@example.com" />
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
            accept="image/*"
            className="cursor-pointer"
            multiple
            onChange={handleFileChange}
          />

          {selectedFiles.length > 0 && (
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              {selectedFiles.map((file, idx) => (
                <li key={idx}>📎 {file.name}</li>
              ))}
            </ul>
          )}
        </div>

        <SubmitButton />
      </form>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button className="font-geist cursor-pointer" type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit Report'}
    </Button>
  )
}
