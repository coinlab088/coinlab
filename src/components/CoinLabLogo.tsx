interface CoinLabLogoProps {
  size?: number
  className?: string
  themed?: boolean
}

export function CoinLabLogo({
  size = 96,
  className = '',
  themed = false,
}: CoinLabLogoProps) {
  const bg = themed ? 'var(--color-logo-bg)' : '#0A0A0A'
  const accent = themed ? 'var(--color-logo-accent)' : '#FFCC00'
  const stroke = themed ? 'var(--color-brand-dark)' : '#0A0A0A'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="CoinLab"
      role="img"
    >
      <rect width="96" height="96" rx="22" fill={bg} />
      <circle cx="48" cy="48" r="30" fill={accent} />
      <circle cx="48" cy="48" r="24" fill={stroke} opacity="0.12" />
      <path
        d="M48 30c-9.94 0-18 8.06-18 18s8.06 18 18 18c4.2 0 8.06-1.44 11.12-3.86"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M48 36v24M42 42h8.5c2.5 0 4.5 2 4.5 4.5S53 51 50.5 51H42"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="68" cy="28" r="6" fill={accent} stroke={stroke} strokeWidth="1.5" />
      <circle cx="72" cy="68" r="4" fill={accent} stroke={stroke} strokeWidth="1.5" />
      <circle cx="26" cy="64" r="3.5" fill={accent} stroke={stroke} strokeWidth="1.5" />
    </svg>
  )
}
