import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'

type Props = {
  id: string
  title: string
}

export default function NoteCard({ id, title }: Props) {
  return (
    <div className="mt-4 rounded-md border border-black shadow-[5px_7px_0px_rgba(0,0,0,1)] p-4 px-5 max-w-[752px] flex items-center justify-between">
      <Link
        href={`/notes/${id}`}
        className="text-[16px] font-medium tracking-wide cursor-pointer"
      >
        {title}
      </Link>
      <div className="flex gap-4 cursor-pointer mr-3">
        <Pencil className="text-blue-500 hover:text-blue-600" />
        <Trash2 className="text-red-500 hover:text-red-600" />
      </div>
    </div>
  )
}
