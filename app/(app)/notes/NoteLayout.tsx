'use client'

import { useEffect, useMemo, useState } from 'react'
import NoteSidebar from './NoteSidebar'
import { Note } from '@/types/note'
import { createNote, deleteNote, getNote, updateNote } from '@/actions/notes'
import NoteEditor from './NoteEditor'
import { toast } from 'sonner'

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
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)


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

  // crud operations
  // create note
  async function handleCreateNote() {
    if (isSaving) return // already saving a note
    try {
      setIsSaving(true)
      const result = await createNote(title, content)
      if (result.success && result.note) {
        // reload the notes to reflect the newly created note
        setNotes((prevNotes) => [result.note!, ...prevNotes])

        // reset the editor
        setTitle('')
        setContent('')
        setMode('create')
        toast('Note created successfully!')
      }
    } catch (error) {
      console.error('Error creating note:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // update note
  async function handleUpdateNote() {
    if (isSaving || !selectedNoteId) return // already saving or no note selected
    try {
      setIsSaving(true)
      const result = await updateNote(selectedNoteId!, title, content)
      if (result.success) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === selectedNoteId ? { ...note, title, content } : note,
          ),
        )
        setMode('view') // switch back to view mode
        toast.success('Note updated successfully!')
      } else toast.error(result.message || 'Failed to update note')
    } catch (error) {
      console.error('Error updating note:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // delete note
  async function handleDeleteNote(noteId: string) {
    if (deletingNoteId) return // already deleting a note
    try {
      setDeletingNoteId(noteId)
      await deleteNote(noteId)
      window.location.reload() // reload to reflect changes
      toast('Note Deleted Successfully!')
    } catch (error) {
      console.error('Error deleting note:', error)
    } finally {
      setDeletingNoteId(null)
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-4.53rem)] max-w-6xl md:border-x"> 
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
        handleDeleteNote={handleDeleteNote}
        deletingNoteId={deletingNoteId}
      />
      <NoteEditor
        title={title}
        content={content}
        mode={mode}
        setTitle={setTitle}
        setContent={setContent}
        isEditable={isEditable}
        handleCreateNote={handleCreateNote}
        handleUpdateNote={handleUpdateNote}
        isSaving={isSaving}
        setMode={setMode}
      />
    </div>
  )
}
