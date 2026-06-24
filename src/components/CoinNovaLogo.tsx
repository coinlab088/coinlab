import type { AppTheme } from '../data/appTheme'

interface CoinNovaLogoProps {
  size?: number
  className?: string
  /** Pass app theme for homepage / in-app branding; omit for default yellow-black */
  theme?: AppTheme | null
  /** White tile background — for light share cards and exports */
  variant?: 'default' | 'white-bg'
}

export function CoinNovaLogo({
  size = 96,
  className = '',
  theme = null,
  variant = 'default',
}: CoinNovaLogoProps) {
  const isLight = theme === 'green-white'
  const themed = theme !== null
  const onWhiteBg = variant === 'white-bg'

  const accent = onWhiteBg ? '#FFCC00' : themed ? 'var(--color-logo-accent)' : '#FFCC00'
  const bg = onWhiteBg
    ? '#FFFFFF'
    : themed && !isLight
      ? 'var(--color-logo-bg)'
      : '#0A0A0A'
  const coreInk = onWhiteBg
    ? '#0A0A0A'
    : isLight
      ? '#ffffff'
      : themed
        ? 'var(--color-brand-dark)'
        : '#0A0A0A'
  const rayInk = onWhiteBg ? '#0A0A0A' : isLight ? accent : coreInk
  const showTile = onWhiteBg || !isLight

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="CoinNova"
      role="img"
    >
      {showTile && (
        <rect
          width="96"
          height="96"
          rx="22"
          fill={bg}
          stroke={onWhiteBg ? '#E4E4E7' : undefined}
          strokeWidth={onWhiteBg ? 1 : undefined}
        />
      )}

      <circle
        cx="48"
        cy="48"
        r="28"
        stroke={accent}
        strokeWidth="2.5"
        strokeOpacity={isLight ? 0.45 : 0.35}
      />

      <path
        d="M 70 38 A 22 22 0 0 0 58 24"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      <circle cx="48" cy="48" r="13" fill={accent} />

      <path
        d="M48 35v6M48 55v6M35 48h6M55 48h6"
        stroke={rayInk}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M39.2 39.2l4.2 4.2M52.6 52.6l4.2 4.2M56.8 39.2l-4.2 4.2M43.4 52.6l-4.2 4.2"
        stroke={rayInk}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={isLight ? 0.85 : 0.9}
      />

      <circle cx="67" cy="33" r="4.5" fill={accent} />
      {showTile && !onWhiteBg && (
        <circle
          cx="67"
          cy="33"
          r="4.5"
          fill="none"
          stroke={coreInk}
          strokeWidth="1.25"
          opacity="0.35"
        />
      )}
    </svg>
  )
}
