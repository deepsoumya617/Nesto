'use client'

import { getFullNote } from '@/actions/notes'
import { use, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import DOMPurify from 'dompurify'
import { ArrowLeft, Clipboard, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ViewNotePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const [isCopied, setIsCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [note, setNote] = useState<{ title: string; content: string } | null>(
    null
  )

  // console.log(slug)

  // Fetch title+content of selected note
  useEffect(() => {
    if (isLoading) return
    async function getSelectedNote() {
      try {
        setIsLoading(true)
        const res = await getFullNote(slug)
        setNote(res)
      } catch (error) {
        console.error('Error fetching note: ', error)
      } finally {
        setIsLoading(false)
      }
    }

    getSelectedNote()
  }, [])

  // copy  special chars
  function decodeHtmlEntities(str: string) {
    const txt = document.createElement('textarea')
    txt.innerHTML = str
    return txt.value
  }

  // Handle copy event
  function handleCopy() {
    // sanitize and remove all html tags
    const content = note?.content || ''
    const cleanTextWithoutTags = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [],
    })
    const plainText = decodeHtmlEntities(cleanTextWithoutTags)
    // copy to clipboard
    navigator.clipboard.writeText(plainText).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  if (isLoading) {
    return (
      <div className="mt-14 flex justify-center">
        <BeatLoader color="#000000" size={15} loading={isLoading} />
      </div>
    )
  }

  // dompurify
  const cleanNote = DOMPurify.sanitize(note?.content || '')

  return (
    <div className="mt-14">
      <Link href="/notes">
        <Button
          variant="secondary"
          className="tracking-wider cursor-pointer ml-2"
        >
          <ArrowLeft />
          <p>Back</p>
        </Button>
      </Link>
      <div className="mt-8 max-w-3xl mx-auto">
        <h1>{note?.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: cleanNote,
          }}
          className="mt-5 border-2 rounded-md px-7 py-7"
        />
        <div className="flex items-center justify-center gap-3">
          <Link href={`/notes/edit/${slug}`}>
            <Button className="tracking-widest px-6 py-5 mt-7 cursor-pointer">
              <Pencil />
              Edit
            </Button>
          </Link>
          <Button
            className="tracking-widest px-6 py-5 mt-7 cursor-pointer"
            variant={'outline'}
            onClick={handleCopy}
            disabled={isCopied}
          >
            <Clipboard />
            {isCopied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>
    </div>
  )
}
