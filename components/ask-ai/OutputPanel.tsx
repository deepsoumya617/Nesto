'use client'

import { Separator } from '../ui/separator'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import AITextLoading from '../kokonutui/ai-text-loading'
import { useAskAiStore } from '@/store/useAskAiStore'
import { renderMarkdown } from '@/lib/markdown'

export default function OutputPanel() {
  const { output, isLoading } = useAskAiStore()

  console.log(output)

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
      <Separator />
      {/* content */}
      <div className="font-base h-full pt-6 pb-8">
        <ScrollArea className="h-full max-h-[600px] px-7">
          {isLoading ? (
            <AITextLoading className="mt-40" />
          ) : output ? (
            <div
              dangerouslySetInnerHTML={{ __html: renderMarkdown(output) }}
              className="markdown-body"
            />
          ) : (
            <p className="text-muted-foreground font-geist mt-40 text-center text-lg">
              Nothing to show yet.
            </p>
          )}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}
