'use client'

import { useAskAiStore } from '@/store/useAskAiStore'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Separator } from '../ui/separator'
import CodeEditor from './CodeEditor'
import { Textarea } from '../ui/textarea'
import { ChevronRight } from 'lucide-react'
import ImportSnippetModal from './ImportSnippetModal'
import { useEffect, useMemo, useState } from 'react'
import { useAskAiMobileModalStore } from '@/store/useAskAiMobileModalStore'

type UserInfo = {
  dailyUsageCount: number
  lastUsedAt: Date | null
} | null

export default function InputPanel({
  isLoading,
  isMobile,
  fetchAIResponse,
  setOutput,
}: {
  isLoading: boolean
  isMobile?: boolean
  fetchAIResponse: () => Promise<void>
  setOutput: (output: string) => void
}) {
  const {
    task,
    language,
    extraInfo,
    convertTo,
    setIsOpen,
    setTask,
    setLanguage,
    setConvertTo,
    setExtraInfo,
    reset,
  } = useAskAiStore()

  const { setOpenModal } = useAskAiMobileModalStore()

  const languages = [
    { value: 'javascript', label: 'Javascript' },
    { value: 'typescript', label: 'Typescript' },
    { value: 'python', label: 'Python' },
    { value: 'go', label: 'Go' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'Cpp' },
    { value: 'rust', label: 'Rust' },
  ]

  // convert to languages
  const convertLanguages = useMemo(() => {
    return languages.filter((lang) => lang.value !== language)
  }, [language])

  const tasks = [
    { value: 'explain', label: 'Explain snippet' },
    { value: 'generate', label: 'Generate snippet' },
    { value: 'debug', label: 'Debug snippet' },
    { value: 'convert', label: 'Convert snippet' },
  ]

  const [userInfo, setUserInfo] = useState<UserInfo>(null)

  // fetch user info
  useEffect(() => {
    let interval: NodeJS.Timeout

    const fetchUserInfo = async () => {
      try {
        const res = await fetch('/api/user-info')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setUserInfo(data)
      } catch (err) {
        console.error('Failed to fetch user info', err)
      }
    }
    fetchUserInfo()
    interval = setInterval(fetchUserInfo, 60000) // poll every 60s
    return () => clearInterval(interval)
  }, [])

  if (!userInfo) return null

  // handle clearing the input and output fields
  function resetPanel() {
    reset()
    setOutput('')
  }

  // handle fetching AI response
  function handleFetchAIResponse() {
    if (isMobile) {
      console.log('Opening mobile modal...')
      setOpenModal(true)
    }
    fetchAIResponse()
  }

  return (
    <div className="font-geist flex w-full flex-col border-r md:w-1/2">
      {/* heading */}
      {userInfo.dailyUsageCount >= 5 && (
        <p className="text-red-500">Daily Limit Reached!</p>
      )}

      <div className="mt-4 mb-4 ml-6 text-[22px] font-bold tracking-tight">
        <p>Build your request</p>
        <p className="text-muted-foreground mt-0.5 w-sm text-sm font-medium tracking-normal">
          Select a task, write or import a snippet, and add any context you want
          AI to consider.
        </p>
      </div>

      <Separator />
      {/* inputs */}
      <section className="mt-4 mb-2 overflow-y-auto px-8 pb-6 sm:pb-0">
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
          {/* select tasks */}
          <div className="space-y-2">
            <Label>Tasks</Label>
            <Select required value={task || ''} onValueChange={setTask}>
              <SelectTrigger className="w-full cursor-pointer rounded-none">
                <SelectValue placeholder="Choose task" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tasks</SelectLabel>
                  {tasks.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* select language */}
          <div className="space-y-2">
            <Label>Languages</Label>
            <Select required value={language || ''} onValueChange={setLanguage}>
              <SelectTrigger className="w-full cursor-pointer rounded-none">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* convert to */}
          <div
            className={`col-span-1 space-y-2 md:col-span-2 ${task !== 'convert' ? 'hidden' : ''}`}
          >
            <Label>Convert to</Label>
            <Select
              required
              value={convertTo || ''}
              onValueChange={setConvertTo}
            >
              <SelectTrigger className="w-full cursor-pointer rounded-none">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  {convertLanguages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* code editor/viewer */}
          <div className="col-span-1 space-y-2 md:col-span-2">
            <div className="flex h-5 items-center gap-2">
              <Label>Code editor</Label>
              <Separator orientation="vertical" />
              <button
                className="cursor-pointer text-sm font-medium underline-offset-4 hover:underline"
                onClick={() => setIsOpen(true)}
                disabled={!task || task === 'generate'}
              >
                + Import snippet
              </button>
            </div>
            <CodeEditor />
          </div>
          {/* additional info */}
          <div className="col-span-1 space-y-2 md:col-span-2">
            <Label>Additional Instructions</Label>
            <Textarea
              placeholder="e.g. Explain this like I'm new to Go..."
              className="h-[100px] resize-none overflow-y-auto rounded-none shadow-none"
              value={extraInfo || ''}
              onChange={(e) => setExtraInfo(e.target.value)}
              required={task === 'generate'}
            />
          </div>
          {/* buttons */}
          <div className="flex items-center gap-3">
            <button
              className={`group font-geist flex cursor-pointer items-center gap-2 rounded-none bg-black px-4 py-2 text-[15px] font-medium tracking-wide text-white shadow-none dark:bg-white dark:text-black ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
              disabled={
                !task || !language || isLoading || userInfo.dailyUsageCount >= 5
              }
              onClick={handleFetchAIResponse}
            >
              {isLoading ? 'Asking AI...' : 'Ask AI'}
              <ChevronRight
                className="-ml-2 transform duration-200 group-hover:translate-x-1 group-hover:transition"
                size="20"
              />
            </button>
            <button
              className="group font-geist cursor-pointer rounded-none bg-stone-100 px-4 py-2 text-[15px] font-medium tracking-wide text-stone-900 shadow-none dark:bg-stone-900 dark:text-stone-50"
              // size="sm"
              onClick={resetPanel}
            >
              Clear
            </button>
          </div>
        </div>
      </section>

      {/* mount importSnippetModal */}
      <ImportSnippetModal />
    </div>
  )
}
