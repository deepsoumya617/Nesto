'use client'

import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { deleteNote } from '@/actions/notes'
import { useState } from 'react'
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

// import { useRouter } from 'next/navigation'

type Props = {
  slug: string
  title: string
}

export default function NoteCard({ slug, title }: Props) {
  const [isDeleting, setIsDeleting] = useState(false)
  // const router = useRouter()

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
  return (
    <div className="mt-4 rounded-md border border-black shadow-[5px_7px_0px_rgba(0,0,0,1)] p-4 px-5 max-w-[752px] flex items-center justify-between">
      <Link
        href={`/notes/view/${slug}`}
        className="text-[16px] font-medium tracking-wide cursor-pointer hover:underline hover:underline-offset-4"
      >
        {title}
      </Link>
      {isDeleting ? (
        <p className="tracking-wide text-gray-300 mr-4">Deleting...</p>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex gap-4 cursor-pointer mr-3">
              <Trash2
                className="text-red-500 hover:text-red-600"
              />
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
              <AlertDialogAction className='bg-red-600 hover:bg-red-700' onClick={handleDeleteNote}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
