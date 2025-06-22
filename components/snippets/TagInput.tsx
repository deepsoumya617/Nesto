'use client'

import { TagInputProps } from '@/types/snippet'
import { useState } from 'react'

export default function TagInput({ tags, setTags, isEditable }: TagInputProps) {
  const [input, setInput] = useState('')

  // add tags
  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && input.trim() !== '') {
      e.preventDefault()
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()])
      }
      setInput('')
    }
  }

  // remove tags
  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <div className="w-full border-b py-5 pl-7">
      <div className="mb-1 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="bg-muted flex items-center gap-2 rounded-full px-3 py-1 text-sm"
          >
            <span>{tag}</span>
            {isEditable && (
              <button
                onClick={() => removeTag(tag)}
                className="text-muted-foreground text-sm hover:text-red-500 cursor-pointer"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      {isEditable && (
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={addTag}
          placeholder="Add a tag and press Enter"
          className="w-full font-semibold tracking-wide outline-none placeholder:text-neutral-450"
        />
      )}
    </div>
  )
}
