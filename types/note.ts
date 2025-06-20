export type Note = {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export type NoteSidebarProps = {
  notes: Note[]
  searchVal: string
  isLoading: boolean
  isSaving: boolean
  mode: 'create' | 'view' | 'edit'
  isEditable: boolean
  deletingNoteId: string | null
  title: string
  content: string
  setTitle: (title: string) => void
  setContent: (content: string) => void
  setSearchVal: (val: string) => void
  setSortOrder: (order: 'newest' | 'oldest') => void
  setSelectedNoteId: (id: string | null) => void
  setMode: (mode: 'create' | 'view' | 'edit') => void
  handleDeleteNote: (id: string) => void
  handleCreateNote: () => void
  handleUpdateNote: () => void
}

export type NoteEditorProps = {
  className?: string
  title: string
  content: string
  isEditable: boolean
  isSaving: boolean
  mode: 'create' | 'view' | 'edit'
  setTitle: (title: string) => void
  setContent: (content: string) => void
  setMode: (mode: 'create' | 'view' | 'edit') => void
  handleCreateNote?: () => void
  handleUpdateNote: () => void
}

export type NoteMobileModalProps = {
  note: Note
  title: string
  content: string
  mode: 'create' | 'view' | 'edit'
  isSaving: boolean
  isEditable: boolean
  onClose: () => void
  setTitle: (title: string) => void
  setContent: (content: string) => void
  setMode: (mode: 'create' | 'view' | 'edit') => void
  handleCreateNote: () => void
  handleUpdateNote: () => void
}
