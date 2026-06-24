import { AuthButton } from '../auth/AuthButton'
import { BottomSheet } from '../sheets/BottomSheet'
import { DepositShareCard } from './DepositShareCard'
import type { WalletCoin } from '../../data/wallet'

interface DepositShareSheetProps {
  open: boolean
  onClose: () => void
  coin: WalletCoin
  address: string
  networkLabel: string
  minDeposit: string
  onSave: () => void
  onShare: () => void
}

export function DepositShareSheet({
  open,
  onClose,
  coin,
  address,
  networkLabel,
  minDeposit,
  onSave,
  onShare,
}: DepositShareSheetProps) {
  return (
    <BottomSheet title="保存或分享地址" open={open} onClose={onClose}>
      <div className="flex justify-center rounded-xl bg-black/40 px-2 py-4">
        <DepositShareCard
          coin={coin}
          address={address}
          networkLabel={networkLabel}
          minDeposit={minDeposit}
        />
      </div>

      <div className="mt-4 flex gap-3">
        <AuthButton variant="secondary" onClick={onSave}>
          保存图片
        </AuthButton>
        <AuthButton onClick={onShare}>分享</AuthButton>
      </div>
    </BottomSheet>
  )
}
