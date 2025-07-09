import { create } from 'zustand'

type AskAiMobileModalStore = {
  openModal: boolean
  setOpenModal: (isOpen: boolean) => void
}

export const useAskAiMobileModalStore = create<AskAiMobileModalStore>(
  (set) => ({
    openModal: false,
    setOpenModal: (isOpen) => set({ openModal: isOpen }),
  }),
)
