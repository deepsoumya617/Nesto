export type AttachMentInput = {
  files: File[] | undefined
}

export type sendEmailOptions = {
  to: string
  from: string
  subject: string
  html: string
  attachments?: any[]
}
