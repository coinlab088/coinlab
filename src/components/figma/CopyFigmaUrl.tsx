import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

type Props = {
  url: string
  className?: string
}

export function CopyFigmaUrl({ url, className = '' }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('复制链接', url)
    }
  }

  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="min-w-0 flex-1 break-all font-mono text-caption leading-relaxed text-brand hover:underline"
      >
        {url}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="flex h-8 shrink-0 items-center gap-1 rounded-md border border-border px-2 text-caption font-medium text-primary active:bg-elevated"
        aria-label="复制链接"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-success" />
            已复制
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            复制
          </>
        )}
      </button>
    </div>
  )
}
