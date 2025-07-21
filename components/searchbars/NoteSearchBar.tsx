'use client'

import { ListFilter } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SearchBarProps } from '@/types/searchbar'

export default function NoteSearchBar({
  searchVal,
  setSearchVal,
  setSortOrder,
  placeholder,
}: SearchBarProps) {
  return (
    <div className="-mt-2 flex items-center px-5">
      <input
        type="text"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        className="h-14 w-full rounded-l-none border-none bg-gray-100 px-5 text-[16px] font-medium focus:outline-none dark:bg-zinc-900"
        placeholder={placeholder}
        autoFocus
      />
      <div className="h-14 rounded-r-none bg-gray-100 px-6 dark:bg-zinc-900" />
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-2 h-14 cursor-pointer rounded-none bg-gray-100 px-5 dark:bg-zinc-900">
          <ListFilter />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setSortOrder('newest')}>
            Newest
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortOrder('oldest')}>
            Oldest
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
