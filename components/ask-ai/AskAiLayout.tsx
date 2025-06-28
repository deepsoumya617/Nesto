import InputPanel from './InputPanel'
import OutputPanel from './OutputPanel'

export default function AskAiLayout() {
  return (
    <div className="mx-auto flex h-[calc(100vh-4.53rem)] max-w-6xl overflow-hidden md:border-x">
      <InputPanel />
      <OutputPanel />
    </div>
  )
}
