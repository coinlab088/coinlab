import { CheckCircle2, Clock, ShieldAlert } from 'lucide-react'
import type { KycStatus } from '../../data/mock'
import {
  getKycBannerClassName,
  getKycBannerMessage,
} from '../../data/mock'

interface KycStatusBannerProps {
  status: KycStatus
  scene?: 'withdraw' | 'account'
  className?: string
}

export function KycStatusBanner({
  status,
  scene = 'account',
  className = '',
}: KycStatusBannerProps) {
  const Icon =
    status === 'verified'
      ? CheckCircle2
      : status === 'pending'
        ? Clock
        : ShieldAlert

  const iconClass =
    status === 'verified'
      ? 'text-success'
      : status === 'pending'
        ? 'text-brand'
        : 'text-secondary'

  return (
    <div
      className={`flex items-start gap-2 rounded-lg border px-3 py-2.5 text-caption text-secondary ${getKycBannerClassName(status)} ${className}`}
    >
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${iconClass}`} strokeWidth={1.5} />
      <p>{getKycBannerMessage(status, scene)}</p>
    </div>
  )
}

interface KycStatusBadgeProps {
  status: KycStatus
  className?: string
}

export function KycStatusBadge({ status, className = '' }: KycStatusBadgeProps) {
  if (status !== 'verified') return null

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success-bg px-2.5 py-1 text-caption font-medium text-success ${className}`}
    >
      <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
      身份认证 · 已认证
    </span>
  )
}
