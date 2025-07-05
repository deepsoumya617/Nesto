'use server'

import { toast } from 'sonner'

const supportedLanguages = [
  'cpp',
  'js',
  'ts',
  'java',
  'py',
  'rs',
  'go',
  'json',
  'jsx',
  'tsx',
]

export async function importGist(gistId: string) {
  try {
    // fetch from github api
    const result = await fetch(`https://api.github.com/gists/${gistId}`)
    if (!result.ok) return null

    // parse the response
    const gistData = await result.json()
    // console.log('Gist Data:', gistData)
    const files = Object.values(gistData.files)
    const firstFile = files[0] as any

    // check if the language is supported
    const lang = firstFile.filename?.split('.').pop() as string
    if (!supportedLanguages.includes(lang.toLowerCase())) {
      toast.warning(`This Gist uses "${lang}", which is not supported.`)
    }

    return {
      title: gistData.description || firstFile.filename.split('.')[0] || 'Untitled',
      content: firstFile.content || '',
      // language: firstFile.language || 'plaintext',
      language: lang,
      fileName: firstFile.filename.split('.')[0] || '',
    }
  } catch (error) {
    console.error('Error importing Gist:', error)
    return null
  }
}
