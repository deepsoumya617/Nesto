import { getSnippetCount } from '@/actions/snippets'
import DashboardClient from './DashboardClient'
import { getNoteCount } from '@/actions/notes'

export default async function DashboardPage() {
  const { snippetCount, percentChangeSnippets } = await getSnippetCount()
 const {noteCount, percentChangeNotes} =  await getNoteCount()
  return (
    <DashboardClient
      snippetCount={snippetCount}
      percentChangeSnippets={percentChangeSnippets}
      noteCount={noteCount}
      percentChangeNotes={percentChangeNotes}
    />
  )
}
