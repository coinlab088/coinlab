import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface SettingsGroupProps {
  title?: string
  children: ReactNode
}

export function SettingsGroup({ title, children }: SettingsGroupProps) {
  return (
    <section className="mb-5">
      {title && (
        <h2 className="mb-2 px-1 text-caption font-medium uppercase tracking-wide text-secondary">
          {title}
        </h2>
      )}
      <div className="overflow-hidden rounded-lg border border-border-subtle bg-elevated">
        {children}
      </div>
    </section>
  )
}

interface SettingsRowProps {
  label: string
  value?: string
  hint?: string
  danger?: boolean
  showChevron?: boolean
  onClick?: () => void
}

export function SettingsRow({
  label,
  value,
  hint,
  danger,
  showChevron = true,
  onClick,
}: SettingsRowProps) {
  const Tag = onClick ? 'button' : 'div'

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-3 border-b border-border-subtle px-4 py-3.5 text-left last:border-b-0 ${
        onClick ? 'active:bg-sunken' : ''
      }`}
    >
      <div className="min-w-0">
        <p
          className={`text-body-sm ${
            danger ? 'text-danger' : 'text-primary'
          }`}
        >
          {label}
        </p>
        {hint && (
          <p className="mt-0.5 text-caption text-secondary">{hint}</p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {value && (
          <span className="max-w-[140px] truncate text-body-sm text-secondary">
            {value}
          </span>
        )}
        {showChevron && onClick && (
          <ChevronRight className="h-4 w-4 text-secondary" strokeWidth={1.5} />
        )}
      </div>
    </Tag>
  )
}

interface UserAvatarProps {
  nickname: string
  size?: number
}

export function UserAvatar({ nickname, size = 56 }: UserAvatarProps) {
  const initial = nickname.trim().charAt(0).toUpperCase() || 'U'

  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-brand-muted text-brand font-semibold"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initial}
    </span>
  )
}
