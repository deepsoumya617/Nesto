import { create } from 'zustand'

type SnippetMobileModalStore = {
  isMobile: boolean
  openModal: boolean
  setOpenModal: (isOpen: boolean) => void
}

export const useSnippetMobileModalStore = create<SnippetMobileModalStore>(
  (set) => ({
    // Reusable mobile check
    isMobile: typeof window !== 'undefined' && window.innerWidth < 640,
    openModal: false,
    setOpenModal: (isOpen) => set({ openModal: isOpen }),
  }),
)
