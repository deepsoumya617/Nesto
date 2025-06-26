import { X } from 'lucide-react'
import SnippetEditor from './SnippetEditor'
import { useSnippetMobileModalStore } from '@/store/useSnippetMobileModalStore'

export default function SnippetMobileModal() {
  const { setOpenModal } = useSnippetMobileModalStore()

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-black">
      <button
        className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 p-2 dark:bg-gray-800"
        onClick={() => setOpenModal(false)}
      >
        <X className="h-5 w-5 text-black dark:text-white" />
      </button>
      <SnippetEditor className='flex mt-12'/>
    </div>
  )
}
