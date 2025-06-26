import { create } from 'zustand'

type GistSnippet = {
  title: string
  content: string
  fileName: string
  language: string
}

type GistImportStore = {
  gistSnippet: GistSnippet | null
  setGistSnippet: (snippet: GistSnippet | null) => void
  isGistImportModalOpen: boolean
  setIsGistImportModalOpen: (isOpen: boolean) => void
}

export const useGistImportStore = create<GistImportStore>((set) => ({
  gistSnippet: null,
  setGistSnippet: (snippet) => set({ gistSnippet: snippet }),
  isGistImportModalOpen: false,
  setIsGistImportModalOpen: (isOpen) => set({ isGistImportModalOpen: isOpen }),
}))
