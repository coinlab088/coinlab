import { useEffect, useRef } from 'react'
import { ChevronRight } from 'lucide-react'
import { usePrototype } from '../../context/PrototypeContext'
import { coinBalances, formatBalance, formatUsd, portfolioSummary } from '../../data/mock'
import type { WalletCoin } from '../../data/wallet'
import { PcAppLayout } from '../../components/pc/PcAppLayout'
import { BalanceHero } from '../../components/BalanceHero'
import { CoinAvatar } from '../../components/CoinAvatar'

const coinToWallet: Record<string, WalletCoin> = {
  USDT: 'USDT',
  BNB: 'BNB',
  TRX: 'TRX',
}

export function PcAssetsPage() {
  const {
    user,
    openAuth,
    openWallet,
    openFundHistory,
    openOrderHistory,
  } = usePrototype()
  const autoOpened = useRef(false)

  useEffect(() => {
    if (!user.isLoggedIn && !autoOpened.current) {
      autoOpened.current = true
      openAuth()
    }
  }, [user.isLoggedIn, openAuth])

  if (!user.isLoggedIn) {
    return (
      <PcAppLayout>
        <div className="flex h-full items-center justify-center p-6 text-secondary">
          请先登录查看资产
        </div>
      </PcAppLayout>
    )
  }

  return (
    <PcAppLayout>
      <div className="space-y-6 p-6">
        <BalanceHero portfolio={portfolioSummary} user={user} />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => openWallet('deposit')}
            className="h-10 rounded-md bg-brand px-6 text-body-sm font-semibold text-brand-dark hover:bg-brand-hover"
          >
            充币
          </button>
          <button
            type="button"
            onClick={() => openWallet('withdraw')}
            className="h-10 rounded-md border border-border px-6 text-body-sm font-medium text-primary hover:bg-elevated"
          >
            提币
          </button>
        </div>

        <div className="grid max-w-md grid-cols-2 gap-3">
          <RecordLink label="充提记录" onClick={openFundHistory} />
          <RecordLink label="订单明细" onClick={openOrderHistory} />
        </div>

        <div className="overflow-hidden rounded-xl border border-border-subtle bg-elevated">
          <table className="w-full text-left text-body-sm">
            <thead>
              <tr className="border-b border-border-subtle text-caption text-secondary">
                <th className="px-5 py-3 font-medium">资产</th>
                <th className="px-5 py-3 font-medium">网络</th>
                <th className="px-5 py-3 font-medium text-right">余额</th>
                <th className="px-5 py-3 font-medium text-right">估值 (USD)</th>
                <th className="px-5 py-3 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {coinBalances.map((coin) => {
                const walletCoin = coinToWallet[coin.symbol]
                return (
                  <tr key={coin.id} className="hover:bg-sunken/50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <CoinAvatar symbol={coin.symbol} size={32} />
                        <span className="font-medium text-primary">{coin.symbol}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-secondary">{coin.chain}</td>
                    <td className="px-5 py-4 text-right tabular-nums text-primary">
                      {formatBalance(coin.balance, coin.symbol)}
                    </td>
                    <td className="px-5 py-4 text-right tabular-nums text-secondary">
                      ${formatUsd(coin.usdValue)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      {walletCoin && (
                        <div className="flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => openWallet('deposit', { coin: walletCoin })}
                            className="text-caption text-brand hover:underline"
                          >
                            充币
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              openWallet('withdraw', { coin: walletCoin })
                            }
                            className="text-caption text-secondary hover:underline"
                          >
                            提币
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PcAppLayout>
  )
}

function RecordLink({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between rounded-lg border border-border-subtle bg-elevated px-4 py-3 text-left hover:border-brand/30"
    >
      <span className="text-body-sm text-primary">{label}</span>
      <ChevronRight className="h-4 w-4 text-secondary" />
    </button>
  )
}
