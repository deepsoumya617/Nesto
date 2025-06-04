import { currentUser } from '@clerk/nextjs/server'
import { format } from 'date-fns'
import { UserCard } from '@/components/UserCard'
import { SnippetStatCard } from '@/components/SnippetStatCard'
import { getSnippets } from '@/actions/snippets'
import { getNote } from '@/actions/notes'
import { NoteStatCard } from '@/components/NoteStatCard'

export default async function DashboardPage() {
  // Get the currently logged-in user from Clerk
  // handle if theres no user
  const user = await currentUser()
  if (!user) return null

  // get total no of notes from db
  const notes = await getNote()
  const totalNotes = notes.length
  const mostRecentNote = notes[0]

  // fetch info about snippets from db
  const snippets = await getSnippets()
  const totalSnippets = snippets.length

  const languageMap: Record<string, string> = {
    js: 'JavaScript',
    ts: 'TypeScript',
    py: 'Python',
    cpp: 'C++',
  }

  const allLanguages = [
    ...new Set(
      snippets.map(
        (snippet) => languageMap[snippet.language] || snippet.language
      )
    ),
  ]

  const mostRecentSnippet = snippets[0]

  // usercard information
  const userData = {
    name: `${user.firstName} ${user.lastName}`,
    email: user.emailAddresses[0].emailAddress,
    imageUrl: `${user.imageUrl}?size=128`,
    joinedAt: format(new Date(user.createdAt), 'MMMM dd, yyyy'),
  }

  return (
    <div className="mt-20">
      <UserCard user={userData} />
      <div className="mt-6 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <SnippetStatCard
            snippetCount={totalSnippets}
            languages={allLanguages}
            recentSnippetTitle={mostRecentSnippet.title}
          />
          <NoteStatCard
            noteCount={totalNotes}
            recentNoteTitle={mostRecentNote.title}
          />
        </div>
      </div>
    </div>
  )
}
