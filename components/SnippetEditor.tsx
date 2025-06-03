'use client'

import CodeMirror from '@uiw/react-codemirror'
import { githubLight } from '@uiw/codemirror-theme-github'
import { EditorView } from '@codemirror/view'
import { cpp } from '@codemirror/lang-cpp'
import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
import { python } from '@codemirror/lang-python'
// import '../styles/SnippetFont.css'

import { Geist_Mono, JetBrains_Mono } from 'next/font/google'

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400'],
  preload: true,
})

const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  preload: true,
})

type SnippetEditorProps = {
  fileName: string | undefined
  language: string | undefined
  snippetContent: string | undefined
  isEditable: boolean
  onChange?: (val: string) => void
  heightMode: 'auto' | 'fixed'
}

function getLanguageFromExtension(language: string | undefined) {
  switch (language) {
    case 'cpp':
      return cpp()
    case 'js':
      return javascript()
    case 'java':
      return java()
    case 'py':
      return python()
    default:
      return cpp()
  }
}

export default function SnippetEditor({
  fileName,
  language,
  snippetContent,
  isEditable,
  onChange,
  heightMode = 'auto',
}: SnippetEditorProps) {
  const languageExtension = getLanguageFromExtension(language)

  //   Get fileName.language
  let fullFileNameWithExtension = 'file-name.language'
  if (fileName !== '' && language !== '') {
    fullFileNameWithExtension = `${fileName}.${language}`
  }

  // set custom font
  const customFontTheme = EditorView.theme({
    '&': {
      fontFamily: jbMono.style.fontFamily,
      fontSize: '14px',
      letterSpacing: '0.02em',
    },
    '.cm-content': {
      fontFamily: jbMono.style.fontFamily,
      fontSize: '14px',
      letterSpacing: '0.04em',
      paddingTop: '8px',
    },
    '.cm-gutters': {
      letterSpacing: '0.05em',
      paddingRight: '12px',
      paddingLeft: '12px',
    },
    '.cm-lineNumbers': {
      fontFamily: jbMono.style.fontFamily,
      fontSize: '14px',
      letterSpacing: '0.02em',
    },
  })

  // Remove outline
  const removeFocusOutline = EditorView.theme({
    '&.cm-focused': {
      outline: 'none',
      boxShadow: 'none',
    },
  })

  // adjust height of the code editor
  const height = heightMode === 'fixed' ? '400px' : 'auto'
  const overflow = heightMode === 'fixed' ? 'auto' : 'visible'

  return (
    <div className="mt-4 shadow-[7px_9px_0px_rgba(0,0,0,1)] rounded">
      <div className="w-full border-t border-x py-3 px-5 rounded-t border-black">
        <p className="text-sm tracking-wider text-slate-400">
          {fullFileNameWithExtension}
        </p>
      </div>
      <div className="border rounded-b border-black overflow-hidden">
        <CodeMirror
          value={snippetContent}
          height={height}
          theme={githubLight}
          extensions={[languageExtension, customFontTheme, removeFocusOutline]}
          onChange={onChange}
          editable={isEditable}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: false,
            highlightActiveLineGutter: false,
            highlightSelectionMatches: false,
            foldGutter: false,
          }}
          style={{
            overflow,
            paddingBottom: heightMode === 'auto' ? '2rem' : undefined,
          }}
        />
      </div>
    </div>
  )
}
