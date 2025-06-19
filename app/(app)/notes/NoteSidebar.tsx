import SearchBar from '@/components/SearchBar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { NoteSidebarprops } from '@/types/note'
import { ChevronRight } from 'lucide-react'
import { BeatLoader } from 'react-spinners'

export default function NoteSidebar({
  notes,
  searchVal,
  setSearchVal,
  setSortOrder,
  setTitle,
  setContent,
  setSelectedNoteId,
  setMode,
  isLoading,
}: NoteSidebarprops) {
  return (
    <aside className="w-full md:w-[400px] md:border-r lg:w-[420px] xl:w-[440px]">
      <div className="flex flex-col gap-3">
        {/* header section */}
        <div className="z-10 w-full bg-white dark:bg-black">
          <div className="mb-2 flex items-center justify-between px-5 py-4">
            <p className="text-[19px] font-bold tracking-tight underline">
              All Notes
            </p>
            <Button
              className="cursor-pointer text-xs tracking-wide"
              size="sm"
              onClick={() => {
                setMode('create')
                setSelectedNoteId(null)
                setTitle('')
                setContent('')
              }}
            >
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
        {isLoading ? (
          <div className="flex justify-center">
            <BeatLoader color="#000000" size={15} loading={isLoading} />
          </div>
        ) : (
          <div className="-mt-2">
            <ul className="divide-border z-0 divide-y">
              {notes.map((note) => (
                <li
                  key={note.id}
                  className="-gap-1 group flex cursor-pointer items-center py-3.5 pl-6 font-semibold underline-offset-2 hover:underline"
                  onClick={() => {
                    setSelectedNoteId(note.id)
                    setMode('view')
                  }}
                >
                  {note.title}
                  <ChevronRight
                    size={17}
                    className="transform duration-200 group-hover:translate-x-1.5 group-hover:transition"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  )
}
