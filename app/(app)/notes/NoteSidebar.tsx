import SearchBar from '@/components/SearchBar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { NoteSidebarprops } from '@/types/note'
import { ChevronRight } from 'lucide-react'

export default function NoteSidebar({
  notes,
  searchVal,
  setSearchVal,
  setSortOrder,
}: NoteSidebarprops) {
  return (
    <aside className="w-full md:w-[370px] md:border-r lg:w-[400px] xl:w-[420px]">
      <div className="flex flex-col gap-3">
        {/* header section */}
        <div className="fixed bg-white dark:bg-black z-10">
          <div className="flex items-center justify-between px-5 py-4 mb-2">
            <p className="text-[19px] font-bold tracking-tight underline">
              All Notes
            </p>
            <Button className="cursor-pointer text-xs tracking-wide" size="sm">
              + New Note
            </Button>
          </div>
          <SearchBar
            searchVal={searchVal}
            setSearchVal={setSearchVal}
            setSortOrder={setSortOrder}
          />
          <Separator className="mt-3" />
        </div>

        {/* render the notes */}
        <div className='mt-[8.5rem]'>
        <ul className="divide-border divide-y z-0">
          {notes.map((note) => (
            <li key={note.id} className="pl-6 py-3.5 flex items-center font-semibold -gap-1 group hover:underline cursor-pointer underline-offset-2">
              {note.title}
              <ChevronRight size={17} className='group-hover:transition transform duration-200 group-hover:translate-x-1.5'/>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </aside>
  )
}
