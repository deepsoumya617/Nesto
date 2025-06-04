'use client'

import Tiptap from '@/components/tiptap'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { use, useEffect, useState } from 'react'
import { getFullNote, updateNote } from '@/actions/notes'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { BeatLoader } from 'react-spinners'

export default function EditNotePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // handle changing content/note
  function onChange(content: string) {
    setContent(content)
  }

  // Fetch title+content of selected note
  useEffect(() => {
    if (isLoading) return
    async function getSelectedNote() {
      try {
        setIsLoading(true)
        const res = await getFullNote(slug)

        // show update values on update note page
        setTitle(res?.title || '')
        setContent(res?.content || '')
      } catch (error) {
        console.error('Error fetching note: ', error)
      } finally {
        setIsLoading(false)
      }
    }

    getSelectedNote()
  }, [])

  // handle note updation
  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    try {
      setIsSubmitting(true)
      e.preventDefault() // stop reload
      const result = await updateNote(slug, title, content)
      if (result.success) {
        router.push(`/notes/view/${result.slug}`)
        router.refresh()
        toast('Note updated successfully!')
      } else alert(result.message)
    } catch (error) {
      console.error('Failed to update  note: ', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="mt-14 flex justify-center">
        <BeatLoader color="#000000" size={15} loading={isLoading} />
      </div>
    )
  }

  return (
    <div className="mt-8">
      {/* Back Button */}
      <Link href={`/notes/view/${slug}`}>
        <Button
          variant="secondary"
          className="tracking-wider cursor-pointer ml-2"
        >
          <ArrowLeft />
          <p>Back</p>
        </Button>
      </Link>
      {/* Text */}
      <h1 className="ml-2 mt-6 font-bold tracking-wide text-xl">Edit Note📝</h1>
      {/* Text Editor */}
      <form onSubmit={handleUpdate} className="max-w-[752px] mx-auto mt-4">
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
