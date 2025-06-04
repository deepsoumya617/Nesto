'use client'

import Link from 'next/link'
import { ClockFading, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { format } from 'date-fns'
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
import { deleteSnippet } from '@/actions/snippets'
import { JSX } from 'react'
import Image from 'next/image'
import { Roboto_Mono } from 'next/font/google'
import { Button } from './ui/button'

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400'],
  preload: true,
})

type Props = {
  slug: string
  title: string
  fileName: string
  language: string
  snippetContent: string
  createdAt: Date
  updatedAt: Date
}

export default function SnippetCard({
  slug,
  title,
  fileName,
  language,
  snippetContent,
  createdAt,
  updatedAt,
}: Props) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDeleteSnippet() {
    if (isDeleting) return
    setIsDeleting(true)
    try {
      await deleteSnippet(slug)
      // router.refresh()
      window.location.reload()
    } catch (error) {
      console.error('Error deleting snippets: ', error)
    } finally {
      setIsDeleting(false)
    }
  }

  // get language icons
  const languageIcons: Record<string, JSX.Element> = {
    js: (
      <Image
        src="/images/javascript.svg"
        alt="javascript"
        width={22}
        height={22}
      />
    ),
    cpp: <Image src="/images/cpp.svg" alt="cpp" width={22} height={22} />,
    java: <Image src="/images/java.svg" alt="java" width={22} height={22} />,
    py: <Image src="/images/python.svg" alt="python" width={22} height={22} />,
  }

  // format createdAt and updatedAt
  const dateOfCreation = format(new Date(createdAt), 'MMM d, yyyy')
  const dateOfUpdation = format(new Date(updatedAt), 'MMM d, yyyy')

  return (
    <div className="mt-2 rounded-md border border-black shadow-[5px_7px_0px_rgba(0,0,0,1)] p-5 max-w-[400px] flex flex-col gap-4">
      {/* language icon + filename  */}
      <div className="flex items-center justify-between tracking-wider text-gray-400 text-sm">
        {languageIcons[language]}
        <p>{`${fileName}.${language}`}</p>
      </div>
      {/* title  */}
      <h4 className="group text-[16px] font-medium tracking-wide cursor-pointer hover:underline hover:underline-offset-4 flex items-center gap-1 leading-5">
        {title}
      </h4>

      {/* Code Preview */}
      {snippetContent && (
        <p
          className={`${robotoMono.className} bg-gray-100 rounded py-2 px-3 text-sm leading-5 text-gray-500 overflow-hidden whitespace-pre-wrap tracking-wide`}
        >
          {snippetContent.split('\n').slice(0, 2).join('\n') + '\n...'}
        </p>
      )}

      {/* update/created at */}
      <div className="flex items-center gap-1">
        <ClockFading className="text-gray-400" size={14} />
        <p className="text-sm tracking-wider text-gray-400">
          {createdAt !== updatedAt
            ? `Updated: ${dateOfUpdation}`
            : `Created: ${dateOfCreation}`}
        </p>
      </div>

      {/* buttons */}
      <div className="flex items-center gap-2 mt-auto">
        <Link href={`/snippets/view/${slug}`}>
          <Button
            className="text-sm tracking-widest cursor-pointer px-6 py-5"
            size={'sm'}
          >
            View
          </Button>
        </Link>
        {isDeleting ? (
          <p className="tracking-wide text-gray-300 mr-4">Deleting...</p>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="bg-red-500 hover:bg-red-600 text-sm tracking-wider cursor-pointer px-6 py-5"
                size={'sm'}
              >
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your code snippet and remove from our database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleDeleteSnippet}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  )
}
