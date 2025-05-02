'use client'

import Tiptap from '@/components/tiptap'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { SetStateAction, useState } from 'react'

export default function createNotePage() {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  function onChange(content: string) {
    // console.log(content)
    setContent(content)
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
      <form className="max-w-[752px] mx-auto mt-4">
        <Input
          className="py-6 bg-gray-50 tracking-wide rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <Tiptap content={content} onChange={onChange} />
        <div className="flex justify-center mt-6 gap-3 tracking-wider">
          <Button className="cursor-pointer">Save</Button>
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
