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
      className={`${className ?? 'hidden md:flex'} flex-1 flex-col overflow-hidden pb-10 md:pb-28`}
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
      <button
        className="fixed top-60 right-4 z-50 flex h-12 w-12 cursor-pointer items-center justify-center gap-3 rounded-full bg-zinc-100 sm:right-10 md:right-5 lg:right-5 xl:right-40 2xl:right-56"
        onClick={() => setMode('edit')}
        disabled={mode === 'edit' || isSaving}
      >
        <Pencil strokeWidth={2} className="text-black" size={18} />
      </button>

      {/* fab */}
      {isEditable && (
        <div className="fixed right-4 bottom-8 z-50 flex gap-3 sm:right-10 md:right-5 lg:right-5 xl:right-40 2xl:right-56">
          <button
            className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-black transition-colors hover:bg-black/85 dark:bg-white dark:hover:bg-white/85"
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
            className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-red-600"
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
