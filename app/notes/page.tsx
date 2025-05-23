'use client'

import { getNote } from '@/actions/notes'
import { Button } from '@/components/ui/button'
import NoteCard from '@/components/ui/NoteCard'
import SearchBar from '@/components/ui/SearchBar'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

export default function NotesPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [notes, setNotes] = useState<{ id: string; title: string }[]>([])
  // dummy data
  // const notes = [
  //   { id: '1', title: 'Complete math homework' },
  //   { id: '2', title: 'Grocery List' },
  //   { id: '3', title: 'Project Meeting Notes' },
  //   { id: '4', title: 'Ideas for Side Projects' },
  //   { id: '5', title: 'Read React Docs' },
  // ]

  // fetch from db
  useEffect(() => {
    async function getNoteFromDb() {
      try {
        setIsLoading(true)
        const result = await getNote()
        setNotes(result || [])
      } catch (error) {
        console.error('Error fetching notes: ', error)
      } finally {
        setIsLoading(false)
      }
    }
    getNoteFromDb()
  }, [])

  if (isLoading) {
    return (
      <div className="mt-14 flex justify-center">
        <BeatLoader color="#000000" size={15} loading={isLoading} />
      </div>
    )
  }

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
        {notes.length > 0 ? (
          notes.map((note) => {
            return <NoteCard key={note.id} id={note.id} title={note.title} />
          })
        ) : (
          <p className="text-center mt-6 text-gray-500">No notes found.</p>
        )}
      </div>
    </div>
  )
}
