'use client'

import Tiptap from '@/components/tiptap'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { createNote } from '@/actions/notes'
import { useRouter } from 'next/navigation'

export default function createNotePage() {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const router = useRouter()

  // handle changing content/note
  function onChange(content: string) {
    setContent(content)
  }

  // handle form submission
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      setIsSubmitting(true)
      e.preventDefault() // stop reload
      const result = await createNote(title, content)
      if (result.success) router.push('/notes')
      else alert(result.message)
    } catch (error) {
      console.error('Failed to create note: ', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-8">
      {/* Back Button */}
      <Link href="/notes">
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
        Create New Note📝
      </h1>
      {/* Text Editor */}
      <form onSubmit={handleSubmit} className="max-w-[752px] mx-auto mt-4">
        <Input
          className="py-6 bg-gray-50 tracking-wide rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <Tiptap content={content} onChange={onChange} />
        <div className="flex justify-center mt-6 gap-3 tracking-wider">
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
          <Link href="/notes">
            <Button className="bg-red-600 hover:bg-red-700 cursor-pointer">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
