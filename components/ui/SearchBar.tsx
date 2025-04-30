'use client'

import { Search, ListFilter } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function SearchBar() {
  return (
    <div className="mt-10 flex items-center">
      <input
        type="text"
        className="w-full h-15 px-5 bg-gray-100 rounded-l-xl border-none focus:outline-none font-medium tracking-wider text-lg"
      />
      <button className="text-zinc-500 text-xl bg-gray-100 h-15 px-6 rounded-r-xl cursor-pointer hover:text-zinc-800">
        <Search />
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-gray-100 h-15 px-5 rounded-xl mx-2 cursor-pointer">
          <ListFilter />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Newest</DropdownMenuItem>
          <DropdownMenuItem>Oldest</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
