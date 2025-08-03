import { useEffect, useRef } from 'react'
import { useSnippetStore } from '@/store/useSnippetStore'
import { toast } from 'sonner'

export default function useSnippetShortcuts() {
  const {
    mode,
    title,
    setMode,
    setTitle,
    setContent,
    handleCreateSnippet,
    handleUpdateSnippet,
  } = useSnippetStore()

  const titleRef = useRef(title)
  useEffect(() => {
    titleRef.current = title
  }, [title])

  const isEditable = mode === 'create' || mode === 'edit'

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC')
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey

      if (ctrlOrCmd && e.key === 'e') {
        e.preventDefault()
        if (!isEditable) setMode('edit')
        toast('Switched to edit mode')
      }

      if (ctrlOrCmd && e.key === 's') {
        e.preventDefault()
        if (isEditable) {
          if (!titleRef.current.trim()) {
            toast.warning('Title cannot be empty.')
            return
          }
          if (mode === 'create') handleCreateSnippet()
          if (mode === 'edit') handleUpdateSnippet()
        }
      }

      if (e.key === 'Escape') {
        e.preventDefault()
        if (isEditable) {
          if (mode === 'create') {
            setTitle('')
            setContent('')
          }
          setMode('view')
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mode, isEditable])
}
