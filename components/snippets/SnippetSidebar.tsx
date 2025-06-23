'use client'

import { useSnippetStore } from '@/store/useSnippetStore'
import SnippetSearchBar from '../searchbars/SnippetSearchBar'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { BeatLoader, HashLoader } from 'react-spinners'
import { ChevronRight, Trash } from 'lucide-react'
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
} from '../ui/alert-dialog'
import { useEffect, useMemo } from 'react'

export default function SnippetSidebar() {
  const {
    snippets,
    isLoading,
    searchVal,
    selectedLanguage,
    selectedTags,
    sortOrder,
    deletingSnippetId,
    allTags,
    setSearchVal,
    setSortOrder,
    setSelectedLanguage,
    setSelectedSnippetId,
    handleDeleteSnippet,
    resetEditor,
    getSnippetsFromDB,
  } = useSnippetStore()

  // fetch snippets on mount
  useEffect(() => {
    getSnippetsFromDB()
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
      .filter((snippet) =>
        selectedTags.length > 0
          ? selectedTags.every((tag) =>
              snippet.tags.some(
                (t) => t.name.toLowerCase() === tag.toLowerCase(),
              ),
            )
          : true,
      )
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
      })
  }, [snippets, searchVal, selectedLanguage, selectedTags, sortOrder])

  // all languages
  const allLanguages = [
    { label: 'Cpp', value: 'cpp' },
    { label: 'Javascript', value: 'js' },
    { label: 'Java', value: 'java' },
    { label: 'Python', value: 'py' },
  ]

  return (
    <aside className="w-full md:w-[400px] md:border-r lg:w-[420px] xl:w-[440px]">
      <div className="flex flex-col gap-3">
        {/* header section */}
        <div className="z-10 w-full bg-white dark:bg-black">
          <div className="mb-2 flex items-center justify-between px-5 py-4">
            <p className="text-[19px] font-bold tracking-tight underline">
              All Snippets
            </p>
            <Button
              className="cursor-pointer text-xs tracking-wide"
              size="sm"
              onClick={resetEditor}
            >
              + New Snippet
            </Button>
          </div>
          <SnippetSearchBar
            placeholder="search snippets..."
            searchVal={searchVal}
            setSearchVal={setSearchVal}
            setSortOrder={setSortOrder}
            languages={allLanguages}
            setSelectedLanguage={setSelectedLanguage}
          />
          {/* {allTags.length > 0 &&
            allTags.map((tag) => {
              return <p key={tag}>{tag}</p>
            })} */}
          <Separator className="mt-3" />

          {/* render the snippets */}
          {isLoading ? (
            <div className="mt-3 flex justify-center">
              <BeatLoader color="#000000" size={15} loading={isLoading} />
            </div>
          ) : (
            <>
              <div>
                <ul className="divide-border z-0 divide-y">
                  {filteredSnippets.map((snippet) => (
                    <div
                      className="flex items-center justify-between"
                      key={snippet.id}
                    >
                      <li
                        className="-gap-1 group flex cursor-pointer items-center py-3.5 pl-6 font-semibold underline-offset-2 hover:underline"
                        onClick={() => setSelectedSnippetId(snippet.id)}
                      >
                        {snippet.title}
                        <ChevronRight
                          size={17}
                          className="transform duration-200 group-hover:translate-x-1.5 group-hover:transition"
                        />
                      </li>
                      <div className="cursor-pointer pr-6">
                        {deletingSnippetId === snippet.id ? (
                          <HashLoader size="10" />
                        ) : (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Trash size="17" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your snippet and remove
                                  from our database.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Canel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleDeleteSnippet(snippet.id)
                                  }
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
