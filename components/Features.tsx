import { cn } from '@/lib/utils'
import {
  Bot,
  FileJson2,
  FolderClosed,
  GitBranch,
  Notebook,
  Search,
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: <Notebook size="40" />,
      title: 'Rich Notes',
      description:
        'Write, structure, and format your thoughts with Markdown, code blocks, and more — perfect for documenting ideas, bugs, or problem walkthroughs.',
    },
    {
      icon: <FileJson2 size="40" />,
      title: 'Code Snippets',
      description:
        'Save reusable code blocks with titles, tags, and context. No need to dig through old files or remember patterns.',
    },
    {
      icon: <Bot size="40" />,
      title: 'Ask AI',
      description:
        'Get real-time help from AI: generate code, explain logic, or debug errors — without switching tabs.',
    },
    {
      icon: <FolderClosed size="40" />,
      title: 'Tags & Labels',
      description:
        'Categorize notes and snippets with custom tags to keep your workspace clean, searchable, and context-aware.',
    },
    {
      icon: <Search size="40" />,
      title: 'Smart Search',
      description:
        'Blazingly fast search across all notes and snippets — by name, tag, or even content keywords.',
    },
    {
      icon: <GitBranch size="40" />,
      title: 'Gist Import & Sharing',
      description:
        'Import your existing GitHub Gists or share public links directly from Nesto — perfect for showcasing or collaborating.',
    },
  ]
  
  return (
    <section className="w-full px-4 py-24 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl tracking-tighter md:text-4xl">
          Features that keep you focused.
        </h2>
        <p className="text-muted-foreground font-geist mx-auto mt-2 max-w-2xl text-[16px] leading-5 tracking-tight">
          Built to replace cluttered tools with one calm, powerful workspace.{' '}
          <br /> Write notes, save snippets, and ask AI without breaking flow.
        </p>
      </div>
      <div className="font-geist relative mx-auto mt-10 w-[90%] tracking-tight xl:w-[85%]">
        <div className="w-full border-t border-black/30" />
        <div className="relative mx-4 -mt-4 border-x border-black/30">
          <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3">
            {features.map((feature, index) => {
              const isLastCol = (index + 1) % 3 === 0
              const isBottomRow = index >= 3
              return (
                <div
                  key={index}
                  className={cn(
                    'border-black/20 p-6',
                    !isBottomRow && 'border-b',
                  )}
                >
                  {!isLastCol && (
                    <>
                      <div className="absolute top-0 right-1/3 bottom-0 mt-4 hidden w-px bg-black/10 lg:block lg:h-[95.4%] xl:h-[94.3%]" />
                      <div className="absolute top-0 right-2/3 bottom-0 mt-4 hidden w-[0.5px] bg-black/10 lg:block lg:h-[95.4%] xl:h-[94.3%]" />
                    </>
                  )}
                  
                  <div className="absolute top-0 right-1/2 bottom-0 mt-4 hidden h-[96.4%] w-[0.5px] bg-black/10 sm:block lg:hidden xl:hidden" />

                  <div className="px-6 py-10">
                    <p className="mb-1 text-2xl">{feature.icon}</p>
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="-mt-4 w-full border-b border-black/30" />
      </div>
    </section>
  )
}
