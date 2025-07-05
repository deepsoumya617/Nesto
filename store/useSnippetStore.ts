// integration with Zustand for global state management
import { create } from 'zustand'
import { Snippet } from '@/types/snippet'
import {
  createSnippet,
  deleteSnippet,
  getSnippets,
  updateSnippet,
} from '@/lib/actions/snippets'
import { toast } from 'sonner'

type SnippetStore = {
  title: string
  content: string
  fileName: string
  language: string
  tags: string[]
  allTags: string[]
  snippets: Snippet[]
  mode: 'create' | 'view' | 'edit'
  searchVal: string
  sortOrder: 'newest' | 'oldest'
  selectedLanguage: string | null
  selectedSnippetId: string | null
  deletingSnippetId: string | null
  selectedTags: string[]
  isLoading: boolean
  isSaving: boolean

  setTitle: (title: string) => void
  setContent: (content: string) => void
  setFileName: (fileName: string) => void
  setLanguage: (language: string) => void
  setTags: (tags: string[]) => void
  setAllTags: (tags: string[]) => void
  setMode: (mode: 'create' | 'view' | 'edit') => void
  setSearchVal: (val: string) => void
  setSortOrder: (order: 'newest' | 'oldest') => void
  setSelectedLanguage: (language: string | null) => void
  setSelectedSnippetId: (id: string | null) => void
  setSnippets: (snippets: Snippet[]) => void
  setSelectedTags: (tags: string[]) => void

  getSnippetsFromDB: () => Promise<void>
  handleCreateSnippet: () => Promise<void>
  handleUpdateSnippet: () => Promise<void>
  handleDeleteSnippet: (id: string) => Promise<void>

  resetEditor: () => void
}

export const useSnippetStore = create<SnippetStore>((set, get) => ({
  title: '',
  content: '',
  fileName: '',
  language: '',
  tags: [],
  allTags: [],
  snippets: [],
  mode: 'create',
  searchVal: '',
  sortOrder: 'newest',
  selectedLanguage: null,
  selectedSnippetId: null,
  deletingSnippetId: null,
  selectedTags: [],
  isLoading: false,
  isSaving: false,

  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setFileName: (fileName) => set({ fileName }),
  setLanguage: (language) => set({ language }),
  setTags: (tags) => set({ tags }),
  setAllTags: (tags: string[]) => set({ allTags: tags }),
  setMode: (mode) => set({ mode }),
  setSearchVal: (val) => set({ searchVal: val }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setSelectedLanguage: (language) => set({ selectedLanguage: language }),
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  setSnippets: (snippets) => set({ snippets }),
  setSelectedSnippetId: (id) => {
    const snippet = get().snippets.find((s) => s.id === id)
    if (snippet) {
      set({
        selectedSnippetId: id,
        title: snippet.title,
        content: snippet.content,
        fileName: snippet.fileName,
        language: snippet.language,
        tags: snippet.tags.map((t) => t.name),
        mode: 'view',
      })
    } else {
      set({
        selectedSnippetId: null,
        title: '',
        content: '',
        fileName: '',
        language: '',
        tags: [],
        mode: 'create',
      })
    }
  },

  getSnippetsFromDB: async () => {
    if (get().isLoading) return
    try {
      set({ isLoading: true })
      const result = await getSnippets()
      const snippets = result || []

      const allTags = Array.from(
        new Set(
          snippets.flatMap((snippet) => snippet.tags.map((tag) => tag.name)),
        ),
      )
      set({
        snippets,
        allTags,
      })
    } catch (error) {
      console.error('Error fetching snippets:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  handleCreateSnippet: async () => {
    const { title, content, fileName, language, tags, snippets } = get()
    try {
      set({ isSaving: true })
      const result = await createSnippet(
        title,
        fileName,
        language,
        content,
        tags,
      )
      if (result.success) {
        set({
          snippets: [result.snippet!, ...snippets],
          title: '',
          content: '',
          fileName: '',
          language: '',
          tags: [],
          mode: 'create',
        })
        toast.success('Snippet created successfully!')
      }
    } catch (error) {
      console.error('Error creating snippet:', error)
    } finally {
      set({ isSaving: false })
    }
  },

  handleUpdateSnippet: async () => {
    const { selectedSnippetId, title, content, fileName, language } = get()
    if (!selectedSnippetId) return // No snippet selected for update

    try {
      set({ isSaving: true })
      const result = await updateSnippet(
        selectedSnippetId,
        title,
        content,
        fileName,
        language,
      )
      if (result.success) {
        set((state) => ({
          snippets: state.snippets.map((snippet) =>
            snippet.id === selectedSnippetId
              ? { ...snippet, title, content, fileName, language }
              : snippet,
          ),
          mode: 'view',
          selectedSnippetId: null,
          title: '',
          content: '',
          fileName: '',
          language: '',
        }))
        toast.success('Snippet updated successfully!')
      } else {
        toast.error(result.message || 'Failed to update snippet')
      }
    } catch (error) {
      console.error('Error updating snippet:', error)
      toast.error('Failed to update snippet')
    } finally {
      set({ isSaving: false })
    }
  },

  handleDeleteSnippet: async (id) => {
    if (get().deletingSnippetId) return // prevent multiple deletions
    try {
      set({ deletingSnippetId: id })
      await deleteSnippet(id)
      // Remove the deleted snippet from the store
      set((state) => ({
        snippets: state.snippets.filter((snippet) => snippet.id !== id),
        selectedSnippetId:
          state.selectedSnippetId === id ? null : state.selectedSnippetId,
        // mode: state.selectedSnippetId === id ? 'create' : state.mode,
      }))
      get().resetEditor()
      toast.success('Snippet deleted successfully!')
    } catch (error) {
      console.error('Error deleting snippet:', error)
      toast.error('Failed to delete snippet')
    } finally {
      set({ deletingSnippetId: null })
    }
  },

  resetEditor: () =>
    set({
      title: '',
      content: '',
      fileName: '',
      language: '',
      tags: [],
      mode: 'create',
      selectedSnippetId: null,
    }),
}))
