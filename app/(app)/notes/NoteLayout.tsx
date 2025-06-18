'use client'

import { useEffect, useMemo, useState } from 'react'
import NoteSidebar from './NoteSidebar'
import { Note } from '@/types/note'
import { getNote } from '@/actions/notes'

export default function NoteLayout() {
  const [searchVal, setSearchVal] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Fetch notes from db and pass them to NoteSidebar
  useEffect(() => {
    async function getNotesFromDb() {
      try {
        setIsLoading(true)
        const result = await getNote()
        setNotes(result || [])
      } catch (error) {
        console.error('Error fetching notes:', error)
      } finally {
        setIsLoading(false)
      }
    }
    getNotesFromDb()
  },[])

  // filter notes based on search value and sort them based on sort order
  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) =>
        note.title.toLowerCase().includes(searchVal.toLowerCase()),
      )
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
      })
  }, [notes, searchVal, sortOrder])

  return (
    <div className="mx-auto flex h-[calc(100vh-4.53rem)] max-w-6xl border-x">
      <NoteSidebar
        notes={filteredNotes}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        setSortOrder={setSortOrder}
        isLoading={isLoading}
      />
    </div>
  )
}
