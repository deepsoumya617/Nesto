export type Tag = {
  id: string
  name: string
  createdAt: Date
}

export type Snippet = {
  id: string
  title: string
  fileName: string
  language: string
  content: string
  tags?: Tag[]
  createdAt: Date
  updatedAt: Date
}

export type SnippetSidebarProps = {
  snippets: Snippet[]
  searchVal: string
  isLoading: boolean
  isSaving: boolean
  mode: 'create' | 'view' | 'edit'
  isEditable: boolean
  deletingSnippetId: string | null
  title: string
  content: string
  setTitle: (title: string) => void
  setContent: (content: string) => void
  setSearchVal: (val: string) => void
  setSortOrder: (order: 'newest' | 'oldest') => void
  setSelectedLanguage: (language: string | null) => void
  setSelectedSnippetId: (id: string | null) => void
  setMode: (mode: 'create' | 'view' | 'edit') => void
  handleDeleteSnippet: (id: string) => void
  handleCreateSnippet: () => void
  handleUpdateSnippet: () => void
}
