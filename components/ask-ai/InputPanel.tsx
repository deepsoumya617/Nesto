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

export default function InputPanel() {
  const { task, language, extraInfo, setTask, setLanguage, setExtraInfo } =
    useAskAiStore()
  return (
    <div className="font-geist flex w-full flex-col border-r md:w-1/2">
      {/* heading */}
      <div className="mt-4 mb-4 ml-6 text-[22px] font-bold tracking-tight">
        <p>Build your request</p>
        <p className="text-muted-foreground mt-0.5 w-sm text-sm font-medium tracking-normal">
          Select a task, write or import a snippet, and add any context you want
          AI to consider.
        </p>
      </div>

      <Separator />
      {/* inputs */}
      <section className="mt-4 mb-2 px-8 overflow-y-auto">
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
          {/* select tasks */}
          <div className="space-y-2">
            <Label>Tasks</Label>
            <Select required value={task || ''} onValueChange={setTask}>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Choose task" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tasks</SelectLabel>
                  <SelectItem value="explain">Explain snippet</SelectItem>
                  <SelectItem value="generate">Generate snippet</SelectItem>
                  <SelectItem value="debug">Debug snippet</SelectItem>
                  <SelectItem value="convert">Convert snippet</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* select language */}
          <div className="space-y-2">
            <Label>Languages</Label>
            <Select required value={language || ''} onValueChange={setLanguage}>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  <SelectItem value="javascript">Javascript</SelectItem>
                  <SelectItem value="typescript">Typescript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">Cpp</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* code editor/viewer */}
          <div className="col-span-1 space-y-2 md:col-span-2">
            <div className="flex h-5 items-center gap-2">
              <Label>Code editor</Label>
              <Separator orientation="vertical" />
              <button className="cursor-pointer text-sm font-medium underline-offset-4 hover:underline">
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
              className="h-[100px] resize-none overflow-y-auto shadow-none"
              value={extraInfo || ''}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
          </div>
          {/* buttons */}
          <div className="flex items-center gap-3">
            <button
              className="group font-geist flex cursor-pointer items-center gap-2 rounded-md bg-black px-4 py-2 text-[15px] font-medium tracking-wide text-white shadow-none dark:bg-white dark:text-black"
              // size="sm"
            >
              Ask AI
              <ChevronRight
                className="-ml-2 transform duration-200 group-hover:translate-x-1 group-hover:transition"
                size="20"
              />
            </button>
            <button
              className="group font-geist cursor-pointer rounded-md bg-stone-100 px-4 py-2 text-[15px] font-medium tracking-wide text-stone-900 shadow-none dark:bg-stone-900 dark:text-stone-50"
              // size="sm"
            >
              Clear
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
