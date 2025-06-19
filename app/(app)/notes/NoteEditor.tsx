import Tiptap from '@/components/tiptap'
import { NoteEditorProps } from '@/types/note'

export default function NoteEditor({
  title,
  content,
  setTitle,
  setContent,
  mode,
  setMode,
  isEditable,
}: NoteEditorProps) {
  return (
    <div className="flex flex-1 flex-col">
      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        className="w-full border-b py-5 pl-7 font-semibold tracking-wide outline-none"
        disabled={!isEditable}
      />
      {/* editor */}
      <Tiptap content={content} onChange={setContent} editable={isEditable} />
    </div>
  )
}
