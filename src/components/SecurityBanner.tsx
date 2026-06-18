import { AlertTriangle, Info } from 'lucide-react'
import type { SecurityNotice } from '../data/mock'

interface SecurityBannerProps {
  notice: SecurityNotice
}

export function SecurityBanner({ notice }: SecurityBannerProps) {
  const isWarning = notice.level === 'warning'

  return (
    <div
      className={`flex items-start gap-2 rounded-lg border px-3 py-2.5 ${
        isWarning
          ? 'border-brand/40 bg-brand-muted'
          : 'border-border bg-info-bg'
      }`}
      role="status"
    >
      {isWarning ? (
        <AlertTriangle
          className="mt-0.5 h-4 w-4 shrink-0 text-brand"
          strokeWidth={1.5}
          aria-hidden
        />
      ) : (
        <Info
          className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
          strokeWidth={1.5}
          aria-hidden
        />
      )}
      <p className="text-body-sm text-primary">{notice.message}</p>
    </div>
  )
}
