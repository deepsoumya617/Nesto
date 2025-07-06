// Disable Edge runtime
export const runtime = 'nodejs'

import { create } from 'zustand'

type AskAIStore = {
  task: string | null
  language: string | null
  convertTo: string
  codeInput: string
  extraInfo?: string
  searchVal: string
  isOpen: boolean
  isImported: boolean

  output: string | null
  isLoading: boolean

  setTask: (task: string) => void
  setLanguage: (language: string) => void
  setConvertTo: (convertTo: string) => void
  setCodeInput: (code: string) => void
  setExtraInfo: (info: string) => void
  setIsOpen: (isOpen: boolean) => void
  setSearchVal: (val: string) => void
  setIsImported: (isImported: boolean) => void

  fetchAIResponse: () => Promise<void>

  reset: () => void
}

export const useAskAiStore = create<AskAIStore>((set, get) => ({
  task: null,
  language: null,
  convertTo: '',
  codeInput: '',
  extraInfo: undefined,
  searchVal: '',
  isOpen: false,
  isImported: false,

  output: null,
  isLoading: false,

  setTask: (task) => set({ task }),
  setLanguage: (language) => set({ language }),
  setConvertTo: (convertTo) => set({ convertTo }),
  setCodeInput: (code) => set({ codeInput: code }),
  setExtraInfo: (info) => set({ extraInfo: info }),
  setSearchVal: (val) => set({ searchVal: val }),
  setIsOpen: (e) => set({ isOpen: e }),
  setIsImported: (isImported) => set({ isImported }),

  fetchAIResponse: async () => {
    const { task, language, codeInput, convertTo, extraInfo, isLoading } = get()

    if (isLoading || !task || !language) return
    try {
      set({ isLoading: true })
      set({ output: '' })

      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task,
          language,
          codeInput,
          convertTo,
          additionalInfo: extraInfo,
        }),
      })

      if (!response.ok || !response.body) {
        throw new Error('Failed to fetch AI response')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let result = ''

      while (true) {
        const { value, done } = await reader!.read()
        if (done) break
        result += decoder.decode(value, { stream: true })
        set({ output: result }) // update live
      }
    } catch (error) {
      console.error('Error fetching AI response:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  reset: () =>
    set({
      task: null,
      language: null,
      codeInput: '',
      extraInfo: undefined,
      isImported: false,
    }),
}))
