import { marked } from 'marked'
import hljs from 'highlight.js'
import DOMPurify from 'isomorphic-dompurify'

marked.use({
  async: false,
  gfm: true,
  breaks: true,
  renderer: {
    code({ text, lang }) {
      const validLang = hljs.getLanguage(lang || '') ? lang! : 'plaintext'
      const highlighted = hljs.highlight(text, { language: validLang }).value
      return `<pre><code class="hljs language-${validLang}">${highlighted}</code></pre>`
    },
  },
})

export function renderMarkdown(md: string): string {
  const raw = marked.parse(md) as string
  return DOMPurify.sanitize(raw)
}
