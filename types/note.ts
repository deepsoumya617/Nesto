export type Note = {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export type NoteSidebarprops = {
  notes: Note[]
  searchVal: string
  deletingNoteId: string | null
  setTitle: (title: string) => void
  setContent: (content: string) => void
  setSearchVal: (val: string) => void
  setSortOrder: (order: 'newest' | 'oldest') => void
  setSelectedNoteId: (id: string | null) => void
  setMode: (mode: 'create' | 'view' | 'edit') => void
  handleDeleteNote: (id: string) => void
  isLoading: boolean
}

export type NoteEditorProps = {
  title: string
  content: string
  isEditable: boolean
  isSaving: boolean
  mode: 'create' | 'view' | 'edit'
  setTitle: (title: string) => void
  setContent: (content: string) => void
  handleCreateNote: () => void
  handleUpdateNote: () => void
  setMode: (mode: 'create' | 'view' | 'edit') => void
}
