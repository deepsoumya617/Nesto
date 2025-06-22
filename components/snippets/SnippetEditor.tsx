'use client'

import { SnippetEditorProps } from '@/types/snippet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import TagInput from './TagInput'

export default function SnippetEditor({
  className,
  title,
  content,
  fileName,
  language,
  tags,
  mode,
  isEditable,
  isSaving,
  setTitle,
  setContent,
  setFileName,
  setLanguage,
  setTags,
  setMode,
  handleCreateSnippet,
  handleUpdateSnippet,
}: SnippetEditorProps) {
  return (
    <div className="flex-1 flex-col overflow-hidden pb-10 md:pb-20">
      {/* title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Snippet Title"
        className="w-full border-b py-5 pl-7 font-semibold tracking-wide outline-none"
        disabled={!isEditable}
      />
      {/* filename + language */}
      <div className="flex items-center justify-between border-b">
        <input
          type="text"
          placeholder="Filename(dont include extension)"
          className="w-4/5 border-r py-5 pl-7 font-semibold tracking-wide outline-none"
        />
        <div className="w-1/5 text-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer font-semibold tracking-wide text-neutral-500">
              {language || 'lang'}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 rounded border bg-white px-2 py-2 dark:bg-black">
              {['cpp', 'js', 'java', 'py'].map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className="cursor-pointer"
                >
                  {lang}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* tags */}
      <TagInput tags={tags} setTags={setTags} isEditable={isEditable} />
    </div>
  )
}
