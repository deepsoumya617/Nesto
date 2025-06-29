'use client'

import CodeMirror, { EditorView } from '@uiw/react-codemirror'
import { githubLight, githubDark } from '@uiw/codemirror-theme-github'
import { langs } from '@uiw/codemirror-extensions-langs'
import { useTheme } from 'next-themes'

export default function CodeEditor() {
  const { resolvedTheme } = useTheme()

  const customFontTheme = EditorView.theme({
    '.cm-content': {
      fontFamily: 'var(--font-geist-mono)',
      fontSize: '13px',
      fontWeight: '400', // Increase font weight
      lineHeight: '1.7', // Increase line height
      letterSpacing: '0.04em',
      paddingTop: '8px',
      paddingLeft: '4px',
    },
    '.cm-gutters': {
      letterSpacing: '0.05em',
      paddingRight: '12px',
      paddingLeft: '12px',
    },
    '.cm-lineNumbers': {
      fontFamily: 'var(--font-geist-mono)',
      fontSize: '12px',
      letterSpacing: '0.02em',
      fontWeight: '400', // Make line numbers match
    },
  })

  // transparent background for code editor
  const transparentBackground = EditorView.theme({
    '&': {
      backgroundColor: 'transparent !important',
    },
  })

  // Remove outline
  const removeFocusOutline = EditorView.theme({
    '&.cm-focused': {
      outline: 'none',
      boxShadow: 'none',
    },
  })

  function getLanguage(language: string | undefined) {
    switch (language) {
      case 'cpp':
        return langs.cpp()
      case 'js':
        return langs.javascript()
      case 'java':
        return langs.java()
      case 'py':
        return langs.python()
      case 'ts':
        return langs.typescript()
      case 'go':
        return langs.go()
      //   case 'tsx':
      //     return langs.tsx()
      //   case 'jsx':
      //     return langs.jsx()
      //   case 'rs':
      //     return langs.rust()
      //   case 'json':
      //     return langs.json()
      //   case 'xml':
      //     return langs.xml()
      default:
        return langs.cpp()
    }
  }
  return (
    <div className="w-full overflow-hidden rounded-sm border">
      <CodeMirror
        height="250px"
        theme={resolvedTheme === 'light' ? githubLight : githubDark}
        // placeholder={'Write or import a snippet...'}
        extensions={[
          customFontTheme,
          transparentBackground,
          removeFocusOutline,
        ]}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
          highlightSelectionMatches: false,
          foldGutter: false,
        }}
      />
    </div>
  )
}
