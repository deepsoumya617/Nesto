import { getSnippetCount, getSnippetLanguageStats, getSnippets } from '@/actions/snippets'
import DashboardClient from './DashboardClient'
import { getNote, getNoteCount } from '@/actions/notes'


export default async function DashboardPage() {
  const { snippetCount, percentChangeSnippets } = await getSnippetCount()
  const { noteCount, percentChangeNotes } = await getNoteCount()
  const snippets  = await getSnippets()
  const notes = await getNote()
  const languageData = await getSnippetLanguageStats()

  return (
    <DashboardClient
      snippetCount={snippetCount}
      percentChangeSnippets={percentChangeSnippets}
      noteCount={noteCount}
      percentChangeNotes={percentChangeNotes}
      snippets={snippets}
      notes={notes}
      languageData={languageData}
    />
  )
}
