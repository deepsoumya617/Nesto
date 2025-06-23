export type Tag = {
  id: string
  name: string
  createdAt: Date
}

export type Snippet = {
  id: string
  title: string
  fileName: string
  language: string
  content: string
  tags: Tag[]
  createdAt: Date
  updatedAt: Date
}

export type TagInputProps = {
  tags: string[]
  setTags: (tags: string[]) => void
  isEditable: boolean
}