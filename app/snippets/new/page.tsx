'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import SnippetEditor from '@/components/SnippetEditor'
import { createSnippet } from '@/actions/snippets'
import { toast } from 'sonner'

export default function CreateSnippetPage() {
  const [title, setTitle] = useState('')
  const [fileName, setFileName] = useState('')
  const [language, setLanguage] = useState('')
  const [snippetContent, setSnippetContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // handle changing snippet
  function onChange(snippetContent: string) {
    setSnippetContent(snippetContent)
  }

  //   submit snippets
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      setIsSubmitting(true)
      e.preventDefault()
      const result = await createSnippet(
        title,
        fileName,
        language,
        snippetContent
      )
      if (result.success) {
        router.push('/snippets')
        toast('Snippet created successfully!')
      } else alert(result.message)
    } catch (error) {
      console.log('Failed to create snippet: ', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-8">
      {/* Back Button */}
      <Link href="/snippets">
        <Button
          variant="secondary"
          className="tracking-wider cursor-pointer ml-2"
        >
          <ArrowLeft />
          <p>Back</p>
        </Button>
      </Link>
      {/* Text */}
      <h1 className="ml-2 mt-6 font-bold tracking-wide text-xl">
        Create New Snippet🗒️
      </h1>
      {/* Code editor */}
      <form
        onSubmit={handleSubmit}
        className="max-w-[752px] mx-auto mt-4 space-y-3"
      >
        {/* Title */}
        <Input
          className="py-6 bg-gray-50 tracking-wide rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        {/* Filename */}
        <div className="flex gap-2 items-center">
          <Input
            className="py-6 bg-gray-50 tracking-wide rounded"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="File name (e.g. BinaryTree1 - don’t include extension)"
            required
          />
          {/* Language dropdown */}
          <Select value={language} onValueChange={setLanguage} required>
            <SelectTrigger className="w-[150px] bg-gray-50 tracking-wider">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="tracking-wider">
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="js">Js</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="py">Python</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Snippet Editor */}
        <SnippetEditor
          fileName={fileName}
          language={language}
          snippetContent={snippetContent}
          onChange={onChange}
        />
        {/* Submit Buttons */}
        <div className="flex justify-center mt-6 gap-3 tracking-wider">
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
          <Link href="/snippets">
            <Button className="bg-red-600 hover:bg-red-700 cursor-pointer">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
