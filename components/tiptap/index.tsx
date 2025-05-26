'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './MenuBar'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'

type EditorProp = {
  content: string
  onChange: (content: string) => void
}

export default function Tiptap({ content, onChange }: EditorProp) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-4',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-4',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: 'bg-purple-500 text-white px-1 py-1',
        },
      }),
      Underline,
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          'mt-4 min-h-[400px] md:min-h-96 bg-gray-50 px-6 py-6 focus:outline-none tracking-wide border border-black shadow-[6px_9px_0px_rgba(0,0,0,1)] rounded',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
