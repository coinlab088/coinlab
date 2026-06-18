interface SparklineProps {
  positive: boolean
  className?: string
}

const UP_POINTS = '0,32 8,28 16,24 24,18 32,14 40,10 48,8 56,6 64,4 72,2 80,0'
const DOWN_POINTS = '0,4 8,8 16,12 24,16 32,20 40,22 48,26 56,28 64,30 72,31 80,32'

export function Sparkline({ positive, className = '' }: SparklineProps) {
  return (
    <svg
      viewBox="0 0 80 32"
      className={`h-10 w-full ${className}`}
      aria-hidden
      preserveAspectRatio="none"
    >
      <polyline
        fill="none"
        stroke={positive ? '#22C55E' : '#EF4444'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={positive ? UP_POINTS : DOWN_POINTS}
      />
    </svg>
  )
}
