import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function MarkdownDocViewer({ content }: { content: string }) {
  return (
    <article className="ds-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  )
}
