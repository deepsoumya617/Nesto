type Task = 'generate' | 'explain' | 'debug' | 'convert'

export type AskAiInput = {
  task: Task
  language: string
  codeInput?: string
  convertTo?: string
  additionalInfo?: string
}
