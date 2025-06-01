'use client'

import { getNote } from '@/actions/notes'
import { Button } from '@/components/ui/button'
import NoteCard from '@/components/NoteCard'
import SearchBar from '@/components/SearchBar'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

export default function NotesPage() {
  const { isSignedIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [notes, setNotes] = useState<
    {
      id: string
      title: string
      slug: string
      createdAt: Date
      updatedAt: Date
    }[]
  >([])
  const [searchVal, setSearchVal] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')

  // dummy data
  // const notes = [
  //   { id: '1', title: 'Complete math homework' },
  //   { id: '2', title: 'Grocery List' },
  //   { id: '3', title: 'Project Meeting Notes' },
  //   { id: '4', title: 'Ideas for Side Projects' },
  //   { id: '5', title: 'Read React Docs' },
  // ]

  // fetch from db
  useEffect(() => {
    async function getNoteFromDb() {
      try {
        setIsLoading(true)
        const result = await getNote()
        setNotes(result || [])
      } catch (error) {
        console.error('Error fetching notes: ', error)
      } finally {
        setIsLoading(false)
      }
    }
    getNoteFromDb()
  }, [])

  if (!isSignedIn) {
    return (
      <div className="mt-16 text-center">
        <h4 className="text-3xl font-bold tracking-wide text-gray-400 leading-8">
          Sign Up or Login <br /> to see notes.
        </h4>
      </div>
    )
  }

  if (isSignedIn && isLoading) {
    return (
      <div className="mt-14 flex justify-center">
        <BeatLoader color="#000000" size={15} loading={isLoading} />
      </div>
    )
  }

  // Filter notes based on search value
  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(searchVal.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

  return (
    <div className="mt-14">
      <div className="flex items-center justify-between mx-1 tracking-wide">
        <h2 className="text-xl font-bold">All Notes📒</h2>
        <Link className="mr-2" href="/notes/new">
          <Button className="cursor-pointer">+ New Note</Button>
        </Link>
      </div>
      <div className="max-w-3xl mx-auto">
        <SearchBar
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          setSortOrder={setSortOrder}
        />
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => {
            return (
              <NoteCard
                key={note.id}
                slug={note.slug}
                title={note.title}
                createdAt={note.createdAt}
                updatedAt={note.updatedAt}
              />
            )
          })
        ) : (
          <p className="text-center mt-6 text-gray-500 tracking-wide text-xl">
            No notes found.
          </p>
        )}
      </div>
    </div>
  )
}
