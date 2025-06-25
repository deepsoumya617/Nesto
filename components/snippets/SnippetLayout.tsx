import ImportGistModal from './ImportGistModal'
import SnippetEditor from './SnippetEditor'
import SnippetSidebar from './SnippetSidebar'

export default function SnippetLayout() {
  return (
    <div className="mx-auto flex h-[calc(100vh-4.53rem)] max-w-6xl overflow-hidden md:border-x">
      <SnippetSidebar />
      <SnippetEditor />
      <ImportGistModal />
    </div>
  )
}
