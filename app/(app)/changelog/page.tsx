import { CalendarDays, PencilRuler } from 'lucide-react'

export default function ChangelogPage() {
  return (
    <div className="font-geist mx-auto flex  w-full max-w-4xl flex-col px-10 py-10 tracking-tight">
      <h1 className="text-3xl">Changelog🎉</h1>
      <div className="mt-4">
        <div className="flex items-center gap-1">
          <PencilRuler className="size-4" />
          <p className="text-[17px] tracking-tight">
            Version 1.0.0 – MVP Launch
          </p>
        </div>
        <div className="text-muted-foreground flex items-center gap-1">
          <CalendarDays className="size-4" />
          <p className="text-[16px] tracking-tight">July 21, 2025</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-medium underline underline-offset-2">
          Features
        </h3>
        <ul className="mt-3 text-base text-muted-foreground">
          <li>- Snippet and Note Management with full CRUD.</li>
          <li>
            - Syntax highlighting, language detection, and line highlighting.
          </li>
          <li>- Rich text editor for notes.</li>
          <li>- Responsive mobile routes for creating and editing.</li>
          <li>- Auth with Clerk and database via Prisma + PostgreSQL.</li>
          <li>
            - AI Assistant: Explain, optimize, convert, and generate
            snippets.
          </li>
          <li>
            - Ask AI tab for prompt-based interaction with existing content.
          </li>
          <li>- Search and filter notes/snippets.</li>
        </ul>
      </div>
    </div>
  )
}
