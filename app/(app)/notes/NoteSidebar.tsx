'use client'
import NoteSearchBar from '@/components/searchbars/NoteSearchBar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Note, NoteSidebarProps } from '@/types/note'
import { ChevronRight, Trash } from 'lucide-react'
import { BeatLoader, HashLoader } from 'react-spinners'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useEffect, useState } from 'react'
import NoteMobileModal from './NoteMobileModal'

export default function NoteSidebar({
  notes,
  mode,
  title,
  content,
  isSaving,
  searchVal,
  setSearchVal,
  setSortOrder,
  setTitle,
  setContent,
  setSelectedNoteId,
  setMode,
  isLoading,
  isEditable,
  deletingNoteId,
  handleDeleteNote,
  handleCreateNote,
  handleUpdateNote,
}: NoteSidebarProps) {
  // handle note modal on mobile
  const [openNote, setOpenNote] = useState<Note | null>(null)
  // Close modal if screen becomes large (≥640px)
  useEffect(() => {
    const closeModalOnResize = () => {
      if (window.innerWidth >= 640) {
        setOpenNote(null)
      }
    }
    window.addEventListener('resize', closeModalOnResize)
    return () => window.removeEventListener('resize', closeModalOnResize)
  }, [])

  // Reusable mobile check
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

  function handleCreateClick() {
    if (isMobile) {
      const emptyNote: Note = {
        id: '',
        title: '',
        content: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setTitle('')
      setContent('')
      setOpenNote(emptyNote)
      setMode('create')
    } else {
      setMode('create')
      setSelectedNoteId(null)
      setTitle('')
      setContent('')
    }
  }

  function handleNoteClick(note: Note, noteId: string) {
    if (isMobile) {
      setOpenNote(note)
      setSelectedNoteId(note.id)
      setMode('view')
    } else {
      setSelectedNoteId(noteId)
      setMode('view')
    }
  }

  return (
    <aside className="w-full md:w-[400px] md:border-r lg:w-[420px] xl:w-[440px]">
      <div className="flex flex-col gap-3">
        {/* header section */}
        <div className="z-10 w-full bg-white dark:bg-black">
          <div className="mb-2 flex items-center justify-between px-5 py-4">
            <p className="text-[19px] font-bold tracking-tight underline">
              All Notes
            </p>
            <Button
              className="cursor-pointer text-xs tracking-wide"
              size="sm"
              onClick={handleCreateClick}
            >
              + New Note
            </Button>
          </div>
          <NoteSearchBar
            searchVal={searchVal}
            setSearchVal={setSearchVal}
            setSortOrder={setSortOrder}
            placeholder='search notes...'
          />
          <Separator className="mt-3" />
        </div>

        {/* render the notes */}
        {isLoading ? (
          <div className="flex justify-center">
            <BeatLoader color="#000000" size={15} loading={isLoading} />
          </div>
        ) : (
          // list of notes
          <>
            <div className="-mt-2">
              <ul className="divide-border z-0 divide-y">
                {notes.map((note) => (
                  <div
                    className="flex items-center justify-between"
                    key={note.id}
                  >
                    <li
                      className="-gap-1 group flex cursor-pointer items-center py-3.5 pl-6 font-semibold underline-offset-2 hover:underline"
                      onClick={() => handleNoteClick(note, note.id)}
                    >
                      {note.title}
                      <ChevronRight
                        size={17}
                        className="transform duration-200 group-hover:translate-x-1.5 group-hover:transition"
                      />
                    </li>
                    <div className="cursor-pointer pr-6">
                      {deletingNoteId === note.id ? (
                        <HashLoader size="10" />
                      ) : (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Trash size="17" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your note and remove from our
                                database.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Canel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteNote(note.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                ))}
              </ul>
            </div>
            {/* // open modal on mobile */}
            {openNote && (
              <NoteMobileModal
                note={openNote} // pass whole note
                mode={mode}
                isSaving={isSaving}
                isEditable={isEditable}
                setMode={setMode}
                setTitle={setTitle}
                setContent={setContent}
                title={title} // use current state
                content={content} // use current state
                onClose={() => setOpenNote(null)}
                handleCreateNote={handleCreateNote}
                handleUpdateNote={handleUpdateNote}
              />
            )}
          </>
        )}
      </div>
    </aside>
  )
}
