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

  // Function to sanitize markdown output by removing code formatting
  function sanitizeMarkdownOutput(markdown: string) {
    return markdown.replace(/`([a-zA-Z0-9_\[\]\(\)\.\+\-\*/]+)`/g, '$1')
  }

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
              <div className="font-base text-[15px]">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      if (inline) {
                        return (
                          <code
                            className={`font-mono text-[13px] ${className ?? ''}`}
                            {...props}
                          >
                            {children}
                          </code>
                        )
                      }
                      return (
                        <pre className="overflow-x-auto rounded-md ">
                          <code
                            className={`hljs font-mono text-sm ${className ?? ''}`}
                            {...props}
                          >
                            {children}
                          </code>
                        </pre>
                      )
                    },
                    p({ node, children }) {
                      const isOnlyCode =
                        Array.isArray(children) &&
                        children.length === 1 &&
                        (children[0] as any)?.type === 'code'

                      if (isOnlyCode) return <>{children}</>
                      return <p>{children}</p>
                    },
                  }}
                >
                  {sanitizeMarkdownOutput(output)}
                  {/* {output} */}
                </ReactMarkdown>
              </div>
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
