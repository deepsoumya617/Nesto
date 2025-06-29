import { Button } from '../ui/button'
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

export default function InputPanel() {
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
      <section className="mt-4 mb-2 px-8">
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
          {/* select tasks */}
          <div className="space-y-2">
            <Label>Tasks</Label>
            <Select required>
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
            <Select required>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">Cpp</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1 md:col-span-2 space-y-2">
            <Label>Code editor</Label>
            <CodeEditor />
          </div>
        </div>
      </section>

      {/* <Separator /> */}
      {/* import snippet from database */}
      {/* <div className="font-geist mt-4 mb-6 ml-6 lg:w-[70%] max-w-3xl overflow-y-auto border p-4 text-[18px] font-bold tracking-tight rounded-sm  lg:h-[350px]"></div> */}
    </div>
  )
}
