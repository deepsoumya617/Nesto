'use client'

import { useAskAiStore } from '@/store/useAskAiStore'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { useEffect, useMemo } from 'react'
import { useSnippetStore } from '@/store/useSnippetStore'
import { ScrollArea } from '../ui/scroll-area'
import { Button } from '../ui/button'

export default function ImportSnippetModal() {
  const {
    isOpen,
    searchVal,
    setIsOpen,
    setSearchVal,
    setCodeInput,
    setLanguage,
  } = useAskAiStore()
  const { snippets, getSnippetsFromDB } = useSnippetStore()

  // fetch snippets on mount
  useEffect(() => {
    getSnippetsFromDB()
  }, [])

  // filter snippets based on search value
  const filteredSnippets = useMemo(() => {
    return snippets.filter((snippet) =>
      snippet.title.toLowerCase().includes(searchVal.toLowerCase()),
    )
  }, [searchVal, snippets])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Import snippet from DB</DialogTitle>
          <DialogDescription className="text-[13px]">
            Choose one of your saved snippets to import. You can modify it or
            add context before asking AI.
          </DialogDescription>
        </DialogHeader>
        {/* searchbar */}
        <Input
          placeholder="Search snippets..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        {/* scrollable area */}
        <ScrollArea className="font-geist h-[300px] w-full rounded-md border">
          <div className="mt-1.5 space-y-2">
            {filteredSnippets.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No snippets found.
              </p>
            ) : (
              filteredSnippets.map((snippet) => (
                <div
                  key={snippet.id}
                  className="flex items-center justify-between border-b px-7 py-2"
                >
                  <span className="text-[15px] font-medium">
                    {snippet.title}
                  </span>
                  <Button
                    size="sm"
                    // variant="outline"
                    className="cursor-pointer"
                    onClick={() => {
                      //   console.log(snippet.language)
                      setCodeInput(snippet.content)
                      //   setLanguage(snippet.language)
                      setIsOpen(false)
                    }}
                  >
                    Import
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
