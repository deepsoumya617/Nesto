import Tiptap from '@/components/tiptap'
import { NoteEditorProps } from '@/types/note'
import { Check, Pencil, X } from 'lucide-react'

export default function NoteEditor({
  title,
  content,
  mode,
  isEditable,
  isSaving,
  className,
  setTitle,
  setContent,
  setMode,
  handleCreateNote,
  handleUpdateNote,
}: NoteEditorProps) {
  return (
    <div
      className={`${className ?? 'hidden md:flex'} flex-1 flex-col overflow-hidden md:pb-28 pb-10`}
      style={{ minHeight: '100vh' }} // mobile full height fix
    >
      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        className="w-full border-b py-5 pl-7 font-semibold tracking-wide outline-none"
        disabled={!isEditable}
        required
      />
      {/* editor */}
      <div className="overflow-y-auto">
        <Tiptap content={content} onChange={setContent} editable={isEditable} />
      </div>

      {/* edit button */}
      {mode !== 'edit' && (
        <button
          className="fixed top-4 right-16 z-60 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 cursor-pointer"
          onClick={() => setMode('edit')}
        >
          <Pencil
            strokeWidth={2}
            className="text-black dark:text-white"
            size={18}
          />
        </button>
      )}

      {/* fab */}
      {isEditable && (
        <div className="fixed right-5 bottom-5 z-50 flex gap-4">
          <button
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black transition-colors hover:bg-black/85 dark:bg-white dark:hover:bg-white/85"
            onClick={() => {
              if (mode === 'create') return handleCreateNote?.()
              if (mode === 'edit') return handleUpdateNote()
            }}
            disabled={isSaving}
          >
            <Check
              strokeWidth={2.4}
              className={
                isSaving
                  ? 'text-white/70 dark:text-black/70'
                  : 'text-white dark:text-black'
              }
            />
          </button>
          <button
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-600"
            onClick={() => {
              if (mode === 'edit') return setMode('view')
              if (mode === 'create') {
                setTitle('')
                setContent('')
                return setMode('create')
              }
              setMode('view')
            }}
          >
            <X strokeWidth={2.4} className="text-white" />
          </button>
        </div>
      )}
    </div>
  )
}
