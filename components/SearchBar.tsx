'use client'

import { ListFilter, Search } from 'lucide-react'
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
    <div className="mt-10 flex items-center">
      <input
        type="text"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        className="w-full h-15 px-5 bg-gray-100 rounded-l-xl border-none focus:outline-none font-medium tracking-wider text-lg"
      />
      <button
        // disabled={true}
        className="text-zinc-500 text-xl bg-gray-100 h-15 px-6 rounded-r-xl"
      >
        <Search />
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-gray-100 h-15 px-5 rounded-xl mx-2 cursor-pointer">
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
