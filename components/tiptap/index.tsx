'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './MenuBar'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { TiptapEditorProps } from '@/types/tiptap'
import { useEffect } from 'react'

export default function Tiptap({
  content,
  onChange,
  editable,
}: TiptapEditorProps) {
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
      Placeholder.configure({
        placeholder: 'Start typing your note...',
        emptyEditorClass:
          'text-gray-400 dark:text-gray-500 text-sm tracking-wide',
      }),
      Underline,
    ],
    content: content,
    editable,
    editorProps: {
      attributes: {
        class: 'focus:outline-none  px-7 py-4 font-regular tracking-[0.2px]',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    immediatelyRender: false
  })

  // Update the editor content when the content prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  useEffect(() => {
    if (editor) {
      editor.setEditable(editable)
    }
  }, [editable, editor])

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} required />
    </div>
  )
}
