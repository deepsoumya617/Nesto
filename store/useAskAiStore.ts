import { create } from 'zustand'

type AskAIStore = {
  task: string | null
  language: string | null
  codeInput: string
  extraInfo?: string
  searchVal: string
  isOpen: boolean
  isImported: boolean

  setTask: (task: string) => void
  setLanguage: (language: string) => void
  setCodeInput: (code: string) => void
  setExtraInfo: (info: string) => void
  setIsOpen: (isOpen: boolean) => void
  setSearchVal: (val: string) => void
  setIsImported: (isImported: boolean) => void
  reset: () => void
}

export const useAskAiStore = create<AskAIStore>((set) => ({
  task: null,
  language: null,
  codeInput: '',
  extraInfo: undefined,
  searchVal: '',
  isOpen: false,
  isImported: false,

  setTask: (task) => set({ task }),
  setLanguage: (language) => set({ language }),
  setCodeInput: (code) => set({ codeInput: code }),
  setExtraInfo: (info) => set({ extraInfo: info }),
  setSearchVal: (val) => set({ searchVal: val }),
  setIsOpen: (e) => set({ isOpen: e }),
  setIsImported: (isImported) => set({ isImported }),

  reset: () =>
    set({
      task: null,
      language: null,
      codeInput: '',
      extraInfo: undefined,
      isImported: false,
    }),
}))
