import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface CopyButtonProps {
  value: string
  label?: string
  iconOnly?: boolean
  className?: string
}

export function CopyButton({
  value,
  label = '复制',
  iconOnly = false,
  className = '',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label}
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-caption font-medium text-brand active:opacity-70 ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" strokeWidth={2} />
          {!iconOnly && '已复制'}
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
          {!iconOnly && label}
        </>
      )}
    </button>
  )
}

interface CopyFieldProps {
  label: string
  value: string
}

export function CopyField({ label, value }: CopyFieldProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border-subtle bg-sunken px-3 py-2.5">
      <div className="min-w-0">
        <p className="text-[10px] text-secondary">{label}</p>
        <p className="truncate tabular-nums text-body-sm text-primary">{value}</p>
      </div>
      <CopyButton value={value} />
    </div>
  )
}
