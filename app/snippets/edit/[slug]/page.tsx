'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { BeatLoader } from 'react-spinners'
import SnippetEditor from '@/components/SnippetEditor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import { getSnippetFromSlug, updateSnippet } from '@/actions/snippets'

export default function EditSnippetPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const [title, setTitle] = useState('')
  const [snippetContent, setSnippetContent] = useState('')
  const [fileName, setFileName] = useState('')
  const [language, setLanguage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // handle changing snippet
  function onChange(snippetContent: string) {
    setSnippetContent(snippetContent)
  }

  //   fetch snippet data from db
  useEffect(() => {
    if (isLoading) return
    async function getSelectedSnippet() {
      try {
        setIsLoading(true)
        const res = await getSnippetFromSlug(slug)
        setTitle(res?.title || '')
        setSnippetContent(res?.content || '')
        setFileName(res?.fileName || '')
        setLanguage(res?.language || '')
      } catch (error) {
        console.error('Error fetching snippet: ', error)
      } finally {
        setIsLoading(false)
      }
    }

    getSelectedSnippet()
  }, [])

  // update snippet
  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    try {
      setIsSubmitting(true)
      e.preventDefault() // stop reload
      const result = await updateSnippet(slug, title, snippetContent)
      if (result.success) {
        router.push(`/snippets/view/${result.slug}`)
        router.refresh()
        toast('Snippet updated successfully!')
      } else alert(result.message)
    } catch (error) {
      console.log('Falied to update snippet: ', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // loading state
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
        onSubmit={handleUpdate}
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
        <Input
          className="py-6 bg-gray-50 tracking-wide rounded"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="File name (e.g. BinaryTree1 - don’t include extension)"
          required
        />
        {/* Snippet Editor */}
        <SnippetEditor
          fileName={fileName}
          language={language}
          snippetContent={snippetContent}
          onChange={onChange}
          isEditable={true}
          heightMode="fixed"
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
