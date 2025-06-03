'use client'

import { getSnippetFromSlug } from '@/actions/snippets'
import SnippetEditor from '@/components/SnippetEditor'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clipboard, ExternalLink, Pencil } from 'lucide-react'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

export default function ViewSnippetPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const [isCopied, setIsCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [snippet, setSnippet] = useState<{
    title: string
    fileName: string
    language: string
    content: string
  } | null>(null)

  // fetch snippet using slug
  useEffect(() => {
    if (isLoading) return
    async function getSnippet() {
      try {
        setIsLoading(true)
        const res = await getSnippetFromSlug(slug)
        setSnippet(res)
      } catch (error) {
        console.error('Error fetching snippet: ', error)
      } finally {
        setIsLoading(false)
      }
    }
    getSnippet()
  }, [slug])

  // handle copy event
  function handleCopy() {
    const content = snippet?.content || ''
    navigator.clipboard.writeText(content).then(() => {
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    })
  }

  // loading snippets
  if (isLoading) {
    return (
      <div className="mt-14 flex justify-center">
        <BeatLoader color="#000000" size={15} loading={isLoading} />
      </div>
    )
  }

  return (
    <div className="mt-14">
      <Link href="/snippets">
        <Button
          variant="secondary"
          className="tracking-wider cursor-pointer ml-2"
        >
          <ArrowLeft />
          <p>Back</p>
        </Button>
      </Link>
      <div className="mt-8 max-w-3xl mx-auto">
        <div className='flex gap-2 items-center'>
        <h1>{`🗒️${snippet?.title}`}</h1>
        <ExternalLink size={20} className='cursor-pointer text-gray-600 hover:text-gray-800'/>
        </div>
        <SnippetEditor
          fileName={snippet?.fileName}
          language={snippet?.language}
          snippetContent={snippet?.content}
          isEditable={false}
          heightMode="auto"
        />
        <div className="flex items-center justify-center gap-3">
          <Link href={`/snippets/edit/${slug}`}>
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
