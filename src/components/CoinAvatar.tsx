import { useState } from 'react'
import { useFigmaExport } from '../hooks/useFigmaExport'
import { getCoinIconUrl } from '../utils/coinIcons'

interface CoinAvatarProps {
  symbol: string
  size?: number
}

export function CoinAvatar({ symbol, size = 28 }: CoinAvatarProps) {
  const [failed, setFailed] = useState(false)
  const figmaExport = useFigmaExport()
  const iconUrl = getCoinIconUrl(symbol)

  if (!figmaExport && iconUrl && !failed) {
    return (
      <img
        src={iconUrl}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-full bg-elevated"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-brand-muted text-caption font-semibold text-brand"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {symbol.slice(0, 1)}
    </div>
  )
}
