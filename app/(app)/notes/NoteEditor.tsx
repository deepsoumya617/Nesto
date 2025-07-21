import Tiptap from '@/components/tiptap'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { NoteEditorProps } from '@/types/note'
import { Check, Pencil, X } from 'lucide-react'
import { useEffect } from 'react'

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
  // Ensure that the shortcuts only work when the editor is editable
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC')
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey

      // Edit: Ctrl/Cmd + Shift + E
      if (ctrlOrCmd && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault()
        if (!isEditable && mode === 'view') {
          setMode('edit')
        }
      }

      // Save: Ctrl/Cmd + Shift + S
      if (ctrlOrCmd && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault()
        if (isEditable) {
          if (mode === 'create') handleCreateNote?.()
          if (mode === 'edit') handleUpdateNote?.()
        }
      }

      // Cancel: Escape
      if (e.key === 'Escape') {
        e.preventDefault()
        if (isEditable) {
          if (mode === 'create') {
            setTitle('')
            setContent('')
          }
          setMode('view')
        }
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [
    mode,
    isEditable,
    isSaving,
    setMode,
    handleCreateNote,
    handleUpdateNote,
    setTitle,
    setContent,
  ])

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
        className="fixed top-64 right-7 z-50 flex h-12 w-12 cursor-pointer items-center justify-center gap-3 rounded-full bg-zinc-100 sm:right-10 md:right-5 lg:hidden"
        onClick={() => setMode('edit')}
        disabled={mode === 'edit' || isSaving}
      >
        <Pencil strokeWidth={2} className="text-black" size={18} />
      </button>

      {/* fab */}
      {isEditable && (
        <div className="fixed right-6 bottom-8 z-50 flex gap-3 sm:right-10 md:right-5 lg:hidden">
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

      {/* help button  */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="fixed right-15 bottom-8 z-40 cursor-pointer rounded-full px-4 py-5 text-[17px] opacity-0 shadow-none md:opacity-100"
            aria-label="Keyboard Shortcuts Help"
          >
            ?
          </Button>
        </DialogTrigger>
        <DialogContent className="font-geist sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">
              Keyboard Shortcuts
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span>Edit</span>
              <kbd className="bg-muted rounded px-2 py-1 font-mono text-xs">
                Ctrl + Shift + E
              </kbd>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Save</span>
              <kbd className="bg-muted rounded px-2 py-1 font-mono text-xs">
                Ctrl + Shift + S
              </kbd>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Cancel</span>
              <kbd className="bg-muted rounded px-2 py-1 font-mono text-xs">
                ESC
              </kbd>
            </div>
          </div>

          <DialogClose asChild>
            <Button variant="outline" className="mt-6 w-full cursor-pointer">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}
