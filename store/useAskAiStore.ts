import { create } from 'zustand'

type AskAIStore = {
  task: string | null
  language: string | null
  codeInput: string
  extraInfo?: string

  setTask: (task: string) => void
  setLanguage: (language: string) => void
  setCodeInput: (code: string) => void
  setExtraInfo: (info: string) => void
  reset: () => void
}

export const useAskAiStore = create<AskAIStore>((set) => ({
  task: null,
  language: null,
  codeInput: '',
  extraInfo: undefined,

  setTask: (task) => set({ task }),
  setLanguage: (language) => set({ language }),
  setCodeInput: (code) => set({ codeInput: code }),
  setExtraInfo: (info) => set({ extraInfo: info }),

  reset: () =>
    set({
      task: null,
      language: null,
      codeInput: '',
      extraInfo: undefined,
    }),
}))
