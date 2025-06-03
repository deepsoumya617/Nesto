'use client'

import { Button } from '@/components/ui/button'
import SearchBar from '@/components/SearchBar'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import SnippetCard from '@/components/SnippetCard'
import { getSnippets } from '@/actions/snippets'

export default function SnippetsPage() {
  const { isSignedIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [snippets, setSnippets] = useState<
    {
      id: string
      title: string
      slug: string
      fileName: string
      language: string
      content: string
      createdAt: Date
      updatedAt: Date
    }[]
  >([])
  const [searchVal, setSearchVal] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  // filter by language
  const allLanguages = [
    { label: 'Cpp', value: 'cpp' },
    { label: 'Javascript', value: 'js' },
    { label: 'Java', value: 'java' },
    { label: 'Python', value: 'py' },
  ]

  // fetch from db
  useEffect(() => {
    async function getSnippetFromDb() {
      try {
        setIsLoading(true)
        const result = await getSnippets()
        setSnippets(result || [])
      } catch (error) {
        console.error('Error fetching snippets: ', error)
      } finally {
        setIsLoading(false)
      }
    }
    getSnippetFromDb()
  }, [])

  if (!isSignedIn) {
    return (
      <div className="mt-16 text-center">
        <h4 className="text-3xl font-bold tracking-wide text-gray-400 leading-8">
          Sign Up or Login <br /> to see snippets.
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

  // Filter notes based on search value and language
  const filteredSnippets = snippets
    .filter((snippet) =>
      snippet.title.toLowerCase().includes(searchVal.toLowerCase())
    )
    .filter((snippet) =>
      selectedLanguage ? snippet.language === selectedLanguage : true
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

  return (
    <div className="mt-14">
      <div className="flex items-center justify-between mx-1 tracking-wide">
        <h2 className="text-xl font-bold">All Snippets🗒️</h2>
        <Link className="mr-2" href="/snippets/new">
          <Button className="cursor-pointer">+ New Snippet</Button>
        </Link>
      </div>
      <div className="max-w-3xl mx-auto">
        <SearchBar
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          setSortOrder={setSortOrder}
        />
      </div>
      <div className="flex mt-4 gap-2 flex-wrap max-w-3xl mx-auto">
        <button
          onClick={() => setSelectedLanguage(null)}
          className={`px-7 py-2 rounded-full border text-sm font-medium tracking-wider
            cursor-pointer
          ${selectedLanguage === null ? 'border-black' : 'text-black'}
          hover:border-black transition`}
        >
          All
        </button>
        {allLanguages.map((lang, idx) => {
          return (
            <button
              key={idx}
              onClick={() => setSelectedLanguage(lang.value)}
              className={`px-7 py-2 rounded-full border text-sm font-medium tracking-wider cursor-pointer
              ${selectedLanguage === lang.value ? 'border-black' : 'text-black'}
              hover:border-black transition`}
            >
              {lang.label}
            </button>
          )
        })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 px-4 max-w-3xl mx-auto mb-5">
        {filteredSnippets.length > 0 ? (
          filteredSnippets.map((snippet) => {
            return (
              <SnippetCard
                key={snippet.id}
                slug={snippet.slug}
                title={snippet.title}
                language={snippet.language}
                fileName={snippet.fileName}
                snippetContent={snippet.content}
                createdAt={snippet.createdAt}
                updatedAt={snippet.updatedAt}
              />
            )
          })
        ) : (
          <p className="mt-6 text-gray-400 tracking-wider text-xl font-medium ">
            No snippets found!
          </p>
        )}
      </div>
    </div>
  )
}
