interface CoinLabLogoProps {
  size?: number
  className?: string
}

export function CoinLabLogo({ size = 96, className = '' }: CoinLabLogoProps) {
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
      <rect width="96" height="96" rx="22" fill="#0A0A0A" />
      <circle cx="48" cy="48" r="30" fill="#FFCC00" />
      <circle cx="48" cy="48" r="24" fill="#0A0A0A" opacity="0.12" />
      <path
        d="M48 30c-9.94 0-18 8.06-18 18s8.06 18 18 18c4.2 0 8.06-1.44 11.12-3.86"
        stroke="#0A0A0A"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M48 36v24M42 42h8.5c2.5 0 4.5 2 4.5 4.5S53 51 50.5 51H42"
        stroke="#0A0A0A"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="68" cy="28" r="6" fill="#FFCC00" stroke="#0A0A0A" strokeWidth="1.5" />
      <circle cx="72" cy="68" r="4" fill="#FFCC00" stroke="#0A0A0A" strokeWidth="1.5" />
      <circle cx="26" cy="64" r="3.5" fill="#FFCC00" stroke="#0A0A0A" strokeWidth="1.5" />
    </svg>
  )
}
