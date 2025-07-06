// type Task = 'generate' | 'explain' | 'debug' | 'convert'

export type AskAiInput = {
  task: string | null
  language: string
  codeInput?: string
  convertTo?: string
  additionalInfo?: string
}
