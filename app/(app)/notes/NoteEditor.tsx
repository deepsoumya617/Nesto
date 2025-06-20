import Tiptap from '@/components/tiptap'
import { NoteEditorProps } from '@/types/note'
import { Check, Pencil, X } from 'lucide-react'

export default function NoteEditor({
  title,
  content,
  mode,
  isEditable,
  isSaving,
  setTitle,
  setContent,
  setMode,
  handleCreateNote,
  handleUpdateNote,
}: NoteEditorProps) {
  return (
    <div className="hidden flex-1 flex-col overflow-y-auto md:flex">
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
      <Tiptap content={content} onChange={setContent} editable={isEditable} />

      {/* edit button */}
      <button
        className={
          'absolute top-56 right-56 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full' +
          (mode === 'edit' ? ' hidden' : '')
        }
        onClick={() => setMode('edit')}
      >
        <Pencil
          strokeWidth={2}
          className="text-black hover:text-black/80 dark:text-white"
          size="18"
        />
      </button>

      {/* fab */}
      <div
        className={
          'absolute right-56 bottom-6 z-30 flex gap-4' +
          (!isEditable ? ' hidden' : '')
        }
      >
        <button
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black transition-colors hover:bg-black/85 dark:bg-white dark:hover:bg-white/85"
          onClick={() => {
            if (mode === 'create') return handleCreateNote()
            if (mode === 'edit') return handleUpdateNote()
          }}
          disabled={isSaving}
        >
          <Check strokeWidth={2.4} className="text-white dark:text-black" />
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
    </div>
  )
}
