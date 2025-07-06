'use client'

import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import AITextLoading from '../kokonutui/ai-text-loading'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { useAskAiStore } from '@/store/useAskAiStore'

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
      <div className="font-base flex-1 px-8 pt-6 pb-8">
        <ScrollArea className="h-full max-h-[600px] overflow-y-auto">
          {isLoading ? (
            <AITextLoading className="mt-40" />
          ) : output ? (
            <div className="prose prose-sm dark:prose-invert font-base max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code({ children, className }) {
                    return (
                      <pre className="overflow-x-auto rounded-md bg-zinc-100 p-4 text-sm text-black dark:bg-[#0e0e0e] dark:text-white">
                        <code className={`font-mono ${className ?? ''}`}>
                          {children}
                        </code>
                      </pre>
                    )
                  },
                }}
              >
                {output}
              </ReactMarkdown>
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
