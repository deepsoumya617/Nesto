import { getSnippetCount, getSnippetLanguageStats, getSnippets } from '@/lib/actions/snippets'
import { getNote, getNoteCount } from '@/lib/actions/notes'
import DashboardClient from '@/components/dashboard/DashboardClient'
import { getTagFrequency } from '@/lib/actions/tags'


export default async function DashboardPage() {
  const { snippetCount, percentChangeSnippets } = await getSnippetCount()
  const { noteCount, percentChangeNotes } = await getNoteCount()
  const snippets  = await getSnippets()
  const notes = await getNote()
  const languageData = await getSnippetLanguageStats()

  // get tag frequency
  const tagFrequency = await getTagFrequency()

  return (
    <DashboardClient
      snippetCount={snippetCount}
      percentChangeSnippets={percentChangeSnippets}
      noteCount={noteCount}
      percentChangeNotes={percentChangeNotes}
      snippets={snippets}
      notes={notes}
      languageData={languageData}
      tagFrequency={tagFrequency}
    />
  )
}
