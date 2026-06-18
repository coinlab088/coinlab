import { useState } from 'react'
import { AuthButton } from '../../components/auth/AuthButton'
import { CoinAvatar } from '../../components/CoinAvatar'
import {
  getChainsForCoin,
  walletAssets,
  walletCopy,
  type WalletChain,
  type WalletCoin,
} from '../../data/wallet'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function DepositPage() {
  const { walletScreen, closeWallet, navigateWallet, isDepositActivated } =
    usePrototype()
  const [coin, setCoin] = useState<WalletCoin>(walletScreen?.coin ?? 'USDT')
  const chains = getChainsForCoin(coin)
  const [chain, setChain] = useState<WalletChain>(
    walletScreen?.chain ?? chains[0],
  )

  const alreadyActivated = isDepositActivated(coin, chain)

  function handleCoinChange(next: WalletCoin) {
    setCoin(next)
    const nextChains = getChainsForCoin(next)
    setChain(nextChains[0])
  }

  function handleContinue() {
    if (alreadyActivated) {
      navigateWallet({ screen: 'deposit-address', coin, chain })
      return
    }
    navigateWallet({ screen: 'deposit-fetching', coin, chain })
  }

  return (
    <SubPageLayout title={walletCopy.depositTitle} onBack={closeWallet}>
      <p className="mb-4 text-body-sm text-secondary">选择币种与网络</p>

      <p className="mb-2 text-caption text-secondary">币种</p>
      <div className="mb-4 grid grid-cols-3 gap-2">
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

      <p className="mb-2 text-caption text-secondary">网络</p>
      <div className="mb-6 flex flex-wrap gap-2">
        {chains.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setChain(item)}
            className={`rounded-full px-4 py-1.5 text-caption font-medium ${
              chain === item
                ? 'bg-brand text-brand-dark'
                : 'bg-sunken text-secondary'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <AuthButton onClick={handleContinue}>
        {alreadyActivated ? '查看充币地址' : '获取充币地址'}
      </AuthButton>
    </SubPageLayout>
  )
}
