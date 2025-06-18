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
  setSearchVal: (val: string) => void
  setSortOrder: (order: 'newest' | 'oldest') => void
  isLoading: boolean
}
