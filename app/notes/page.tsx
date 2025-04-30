import { Button } from '@/components/ui/button'
import NoteCard from '@/components/ui/NoteCard'
import SearchBar from '@/components/ui/SearchBar'
import Link from 'next/link'

export default function NotesPage() {
  
  // dummy data
  const notes = [
    { id: '1', title: 'Complete math homework' },
    { id: '2', title: 'Grocery List' },
    { id: '3', title: 'Project Meeting Notes' },
    { id: '4', title: 'Ideas for Side Projects' },
    { id: '5', title: 'Read React Docs' },
  ]

  return (
    <div className="mt-14">
      <div className="flex items-center justify-between mx-1 tracking-wide">
        <h2 className="text-xl font-bold">All Notes📒</h2>
        <Link className="mr-2" href="/notes/new">
          <Button className="cursor-pointer">+ New Note</Button>
        </Link>
      </div>
      <div className="max-w-3xl mx-auto">
        <SearchBar />
        {notes.map((note) => {
          return <NoteCard key={note.id} id={note.id} title={note.title} />
        })}
      </div>
    </div>
  )
}
