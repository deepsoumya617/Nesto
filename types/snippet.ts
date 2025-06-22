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
  tags: Tag[]
  createdAt: Date
  updatedAt: Date
}

export type TagInputProps = {
  tags: string[]
  setTags: (tags: string[]) => void
  isEditable: boolean
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

export type SnippetEditorProps = {
  className?: string
  title: string
  content: string
  fileName: string
  language: string
  tags: string[]
  setTags: (tags: string[]) => void
  isEditable: boolean
  isSaving: boolean
  mode: 'create' | 'view' | 'edit'
  setTitle: (title: string) => void
  setContent: (content: string) => void
  setFileName: (fileName: string) => void
  setLanguage: (language: string) => void
  setMode: (mode: 'create' | 'view' | 'edit') => void
  handleCreateSnippet?: () => void
  handleUpdateSnippet: () => void
}