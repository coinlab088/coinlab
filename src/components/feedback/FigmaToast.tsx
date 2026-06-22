import { AlertCircle, CheckCircle2, Info, X, AlertTriangle } from 'lucide-react'
import type { FigmaToastPreset } from '../../figma/types'

const toastStyles = {
  success: {
    icon: CheckCircle2,
    bar: 'border-l-success bg-success-bg',
    iconClass: 'text-success',
  },
  error: {
    icon: AlertCircle,
    bar: 'border-l-danger bg-danger-bg',
    iconClass: 'text-danger',
  },
  warning: {
    icon: AlertTriangle,
    bar: 'border-l-warning bg-warning-bg',
    iconClass: 'text-warning',
  },
  info: {
    icon: Info,
    bar: 'border-l-info bg-info-bg',
    iconClass: 'text-info',
  },
} as const

interface FigmaToastProps {
  toast: FigmaToastPreset
}

export function FigmaToast({ toast }: FigmaToastProps) {
  const style = toastStyles[toast.variant]
  const Icon = style.icon
  const showClose = toast.variant === 'error' || toast.variant === 'warning'

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-[60] flex justify-center px-4 pt-[max(12px,env(safe-area-inset-top,0px))]"
      role={toast.variant === 'error' || toast.variant === 'warning' ? 'alert' : 'status'}
      aria-live={toast.variant === 'error' ? 'assertive' : 'polite'}
    >
      <div
        className={`flex w-full max-w-[358px] items-center gap-3 rounded-md border border-border-subtle border-l-[3px] px-4 py-3 shadow-md ${style.bar}`}
      >
        <Icon className={`h-[18px] w-[18px] shrink-0 ${style.iconClass}`} strokeWidth={2} />
        <p className="flex-1 text-body-sm text-primary">{toast.message}</p>
        {showClose && (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center text-secondary">
            <X className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          </span>
        )}
      </div>
    </div>
  )
}
