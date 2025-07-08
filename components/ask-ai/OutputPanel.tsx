'use client'

import AITextLoading from '../kokonutui/ai-text-loading'
import { renderMarkdown } from '@/lib/markdown'
import { useEffect, useRef } from 'react'

export default function OutputPanel({
  output,
  isLoading,
}: {
  output: string | null
  isLoading: boolean
}) {
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [output])

  return (
    <div className="font-geist hidden w-full flex-col text-sm font-semibold md:flex md:w-1/2">
      {/* heading */}
      <div className="mt-4 mb-4 ml-6 text-[22px] font-bold tracking-tight">
        <p>AI Response</p>
        <p className="text-muted-foreground mt-0.5 w-sm text-sm font-medium tracking-normal">
          AI results — including formatted code, markdown, and insights — will
          be shown here.
        </p>
      </div>
      {/* content */}
      <div className="font-base h-full pt-6 pb-8">
        {isLoading && !output && <AITextLoading className="mt-40" />}
        {!output && !isLoading && (
          <p className="text-muted-foreground font-geist mt-40 text-center text-lg">
            Nothing to show yet.
          </p>
        )}
        <div className="max-h-[600px] overflow-auto overflow-x-scroll px-8">
          <div
            dangerouslySetInnerHTML={{ __html: renderMarkdown(output!) }}
            className="markdown-body break-words whitespace-pre-wrap"
          />
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  )
}
