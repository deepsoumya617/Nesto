import { useEffect } from 'react'
import { useSnippetStore } from '@/store/useSnippetStore'

export default function useSnippetShortcuts() {
  const {
    mode,
    setMode,
    setTitle,
    setContent,
    handleCreateSnippet,
    handleUpdateSnippet,
  } = useSnippetStore()

  const isEditable = mode === 'create' || mode === 'edit'

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC')
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey

      if (ctrlOrCmd && e.key === 'e') {
        e.preventDefault()
        if (!isEditable) setMode('edit')
      }

      if (ctrlOrCmd && e.key === 's') {
        e.preventDefault()
        if (mode === 'create') handleCreateSnippet()
        if (mode === 'edit') handleUpdateSnippet()
      }

      if (e.key === 'Escape') {
        if (mode === 'edit') setMode('view')
        if (mode === 'create') {
          setTitle('')
          setContent('')
          setMode('create')
        }
      }

      //   if (ctrlOrCmd && e.key === 'n') {
      //     e.preventDefault()
      //     setTitle('')
      //     setContent('')
      //     setMode('create')
      //   }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mode, isEditable])
}
