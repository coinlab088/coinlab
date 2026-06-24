import { useMemo, useState } from 'react'
import { CircleHelp, History } from 'lucide-react'
import { AuthButton } from '../../components/auth/AuthButton'
import { TextField } from '../../components/auth/TextField'
import { CoinAvatar } from '../../components/CoinAvatar'
import {
  calcWithdrawReceive,
  getWithdrawChainsForCoin,
  walletAssets,
  walletCopy,
  withdrawFees,
  type WalletCoin,
  type WalletNetwork,
} from '../../data/wallet'
import { formatTradeAmount, getAvailableBalance } from '../../data/trade'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'
import { KycStatusBanner } from '../../components/account/KycStatusBanner'

export function WithdrawPage() {
  const {
    user,
    walletScreen,
    spotBalances,
    closeWallet,
    navigateWallet,
    setWithdrawDraft,
    openFundHistory,
    openHelpCenter,
  } = usePrototype()

  const [coin, setCoin] = useState<WalletCoin>(walletScreen?.coin ?? 'USDT')
  const chains = getWithdrawChainsForCoin(coin)
  const [chain, setChain] = useState<WalletNetwork>(chains[0])
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
    setChain(getWithdrawChainsForCoin(next)[0])
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

  const headerRight = (
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        aria-label="帮助"
        onClick={openHelpCenter}
        className="flex h-9 w-9 items-center justify-center text-primary active:opacity-70"
      >
        <CircleHelp className="h-5 w-5" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        aria-label="充提记录"
        onClick={() => {
          closeWallet()
          openFundHistory()
        }}
        className="flex h-9 w-9 items-center justify-center text-primary active:opacity-70"
      >
        <History className="h-5 w-5" strokeWidth={1.5} />
      </button>
    </div>
  )

  return (
    <SubPageLayout
      title={walletCopy.withdrawTitle}
      onBack={closeWallet}
      headerRight={headerRight}
    >
      <KycStatusBanner
        status={user.kycStatus}
        scene="withdraw"
        className="mb-4"
      />

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
          placeholder="长按粘贴地址"
        />
        <TextField
          label="数量"
          value={amount}
          onChange={(v) => {
            setAmount(v)
            setError(undefined)
          }}
          placeholder="0"
          suffix={
            <button
              type="button"
              onClick={() => setAmount(String(available))}
              className="text-caption font-medium text-brand"
            >
              全部
            </button>
          }
        />

        <div className="mb-4 space-y-1 text-caption text-secondary">
          <div className="flex justify-between">
            <span>可用</span>
            <span className="tabular-nums text-brand">
              {formatTradeAmount(available, coin)} {coin}
            </span>
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
    </SubPageLayout>
  )
}
