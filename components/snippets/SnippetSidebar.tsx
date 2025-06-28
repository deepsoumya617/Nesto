'use client'

import { useSnippetStore } from '@/store/useSnippetStore'
import SnippetSearchBar from '../searchbars/SnippetSearchBar'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { BeatLoader, HashLoader } from 'react-spinners'
import { ChevronRight, Plus, Trash } from 'lucide-react'
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
import { useEffect, useMemo, useState } from 'react'
import { useGistImportStore } from '@/store/useGistImportStore'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import ImportGistModal from './ImportGistModal'
import { useSnippetMobileModalStore } from '@/store/useSnippetMobileModalStore'
import SnippetMobileModal from './SnippetMobileModal'

// truncate title text
function truncateText(text: string): string {
  return text.slice(0, 37) + '...'
}

// all languages
const allLanguages = [
  { label: 'Cpp', value: 'cpp' },
  { label: 'Javascript', value: 'js' },
  { label: 'Java', value: 'java' },
  { label: 'Python', value: 'py' },
]

export default function SnippetSidebar({ isMobile }: { isMobile?: boolean }) {
  const {
    snippets,
    isLoading,
    searchVal,
    selectedLanguage,
    selectedTags,
    sortOrder,
    deletingSnippetId,
    // allTags,
    setSearchVal,
    setSortOrder,
    setSelectedLanguage,
    setSelectedSnippetId,
    handleDeleteSnippet,
    resetEditor,
    getSnippetsFromDB,
  } = useSnippetStore()

  // Close modal if screen becomes large (≥640px)

  useEffect(() => {
    const closeModalOnResize = () => {
      if (window.innerWidth >= 640) {
        setOpenModal(false)
      }
    }
    window.addEventListener('resize', closeModalOnResize)
    return () => window.removeEventListener('resize', closeModalOnResize)
  }, [])

  // const isMobile =  typeof window !== 'undefined' && window.innerWidth < 640

  const { setIsGistImportModalOpen } = useGistImportStore()

  const { openModal, setOpenModal } = useSnippetMobileModalStore()

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

  // handle create snippet click
  function handleCreateClick() {
    if (isMobile) {
      setOpenModal(true)
    }
    resetEditor()
  }

  // handle snippet click
  function handleSnippetClick(snippetId: string) {
    if (isMobile) {
      setOpenModal(true)
    }
    setSelectedSnippetId(snippetId)
  }

  return (
    <aside className="w-full md:w-[400px] md:border-r lg:w-[420px] xl:w-[440px]">
      <div className="flex flex-col gap-3">
        {/* header section */}
        <div className="z-10 w-full bg-white dark:bg-black">
          <p className="mt-3 ml-5 text-[19px] font-bold tracking-tight underline">
            All Snippets
          </p>
          <div className="mb-2 flex items-center gap-3 px-5 py-3">
            <Button
              className="cursor-pointer text-xs font-semibold tracking-wide"
              size="sm"
              // onClick={resetEditor}
              onClick={handleCreateClick}
            >
              New Snippet
              <Plus className="-ml-1" size="17" />
            </Button>
            <Button
              className="group cursor-pointer px-3 text-xs font-semibold tracking-wide shadow-none"
              size="sm"
              onClick={() => setIsGistImportModalOpen(true)}
            >
              Import from GitHub
              <ChevronRight
                className="-ml-2 transform duration-200 group-hover:translate-x-1 group-hover:transition"
                size="17"
              />
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
        </div>

        {/* render the snippets */}
        {isLoading ? (
          <div className="mt-3 flex justify-center">
            <BeatLoader color="#000000" size={15} loading={isLoading} />
          </div>
        ) : (
          <>
            <div>
              <ul className="divide-border z-0 -mt-2 divide-y">
                {filteredSnippets.map((snippet) => {
                  const isTruncated = snippet.title.length > 37
                  const truncatedTitle = truncateText(snippet.title)

                  return (
                    <div
                      className="flex items-center justify-between"
                      key={snippet.id}
                    >
                      {isTruncated ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <li
                              className="-gap-1 group flex cursor-pointer items-center py-3.5 pl-6 font-semibold underline-offset-2 hover:underline"
                              onClick={() => handleSnippetClick(snippet.id)}
                            >
                              {truncatedTitle}
                              <ChevronRight
                                size={17}
                                className="transform duration-200 group-hover:translate-x-1.5 group-hover:transition"
                              />
                            </li>
                          </TooltipTrigger>
                          <TooltipContent>{snippet.title}</TooltipContent>
                        </Tooltip>
                      ) : (
                        <li
                          className="-gap-1 group flex cursor-pointer items-center py-3.5 pl-6 font-semibold underline-offset-2 hover:underline"
                          onClick={() => handleSnippetClick(snippet.id)}
                        >
                          {snippet.title}
                          <ChevronRight
                            size={17}
                            className="transform duration-200 group-hover:translate-x-1.5 group-hover:transition"
                          />
                        </li>
                      )}

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
                                  permanently delete your snippet and remove it
                                  from our database.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
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
                  )
                })}
              </ul>
            </div>
            {/* gist modal */}
            <ImportGistModal isMobile={isMobile} />
            {/* open snippet modal in mobile */}
            {openModal && isMobile && <SnippetMobileModal />}
          </>
        )}
      </div>
    </aside>
  )
}
