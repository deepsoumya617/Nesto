'use client'

import { useGistImportStore } from '@/store/useGistImportStore'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { useTransition } from 'react'
import { Button } from '../ui/button'

export default function ImportGistModal() {
  const [isPending, startTransition] = useTransition()
  const { isModalOpen, setIsModalOpen } = useGistImportStore()

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import from GitHub Gist</DialogTitle>
          <DialogDescription className="text-[13px]">
            Paste your GitHub Gist URL below to import the code. You can edit it
            before saving to your snippets.
          </DialogDescription>
        </DialogHeader>
        {/* fetch gist  */}
        <form>
          <input
            type="text"
            name="gist"
            placeholder="Paste GitHub Gist URL or ID"
            className="w-full rounded border px-4 py-3 text-sm focus:border-black focus:outline-none"
          />
          <Button
            type="submit"
            disabled={isPending}
            className="mt-4 cursor-pointer"
          >
            {isPending ? 'Fetching...' : 'Fetch Gist'}
          </Button>
        </form>

        {/* show preview */}
      </DialogContent>
    </Dialog>
  )
}
