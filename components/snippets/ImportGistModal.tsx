'use client'

import { useGistImportStore } from '@/store/useGistImportStore'
import { useSnippetStore } from '@/store/useSnippetStore'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { useTransition } from 'react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { importGist } from '@/lib/actions/importGist'
import { toast } from 'sonner'
import { useSnippetMobileModalStore } from '@/store/useSnippetMobileModalStore'

export default function ImportGistModal({ isMobile }: { isMobile?: boolean }) {
  const [isPending, startTransition] = useTransition()
  const {
    isGistImportModalOpen,
    setIsGistImportModalOpen,
    setGistSnippet,
    gistSnippet,
  } = useGistImportStore()
  const {
    isSaving,
    setTitle,
    setContent,
    setLanguage,
    setFileName,
    setMode,
    handleCreateSnippet,
  } = useSnippetStore()

  const { setOpenModal } = useSnippetMobileModalStore()

  // Handle form submission
  async function handleFetch(formData: FormData) {
    const input = formData.get('gist') as string
    const gistId = input.trim().split('/').pop() || ''

    startTransition(async () => {
      const data = await importGist(gistId)
      if (!data) {
        alert('Failed to fetch Gist. Please check the URL or ID and try again.')
        return
      }
      console.log('Fetched Gist:', data)
      setGistSnippet(data)
    })
  }

  // save gist snippet to db directly
  async function handleSave() {
    if (!gistSnippet) {
      toast.error('No Gist loaded')
      return
    }

    setTitle(gistSnippet.title)
    setContent(gistSnippet.content)
    setFileName(gistSnippet.fileName)
    setLanguage(gistSnippet.language)

    // save the snippet
    await handleCreateSnippet()
    setIsGistImportModalOpen(false)
    toast.success('Gist snippet saved successfully!')
  }

  // open gist in editor
  async function handleOpenInEditor() {
    if (!gistSnippet) {
      toast.error('No Gist loaded')
      return
    }

    if (isMobile) {
      setOpenModal(true)
    }
    setMode('create')
    setTitle(gistSnippet.title)
    setContent(gistSnippet.content)
    setFileName(gistSnippet.fileName)
    setLanguage(gistSnippet.language)
    setIsGistImportModalOpen(false)
  }

  return (
    <Dialog
      open={isGistImportModalOpen}
      onOpenChange={setIsGistImportModalOpen}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import from GitHub Gist</DialogTitle>
          <DialogDescription className="text-[13px]">
            Paste your GitHub Gist URL below to import the code. You can edit it
            before saving to your snippets.
          </DialogDescription>
        </DialogHeader>
        {/* fetch gist  */}
        <form action={handleFetch}>
          <input
            type="text"
            name="gist"
            placeholder="Paste GitHub Gist URL or ID"
            className="w-full rounded-none border px-4 py-3 text-sm focus:border-black focus:outline-none"
            required
          />
          <Button
            type="submit"
            disabled={isPending}
            className="mt-4 cursor-pointer rounded-none"
          >
            {isPending ? 'Fetching...' : 'Fetch Gist'}
          </Button>
        </form>

        <Separator />

        {/* show preview */}
        <div className="space-x-4">
          <Button
            disabled={isSaving}
            className="cursor-pointer rounded-none"
            onClick={handleSave}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
          <Button onClick={handleOpenInEditor} className='rounded-none'>Open in Editor</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
