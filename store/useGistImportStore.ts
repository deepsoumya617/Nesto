import { create } from 'zustand'

type GistSnippet = {
  title: string
  content: string
  fileName: string
  language: string
  tags: string[]
}

type GistImportStore = {
  gistSnippet: GistSnippet | null
  setGistSnippet: (snippet: GistSnippet | null) => void
  editMode: boolean
  setEditMode: (mode: boolean) => void
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
}

export const useGistImportStore = create<GistImportStore>((set) => ({
  gistSnippet: null,
  setGistSnippet: (snippet) => set({ gistSnippet: snippet }),
  editMode: false,
  setEditMode: (mode) => set({ editMode: mode }),
  isModalOpen: false,
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
}))
