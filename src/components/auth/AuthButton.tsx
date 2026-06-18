import type { ReactNode } from 'react'

interface AuthButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  loading?: boolean
}

export function AuthButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled,
  loading,
}: AuthButtonProps) {
  const isPrimary = variant === 'primary'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`h-11 w-full rounded-md text-body-sm font-semibold transition-colors duration-200 disabled:opacity-40 ${
        isPrimary
          ? 'bg-brand text-brand-dark active:bg-brand-hover'
          : 'border border-border text-primary active:bg-elevated'
      }`}
    >
      {loading ? '处理中…' : children}
    </button>
  )
}
