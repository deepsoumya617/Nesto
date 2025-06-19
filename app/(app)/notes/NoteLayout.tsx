'use client'

import { useEffect, useMemo, useState } from 'react'
import NoteSidebar from './NoteSidebar'
import { Note } from '@/types/note'
import { getNote } from '@/actions/notes'
import NoteEditor from './NoteEditor'

export default function NoteLayout() {
  const [searchVal, setSearchVal] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const [mode, setMode] = useState<'create' | 'view' | 'edit'>('create')
  const isEditable = mode !== 'view'
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
  }, [])

  // handle note selection
  useEffect(() => {
    if (!selectedNoteId) {
      setTitle('')
      setContent('')
      setMode('create')
      return
    }
    const selectedNote = notes.find((note) => note.id === selectedNoteId)
    if (selectedNote) {
      setTitle(selectedNote.title)
      setContent(selectedNote.content)
      setMode('view')
    }
  }, [selectedNoteId, notes])

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
    <div className="mx-auto flex h-[calc(100vh-4.53rem)] max-w-6xl flex-col md:flex-row md:border-x">
      <NoteSidebar
        notes={filteredNotes}
        setTitle={setTitle}
        setContent={setContent}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        setSortOrder={setSortOrder}
        setSelectedNoteId={setSelectedNoteId}
        setMode={setMode}
        isLoading={isLoading}
      />
      <NoteEditor
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        mode={mode}
        setMode={setMode}
        isEditable={isEditable}
      />
    </div>
  )
}
