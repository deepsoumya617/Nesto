'use client'

import { useEffect, useState } from 'react'
import SnippetEditor from './SnippetEditor'
import SnippetSidebar from './SnippetSidebar'

export default function SnippetLayout() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])
  return (
    <div className="mx-auto flex h-[calc(100vh-4.53rem)] max-w-6xl overflow-hidden md:border-x font-geist">
      <SnippetSidebar isMobile={isMobile} />
      <SnippetEditor isMobile={isMobile}/>
    </div>
  )
}
