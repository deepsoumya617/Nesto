import { NoteMobileModalProps } from '@/types/note'
import NoteEditor from './NoteEditor'
import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function NoteMobileModal({
  note,
  mode,
  title,
  content,
  isSaving,
  isEditable,
  onClose,
  setContent,
  setMode,
  setTitle,
  handleCreateNote,
  handleUpdateNote,
}: NoteMobileModalProps) {
  useEffect(() => {
    // Sync title/content state with selected note
    setTitle(note.title)
    setContent(note.content)
  }, [note, setTitle, setContent])
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-black">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 p-2 dark:bg-gray-800"
      >
        <X className="h-5 w-5 text-black dark:text-white" />
      </button>

      <NoteEditor
        title={title}
        content={content}
        isEditable={isEditable}
        setMode={setMode}
        setTitle={setTitle}
        setContent={setContent}
        handleCreateNote={handleCreateNote}
        handleUpdateNote={handleUpdateNote}
        mode={mode}
        isSaving={isSaving}
        className="flex mt-12"
      />
    </div>
  )
}
