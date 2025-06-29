import { create } from 'zustand'

type AskAIStore = {
  task: string | null
  language: string | null
  codeInput: string

  setTask: (task: string) => void
  setLanguage: (language: string) => void
  setCodeInput: (code: string) => void
  reset: () => void
}

export const useAskAiStore = create<AskAIStore>((set) => ({
  task: null,
  language: null,
  codeInput: '',

  setTask: (task) => set({ task }),
  setLanguage: (language) => set({ language }),
  setCodeInput: (code) => set({ codeInput: code }),

  reset: () =>
    set({
      task: null,
      language: null,
      codeInput: '',
    }),
}))
