'use client'

import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import AITextLoading from '../kokonutui/ai-text-loading'
import { useAskAiStore } from '@/store/useAskAiStore'
import { renderMarkdown } from '@/lib/markdown'

export default function OutputPanel() {
  const { output, isLoading } = useAskAiStore()

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
      <div className="font-base flex-1 overflow-hidden px-8 pt-6 pb-8">
        <ScrollArea className="h-full max-h-[600px]">
          {isLoading ? (
            <AITextLoading className="mt-40" />
          ) : output ? (
            <div className="font-base w-full overflow-x-auto">
              <div
                className=" markdown-body text-[15px]"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(output) }}
              />
            </div>
          ) : (
            <p className="text-muted-foreground font-geist mt-40 text-center text-lg">
              Nothing to show yet.
            </p>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}
