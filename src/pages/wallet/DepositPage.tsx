import { useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { CoinAvatar } from '../../components/CoinAvatar'
import {
  getDepositNetworksForCoin,
  walletAssets,
  type WalletCoin,
  type WalletNetwork,
} from '../../data/wallet'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'
import { BottomSheet } from '../../components/sheets/BottomSheet'

export function DepositPage() {
  const { walletScreen, closeWallet, navigateWallet, isDepositActivated } =
    usePrototype()
  const [coin, setCoin] = useState<WalletCoin>(walletScreen?.coin ?? 'USDT')
  const networks = getDepositNetworksForCoin(coin)
  const [chain, setChain] = useState<WalletNetwork>(
    walletScreen?.chain ?? networks[0]?.id ?? 'TRC20',
  )
  const [networkSheetOpen, setNetworkSheetOpen] = useState(false)

  const selectedNetwork = networks.find((item) => item.id === chain)

  function handleCoinChange(next: WalletCoin) {
    setCoin(next)
    const nextNetworks = getDepositNetworksForCoin(next)
    setChain(nextNetworks[0]?.id ?? 'TRC20')
  }

  function handleNetworkSelect(next: WalletNetwork) {
    setChain(next)
    setNetworkSheetOpen(false)
    if (isDepositActivated(coin, next)) {
      navigateWallet({ screen: 'deposit-address', coin, chain: next })
      return
    }
    navigateWallet({ screen: 'deposit-fetching', coin, chain: next })
  }

  return (
    <SubPageLayout title={`充值 ${coin}`} onBack={closeWallet}>
      {walletScreen?.coin == null && (
        <>
          <p className="mb-2 text-caption text-secondary">币种</p>
          <div className="mb-5 grid grid-cols-3 gap-2">
            {walletAssets.map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => handleCoinChange(asset.symbol)}
                className={`flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 ${
                  coin === asset.symbol
                    ? 'border-brand bg-brand-muted'
                    : 'border-border-subtle bg-elevated'
                }`}
              >
                <CoinAvatar symbol={asset.symbol} size={28} />
                <span className="text-caption font-medium text-primary">
                  {asset.symbol}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      <button
        type="button"
        onClick={() => setNetworkSheetOpen(true)}
        className="flex w-full items-center justify-between rounded-lg border border-border-subtle bg-elevated px-4 py-3.5 text-left active:bg-sunken"
      >
        <div>
          <p className="text-caption text-secondary">网络</p>
          <p className="mt-0.5 text-body font-medium text-primary">
            {selectedNetwork?.label ?? '选择网络'}
          </p>
        </div>
        <ArrowLeftRight className="h-5 w-5 shrink-0 text-secondary" strokeWidth={1.5} />
      </button>

      <BottomSheet
        title="选择网络"
        open={networkSheetOpen}
        onClose={() => setNetworkSheetOpen(false)}
      >
        <div className="max-h-[60vh] space-y-2 overflow-y-auto">
          {networks.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNetworkSelect(item.id)}
              className={`w-full rounded-lg border px-4 py-3 text-left active:opacity-80 ${
                chain === item.id
                  ? 'border-brand bg-brand-muted'
                  : 'border-border-subtle bg-sunken'
              }`}
            >
              <p className="text-body-sm font-medium text-primary">{item.label}</p>
              <p className="mt-1 text-caption leading-relaxed text-secondary">
                {item.blockConfirmations} 次区块确认 · 最小充值 {item.minDeposit} ·
                到账时间 ≈ {item.arrivalMinutes} 分钟
              </p>
            </button>
          ))}
        </div>
      </BottomSheet>
    </SubPageLayout>
  )
}
