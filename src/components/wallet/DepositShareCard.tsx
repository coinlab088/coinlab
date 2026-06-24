import { CoinAvatar } from '../CoinAvatar'
import { CoinNovaLogo } from '../CoinNovaLogo'
import type { WalletCoin } from '../../data/wallet'

interface DepositShareCardProps {
  coin: WalletCoin
  address: string
  networkLabel: string
  minDeposit: string
  seed?: string
}

export function DepositShareCard({
  coin,
  address,
  networkLabel,
  minDeposit,
  seed = '',
}: DepositShareCardProps) {
  const minDepositValue = minDeposit.replace(/\s+(USDT|BNB|TRX)$/i, '')

  return (
    <div
      className="w-full max-w-[320px] rounded-2xl bg-white px-6 pb-5 pt-6 text-[#0A0A0A] shadow-lg"
      data-share-card
    >
      <h2 className="text-center text-[17px] font-semibold leading-snug tracking-tight">
        充值 {coin} 到 CoinNova
      </h2>

      <div className="my-6 flex justify-center">
        <DepositQrCode coin={coin} seed={`${seed}${address}`} size={168} />
      </div>

      <dl className="space-y-3 text-[13px] leading-relaxed">
        <ShareRow label="地址" value={address} multiline />
        <ShareRow label="网络" value={networkLabel} />
        <ShareRow label="最小充值" value={minDepositValue} />
      </dl>

      <p className="mt-4 text-left text-[11px] leading-relaxed text-[#737373]">
        * 请勿向上述地址充值除 {coin} 以外的资产
      </p>

      <div className="mt-5 border-t border-[#E4E4E7] pt-4">
        <div className="flex items-center justify-center gap-2">
          <CoinNovaLogo size={28} variant="white-bg" />
          <span className="text-[15px] font-semibold tracking-tight">CoinNova</span>
        </div>
      </div>
    </div>
  )
}

function ShareRow({
  label,
  value,
  multiline,
}: {
  label: string
  value: string
  multiline?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 text-[#71717A]">{label}</dt>
      <dd
        className={`min-w-0 text-right font-medium text-[#0A0A0A] ${
          multiline ? 'max-w-[196px] break-all' : ''
        }`}
      >
        {value}
      </dd>
    </div>
  )
}

function DepositQrCode({
  coin,
  seed,
  size,
}: {
  coin: WalletCoin
  seed: string
  size: number
}) {
  const grid = 9
  const cells = grid * grid

  return (
    <div
      className="relative flex items-center justify-center bg-white"
      style={{ width: size, height: size }}
    >
      <div
        className="grid gap-[2px]"
        style={{
          width: size - 16,
          height: size - 16,
          gridTemplateColumns: `repeat(${grid}, 1fr)`,
        }}
      >
        {Array.from({ length: cells }).map((_, i) => {
          const filled = (i + seed.length + coin.charCodeAt(0)) % 3 !== 0
          return (
            <span
              key={i}
              className={`block rounded-[1px] ${filled ? 'bg-[#0A0A0A]' : 'bg-transparent'}`}
            />
          )
        })}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full bg-white p-1">
          <CoinAvatar symbol={coin} size={36} />
        </div>
      </div>
    </div>
  )
}
