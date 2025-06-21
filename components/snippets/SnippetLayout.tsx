'use client'

import { useEffect, useMemo, useState } from 'react'
import SnippetSidebar from './SnippetSidebar'
import { Snippet } from '@/types/snippet'
import { getSnippets } from '@/actions/snippets'

export default function SnippetLayout() {
  //    states
  const [searchVal, setSearchVal] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  // fetch snippets from db and pass them to SnippetSidebar
  useEffect(() => {
    async function getSnippetsFromDb() {
      if (isLoading) return // prevent multiple fetches
      try {
        setIsLoading(true)
        const result = await getSnippets()
        setSnippets(result || [])
      } catch (error) {
        console.error('Error fetching snippets:', error)
      } finally {
        setIsLoading(false)
      }
    }
    getSnippetsFromDb()
  }, [])

  // filter snippets
  const filteredSnippets = useMemo(() => {
    return snippets
      .filter((snippet) =>
        snippet.title.toLowerCase().includes(searchVal.toLowerCase()),
      )
      .filter((snippet) =>
        selectedLanguage ? snippet.language === selectedLanguage : true,
      )
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
      })
  }, [snippets, searchVal, sortOrder, selectedLanguage])

  return (
    <div className="mx-auto flex h-[calc(100vh-4.53rem)] max-w-6xl overflow-hidden md:border-x">
      <SnippetSidebar
        snippets={filteredSnippets}
        setSearchVal={setSearchVal}
        setSortOrder={setSortOrder}
        isLoading={isLoading}
        setSelectedLanguage={setSelectedLanguage}
      />
    </div>
  )
}
