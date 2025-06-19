export type Note = {
  id: string
  title: string
  slug: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export type NoteSidebarprops = {
  notes: Note[]
  searchVal: string
  setTitle: (title: string) => void
  setContent: (content: string) => void
  setSearchVal: (val: string) => void
  setSortOrder: (order: 'newest' | 'oldest') => void
  setSelectedNoteId: (id: string | null) => void
  setMode: (mode: 'create' | 'view' | 'edit') => void
  isLoading: boolean
}

export type NoteEditorProps = {
  title: string
  content: string
  setTitle: (title: string) => void
  setContent: (content: string) => void
  mode: 'create' | 'view' | 'edit'
  setMode: (mode: 'create' | 'view' | 'edit') => void
  isEditable: boolean
}
