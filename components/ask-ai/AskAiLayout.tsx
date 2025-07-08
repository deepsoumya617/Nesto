'use client'

import { useState } from 'react'
import InputPanel from './InputPanel'
import OutputPanel from './OutputPanel'
import { useAskAiStore } from '@/store/useAskAiStore'

export default function AskAiLayout() {
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { task, language, codeInput, convertTo, extraInfo } = useAskAiStore()

  // fetch AI response from the server
  async function fetchAIResponse() {
    if (isLoading || !task || !language) return
    try {
      setIsLoading(true)
      setOutput('')
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({
          task,
          language,
          codeInput,
          convertTo,
          additionalInfo: extraInfo,
        }),
      })

      if (!response.ok || !response.body) throw new Error('Stream failed')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        console.log('Received chunk:', chunk)
        setOutput((prev) => prev + chunk)
      }
    } catch (error) {
      console.error('Error fetching AI response:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-4.53rem)] max-w-6xl overflow-hidden md:border-x">
      <div className="bg-muted-foreground/20 fixed top-44 h-[1px] w-full max-w-6xl" />
      <InputPanel
        fetchAIResponse={fetchAIResponse}
        isLoading={isLoading}
        setOutput={setOutput}
      />
      <OutputPanel output={output} isLoading={isLoading} />
    </div>
  )
}
