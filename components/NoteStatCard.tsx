import Link from 'next/link'
import { Button } from './ui/button'

type NoteProps = {
  noteCount: number
  recentNoteTitle: string
}

export function NoteStatCard({ noteCount, recentNoteTitle }: NoteProps) {
  return (
    <div className="rounded-lg border p-4 flex flex-col h-full">
      <h3 className="text-lg font-semibold mb-2">Note Stats 📊</h3>
      <div className="text-muted-foreground tracking-wide mt-4">
        <p>📄 Total Notes: {noteCount}</p>
        <p>📝 Most Recent: {recentNoteTitle}</p>
      </div>

      <div className="mt-auto pt-4">
        <div>
          <Link href="/notes/new">
            <Button
              size="sm"
              className="mt-4 tracking-wider cursor-pointer py-5 px-4 w-full"
            >
              + New Note
            </Button>
          </Link>
          <Link href="/notes">
            <Button
              size="sm"
              className="mt-4 tracking-wider cursor-pointer py-5 px-4 w-full"
            >
              View All Notes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
