'use client'

import { ListFilter } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SnippetSearchBarProps } from '@/types/searchbar'

export default function SnippetSearchBar({
  searchVal,
  setSearchVal,
  setSortOrder,
  placeholder,
  languages,
  setSelectedLanguage,
}: SnippetSearchBarProps) {
  return (
    <div className="-mt-2 flex items-center px-5">
      <input
        type="text"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        className="h-14 w-full rounded-l-xl border-none bg-gray-100 px-5 text-[16px] font-medium focus:outline-none dark:bg-zinc-900"
        placeholder={placeholder}
        autoFocus
      />
      <div className="h-14 rounded-r-xl bg-gray-100 px-6 dark:bg-zinc-900" />
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-2 h-14 cursor-pointer rounded-xl bg-gray-100 px-5 dark:bg-zinc-900">
          <ListFilter />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setSortOrder('newest')}>
            Newest
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortOrder('oldest')}>
            Oldest
          </DropdownMenuItem>

          {languages.length > 0 && (
            <>
              <hr className="my-1" />{' '}
              <DropdownMenuItem onClick={() => setSelectedLanguage(null)}>
                All
              </DropdownMenuItem>
            </>
          )}
          {languages.map((language) => {
            return (
              <DropdownMenuItem
                key={language.value}
                onClick={() => setSelectedLanguage(language.value)}
              >
                {language.label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
