'use client'

import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { deleteNote } from '@/actions/notes'
import { useState } from 'react'
import { format } from 'date-fns'
import { ArrowUpRight } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

type Props = {
  slug: string
  title: string
  createdAt: Date
  updatedAt: Date
}

export default function NoteCard({ slug, title, createdAt, updatedAt }: Props) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDeleteNote() {
    if (isDeleting) return
    setIsDeleting(true)
    try {
      await deleteNote(slug)
      // router.refresh()
      window.location.reload()
    } catch (error) {
      console.error('Error deleting notes: ', error)
    } finally {
      setIsDeleting(false)
    }
  }

  // format createdAt and updatedAt
  const dateOfCreation = format(new Date(createdAt), 'EEE, MMM d, yyyy')
  const dateOfUpdation = format(new Date(updatedAt), 'EEE, MMM d, yyyy')

  return (
    <div className="mt-4 rounded-md border border-black shadow-[5px_7px_0px_rgba(0,0,0,1)] p-4 px-5 max-w-[752px] flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <Link
          href={`/notes/view/${slug}`}
          className="group text-[16px] font-medium tracking-wide cursor-pointer hover:underline hover:underline-offset-4 flex items-center gap-1"
        >
          {title}
          <ArrowUpRight
            size={18}
            className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out"
          />
        </Link>
        <p className="text-sm tracking-wider text-gray-400">
          {createdAt !== updatedAt
            ? `Updated On ${dateOfUpdation}`
            : `Created On ${dateOfCreation}`}
        </p>
      </div>
      {isDeleting ? (
        <p className="tracking-wide text-gray-300 mr-4">Deleting...</p>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex gap-4 cursor-pointer mr-3">
              <Trash2 className="text-red-500 hover:text-red-600" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                note and remove from our database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDeleteNote}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
