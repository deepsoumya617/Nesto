import Link from 'next/link'
import { Button } from './ui/button'

type SnippetProps = {
  snippetCount: number
  languages: string[]
  recentSnippetTitle: string
}

export function SnippetStatCard({
  snippetCount,
  languages,
  recentSnippetTitle,
}: SnippetProps) {
  return (
    <div className="border px-6 py-4 max-w-md rounded-md bg-background tracking-wide text-[16px] mx-auto">
      <h3 className="font-semibold text-lg">Snippet Stats📊</h3>
      <div className="mt-4 text-muted-foreground">
        <p>🔢 Total Snippets: {snippetCount}</p>
        <p>📝 Languages Used: {languages.join(', ')}</p>
        <p>🧾 Most Recent: {recentSnippetTitle}</p>
      </div>
      <div>
        <Link href="/snippets/new">
          <Button size='sm'  className="mt-4 tracking-wider cursor-pointer py-5 px-4 w-full">
            + New Snippet
          </Button>
        </Link>
        <Link href="/snippets">
          <Button
            size="sm"
            className="mt-4 tracking-wider cursor-pointer py-5 px-4 w-full"
          >
            View All Snippets
          </Button>
        </Link>
      </div>
    </div>
  )
}
