export type SearchBarProps = {
  searchVal: string
  setSearchVal: (val: string) => void
  setSortOrder: (order: 'newest' | 'oldest') => void
  placeholder: string
}

export type SnippetSearchBarProps = SearchBarProps & {
  languages: {label: string; value: string}[]
  setSelectedLanguage: (lang: string | null) => void
}
