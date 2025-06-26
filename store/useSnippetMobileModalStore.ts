import { create } from 'zustand'

type SnippetMobileModalStore = {
  openModal: boolean
  setOpenModal: (isOpen: boolean) => void
}

export const useSnippetMobileModalStore = create<SnippetMobileModalStore>(
  (set) => ({
    openModal: false,
    setOpenModal: (isOpen) => set({ openModal: isOpen }),
  }),
)
