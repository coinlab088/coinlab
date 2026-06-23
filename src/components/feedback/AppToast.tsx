import { useEffect } from 'react'
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { usePrototype } from '../../context/PrototypeContext'
import type { ToastVariant } from '../../data/feedback'

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
} satisfies Record<
  ToastVariant,
  { icon: typeof CheckCircle2; bar: string; iconClass: string }
>

const toastDurationMs: Record<ToastVariant, number> = {
  success: 3000,
  error: 5000,
  warning: 4000,
  info: 3000,
}

export function AppToast() {
  const { toast, dismissToast } = usePrototype()

  useEffect(() => {
    if (!toast) return

    const timer = window.setTimeout(() => {
      dismissToast()
    }, toastDurationMs[toast.variant])

    return () => window.clearTimeout(timer)
  }, [toast, dismissToast])

  if (!toast) return null

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
        className={`pointer-events-auto flex w-full max-w-[358px] items-center gap-3 rounded-md border border-border-subtle border-l-[3px] px-4 py-3 shadow-md ${style.bar}`}
      >
        <Icon className={`h-[18px] w-[18px] shrink-0 ${style.iconClass}`} strokeWidth={2} />
        <p className="flex-1 text-body-sm text-primary">{toast.message}</p>
        {showClose && (
          <button
            type="button"
            onClick={dismissToast}
            className="flex h-8 w-8 shrink-0 items-center justify-center text-secondary active:opacity-70"
            aria-label="关闭"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        )}
      </div>
    </div>
  )
}
