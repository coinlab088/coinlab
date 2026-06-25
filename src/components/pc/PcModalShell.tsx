import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface PcModalShellProps {
  title: string
  onClose: () => void
  children: ReactNode
  maxWidth?: string
  hideHeader?: boolean
  scrollable?: boolean
}

export function PcModalShell({
  title,
  onClose,
  children,
  maxWidth = 'max-w-lg',
  hideHeader = false,
  scrollable = false,
}: PcModalShellProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/70" aria-hidden onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative z-10 flex w-full max-h-[90vh] flex-col ${maxWidth} rounded-2xl border border-border-subtle bg-elevated shadow-[0_24px_80px_rgba(0,0,0,0.45)]`}
      >
        {!hideHeader && (
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border-subtle px-6 py-4">
            <h3 className="text-h3 font-semibold text-primary">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sunken text-secondary hover:text-primary"
              aria-label="关闭"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        )}
        <div className={scrollable ? 'min-h-0 flex-1 overflow-y-auto px-6 py-5' : 'px-6 py-5'}>
          {children}
        </div>
      </div>
    </div>
  )
}
