'use client'

import CodeMirror, { EditorView } from '@uiw/react-codemirror'
import { githubLight, githubDark } from '@uiw/codemirror-theme-github'
import { langs } from '@uiw/codemirror-extensions-langs'
import { useTheme } from 'next-themes'
import { useAskAiStore } from '@/store/useAskAiStore'

export default function CodeEditor() {
  const { task, language, codeInput, isImported, setCodeInput } =
    useAskAiStore()
  const { resolvedTheme } = useTheme()
  const customFontTheme = EditorView.theme({
    '.cm-content': {
      fontFamily: 'var(--font-geist-mono)',
      fontSize: '12px',
      fontWeight: '400', // Increase font weight
      lineHeight: '1.4', // Increase line height
      letterSpacing: '0.05em',
      paddingTop: '10px',
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

  // custom background for code editor
  const editorLight = EditorView.theme({
    '&': {
      backgroundColor: '#ffffff',
    },
    '.cm-editor': {
      backgroundColor: '#ffffff',
    },
    '.cm-scroller': {
      backgroundColor: '#ffffff',
    },
    '.cm-content': {
      backgroundColor: '#ffffff',
    },
    '.cm-gutters': {
      backgroundColor: '#ffffff !important',
      color: '#94a3b8',
      border: 'none',
    },
  })

  const editorDark = EditorView.theme({
    '&': {
      backgroundColor: '#0b0b0a',
    },
    '.cm-editor': {
      backgroundColor: '#0b0b0a',
    },
    '.cm-scroller': {
      backgroundColor: '#0b0b0a',
    },
    '.cm-content': {
      backgroundColor: '#0b0b0a',
    },
    '.cm-gutters': {
      backgroundColor: '#0b0b0a',
      color: '#6b7280',
      border: 'none',
    },
  })

  // Remove outline
  const removeFocusOutline = EditorView.theme({
    '&.cm-focused': {
      outline: 'none',
      boxShadow: 'none',
    },
  })

  // placeholder font
  const placeholderFont = EditorView.theme({
    '.cm-placeholder': {
      fontFamily: 'var(--font-geist)',
      fontSize: '15px',
      fontWeight: '400',
      letterSpacing: '0.001em',
      color: 'var(--muted-foreground)',
    },
  })

  function getLanguageExtension(language: string | undefined) {
    switch (language) {
      case 'cpp':
        return langs.cpp()
      case 'javascript':
        return langs.javascript()
      case 'java':
        return langs.java()
      case 'py':
        return langs.python()
      case 'typescript':
        return langs.typescript()
      case 'go':
        return langs.go()
      case 'rust':
        return langs.rust()
      //   case 'tsx':
      //     return langs.tsx()
      //   case 'jsx':
      //     return langs.jsx()
      //   case 'json':
      //     return langs.json()
      //   case 'xml':
      //     return langs.xml()
      default:
        return langs.cpp()
    }
  }
  const languageExtension = getLanguageExtension(language?.toLowerCase())
  return (
    <div className="w-full overflow-hidden rounded-sm border">
      <CodeMirror
        height="250px"
        editable={isImported || task !== 'generate'}
        theme={resolvedTheme === 'light' ? githubLight : githubDark}
        value={codeInput}
        onChange={(e) => setCodeInput(e)}
        placeholder={
          task === 'generate'
            ? 'Code editor is disabled for code generation'
            : 'Paste your code here...'
        }
        extensions={[
          customFontTheme,
          resolvedTheme === 'light' ? editorLight : editorDark,
          removeFocusOutline,
          languageExtension,
          placeholderFont,
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
