'use client'

import { ListFilter } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type SearchBarProps = {
  searchVal: string
  setSearchVal: (val: string) => void
  setSortOrder: (order: 'newest' | 'oldest') => void
}

export default function SearchBar({
  searchVal,
  setSearchVal,
  setSortOrder,
}: SearchBarProps) {
  return (
    <div className="-mt-2 flex items-center px-5">
      <input
        type="text"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        className="h-14 w-full rounded-l-xl border-none bg-gray-100 dark:bg-zinc-900 px-5 text-[16px] font-medium focus:outline-none"
        placeholder="search notes..."
        autoFocus
      />
      <div className="h-14 rounded-r-xl bg-gray-100 dark:bg-zinc-900  px-6" />
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
