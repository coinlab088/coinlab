import { useMemo, useState } from 'react'
import { AuthButton } from '../../components/auth/AuthButton'
import { TextField } from '../../components/auth/TextField'
import { CoinAvatar } from '../../components/CoinAvatar'
import { getKycLabel } from '../../data/mock'
import {
  calcWithdrawReceive,
  getChainsForCoin,
  walletAssets,
  walletCopy,
  withdrawFees,
  type WalletChain,
  type WalletCoin,
} from '../../data/wallet'
import { formatTradeAmount, getAvailableBalance } from '../../data/trade'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function WithdrawPage() {
  const {
    user,
    walletScreen,
    spotBalances,
    closeWallet,
    navigateWallet,
    setWithdrawDraft,
    openComplianceRestriction,
  } = usePrototype()

  const [coin, setCoin] = useState<WalletCoin>(walletScreen?.coin ?? 'USDT')
  const chains = getChainsForCoin(coin)
  const [chain, setChain] = useState<WalletChain>(chains[0])
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const available = getAvailableBalance(spotBalances, coin)
  const parsedAmount = Number(amount)
  const { fee, receive } = useMemo(
    () =>
      parsedAmount > 0
        ? calcWithdrawReceive(parsedAmount, coin)
        : { fee: withdrawFees[coin], receive: 0 },
    [parsedAmount, coin],
  )

  function handleCoinChange(next: WalletCoin) {
    setCoin(next)
    setChain(getChainsForCoin(next)[0])
    setAmount('')
    setError(undefined)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (user.kycStatus !== 'verified') {
      setError('请先完成身份认证后再提币')
      return
    }

    if (!address.trim()) {
      setError('请输入提币地址')
      return
    }

    if (!parsedAmount || parsedAmount <= 0) {
      setError('请输入有效数量')
      return
    }

    if (parsedAmount > available) {
      setError(`${coin} 可用余额不足`)
      return
    }

    if (receive <= 0) {
      setError('提币数量需大于手续费')
      return
    }

    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setWithdrawDraft({
        coin,
        chain,
        address: address.trim(),
        amount: parsedAmount,
        fee,
        receive,
      })
      navigateWallet({ screen: 'withdraw-verify', coin, chain })
    }, 300)
  }

  return (
    <SubPageLayout title={walletCopy.withdrawTitle} onBack={closeWallet}>
      {user.kycStatus !== 'verified' && (
        <div className="mb-4 rounded-lg border border-brand/30 bg-brand-muted px-3 py-2.5 text-caption text-secondary">
          身份认证：{getKycLabel(user.kycStatus)}。完成 KYC 后可提币。
        </div>
      )}

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
      <div className="mb-4 flex flex-wrap gap-2">
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

      <form onSubmit={handleSubmit}>
        <TextField
          label="提币地址"
          value={address}
          onChange={setAddress}
          placeholder={`请输入 ${chain} 地址`}
        />
        <TextField
          label="数量"
          value={amount}
          onChange={(v) => {
            setAmount(v)
            setError(undefined)
          }}
          placeholder="0"
        />

        <div className="mb-4 space-y-1 text-caption text-secondary">
          <div className="flex justify-between">
            <span>可用</span>
            <button
              type="button"
              onClick={() => setAmount(String(available))}
              className="tabular-nums text-brand"
            >
              {formatTradeAmount(available, coin)} {coin}
            </button>
          </div>
          <div className="flex justify-between">
            <span>网络手续费</span>
            <span className="tabular-nums text-primary">
              {formatTradeAmount(fee, coin)} {coin}
            </span>
          </div>
          <div className="flex justify-between">
            <span>实际到账</span>
            <span className="tabular-nums text-primary">
              {receive > 0
                ? `${formatTradeAmount(receive, coin)} ${coin}`
                : '—'}
            </span>
          </div>
        </div>

        {error && (
          <p className="mb-3 text-body-sm text-danger" role="alert">
            {error}
          </p>
        )}

        <AuthButton type="submit" loading={loading}>
          提币
        </AuthButton>
      </form>

      <button
        type="button"
        onClick={() => openComplianceRestriction({ module: 'withdraw' })}
        className="mt-4 w-full text-center text-caption text-secondary underline"
      >
        查看地区合规说明
      </button>
    </SubPageLayout>
  )
}
