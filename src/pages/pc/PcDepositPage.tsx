import { useEffect, useState, type ReactNode } from 'react'
import { ChevronDown, ChevronRight, FileWarning } from 'lucide-react'
import { CoinAvatar } from '../../components/CoinAvatar'
import { CopyButton } from '../../components/common/CopyButton'
import { FigmaQrPlaceholder } from '../../components/figma/FigmaQrPlaceholder'
import { usePrototype } from '../../context/PrototypeContext'
import {
  depositWarnings,
  formatMinDepositValue,
  getDepositAddress,
  getDepositNetworkMeta,
  getDepositNetworksForCoin,
  getPcDepositNetworkLabel,
  walletAssets,
  type WalletCoin,
  type WalletNetwork,
} from '../../data/wallet'

export function PcDepositPanel() {
  const {
    walletScreen,
    isDepositActivated,
    activateDeposit,
    figmaExport,
  } = usePrototype()

  const [coin, setCoin] = useState<WalletCoin>(walletScreen?.coin ?? 'USDT')
  const networks = getDepositNetworksForCoin(coin)
  const [chain, setChain] = useState<WalletNetwork>(() => {
    if (walletScreen?.chain) return walletScreen.chain
    if ((walletScreen?.coin ?? 'USDT') === 'USDT') return 'BEP20'
    return networks[0]?.id ?? 'TRC20'
  })
  const [fetching, setFetching] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [assetOpen, setAssetOpen] = useState(false)
  const [networkOpen, setNetworkOpen] = useState(false)

  const networkMeta = getDepositNetworkMeta(coin, chain)
  const addressReady = isDepositActivated(coin, chain)
  const address = addressReady ? getDepositAddress(coin, chain) : ''

  useEffect(() => {
    if (addressReady) {
      setFetching(false)
      return
    }

    setFetching(true)
    const timer = window.setTimeout(
      () => {
        activateDeposit(coin, chain)
        setFetching(false)
      },
      figmaExport ? 0 : 600,
    )

    return () => window.clearTimeout(timer)
  }, [activateDeposit, addressReady, chain, coin, figmaExport])

  function handleCoinChange(next: WalletCoin) {
    setCoin(next)
    const nextNetworks = getDepositNetworksForCoin(next)
    setChain(nextNetworks[0]?.id ?? 'TRC20')
    setAssetOpen(false)
    setShowDetails(false)
  }

  function handleNetworkChange(next: WalletNetwork) {
    setChain(next)
    setNetworkOpen(false)
    setShowDetails(false)
  }

  const step2Done = Boolean(networkMeta)
  const step3Done = addressReady && Boolean(address)

  return (
    <div className="mx-auto max-w-[720px]">
        <div className="relative space-y-8 pl-10">
          <div className="absolute bottom-4 left-[11px] top-2 w-px bg-border-subtle" />

          <DepositStep
            step={1}
            title="选择资产"
            status="done"
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setAssetOpen((open) => !open)
                  setNetworkOpen(false)
                }}
                className="flex w-full items-center justify-between rounded-xl border border-border-subtle bg-sunken px-4 py-3.5 text-left hover:bg-elevated"
              >
                <div className="flex items-center gap-3">
                  <CoinAvatar symbol={coin} size={28} />
                  <div>
                    <p className="text-body-sm font-medium text-primary">{coin}</p>
                    <p className="text-caption text-secondary">{coin}</p>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-secondary" strokeWidth={1.5} />
              </button>

              {assetOpen && (
                <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-border-subtle bg-elevated shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
                  {walletAssets.map((asset) => (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => handleCoinChange(asset.symbol)}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-sunken ${
                        coin === asset.symbol ? 'bg-brand-muted/40' : ''
                      }`}
                    >
                      <CoinAvatar symbol={asset.symbol} size={28} />
                      <span className="text-body-sm font-medium text-primary">
                        {asset.symbol}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </DepositStep>

          <DepositStep
            step={2}
            title="选择网络"
            status={step2Done ? 'done' : 'pending'}
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNetworkOpen((open) => !open)
                  setAssetOpen(false)
                }}
                className="flex w-full items-center justify-between rounded-xl border border-border-subtle bg-sunken px-4 py-3.5 text-left hover:bg-elevated"
              >
                <div className="min-w-0">
                  <p className="text-body-sm font-medium text-primary">
                    {networkMeta ? getPcDepositNetworkLabel(networkMeta) : '选择网络'}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 shrink-0 text-secondary" strokeWidth={1.5} />
              </button>

              {networkOpen && (
                <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-border-subtle bg-elevated shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
                  {networks.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNetworkChange(item.id)}
                      className={`w-full px-4 py-3 text-left hover:bg-sunken ${
                        chain === item.id ? 'bg-brand-muted/40' : ''
                      }`}
                    >
                      <p className="text-body-sm font-medium text-primary">
                        {getPcDepositNetworkLabel(item)}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {networkMeta?.contractAddressSuffix && (
              <button
                type="button"
                className="mt-2 inline-flex items-center gap-1 text-caption text-secondary hover:text-primary"
              >
                合约地址结尾为 {networkMeta.contractAddressSuffix}
                <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            )}
          </DepositStep>

          <DepositStep
            step={3}
            title="充值地址"
            status={step3Done ? 'done' : fetching ? 'active' : 'pending'}
            action={
              <button type="button" className="text-caption text-secondary hover:text-primary">
                管理
                <ChevronRight className="ml-0.5 inline h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            }
          >
            {fetching && !step3Done ? (
              <div className="rounded-xl border border-border-subtle bg-sunken px-4 py-10 text-center text-body-sm text-secondary">
                正在获取充值地址…
              </div>
            ) : step3Done ? (
              <>
                <div className="rounded-xl border border-border-subtle bg-sunken p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex shrink-0 justify-center sm:justify-start">
                      <div className="rounded-xl bg-white p-3">
                        {figmaExport ? (
                          <FigmaQrPlaceholder size={120} />
                        ) : (
                          <DepositQrPreview seed={`${coin}-${chain}-${address}`} size={120} />
                        )}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-caption text-secondary">地址</p>
                      <div className="mt-2 flex items-start gap-2">
                        <p className="min-w-0 flex-1 break-all text-body-sm leading-relaxed text-brand">
                          {address}
                        </p>
                        <CopyButton value={address} iconOnly className="shrink-0 px-1 py-1" />
                        <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-secondary" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-body-sm">
                  <span className="text-secondary">最小充币数量</span>
                  <span className="text-primary">
                    {networkMeta ? formatMinDepositValue(networkMeta.minDeposit) : '—'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowDetails((open) => !open)}
                  className="mt-4 flex w-full items-center justify-center gap-1 text-caption text-secondary hover:text-primary"
                >
                  详情
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${showDetails ? 'rotate-180' : ''}`}
                    strokeWidth={1.5}
                  />
                </button>

                {showDetails && networkMeta && (
                  <div className="mt-3 space-y-2 rounded-xl border border-border-subtle bg-elevated px-4 py-3 text-body-sm">
                    <DetailRow
                      label="充值确认"
                      value={`${networkMeta.blockConfirmations} 次网络确认`}
                    />
                    <DetailRow
                      label="预计到账"
                      value={`约 ${networkMeta.arrivalMinutes} 分钟`}
                    />
                    <DetailRow label="提现解锁" value="与充值确认一致" />
                    <p className="pt-2 text-caption leading-relaxed text-secondary">
                      {depositWarnings[0]}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-border-subtle bg-sunken px-4 py-10 text-center text-body-sm text-secondary">
                请先选择资产与网络
              </div>
            )}
          </DepositStep>
        </div>

        <section className="mt-10 border-t border-border-subtle pt-8">
          <h3 className="text-body font-semibold text-primary">近期充币记录</h3>
          <div className="mt-8 flex flex-col items-center justify-center py-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sunken text-secondary">
              <FileWarning className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <p className="mt-4 text-body-sm text-secondary">暂无充币记录</p>
          </div>
        </section>
    </div>
  )
}

function DepositStep({
  step,
  title,
  status,
  action,
  children,
}: {
  step: number
  title: string
  status: 'done' | 'active' | 'pending'
  action?: React.ReactNode
  children: ReactNode
}) {
  return (
    <section className="relative">
      <span
        className={`absolute -left-10 top-1 flex h-5 w-5 rotate-45 items-center justify-center border text-[10px] font-semibold ${
          status === 'done'
            ? 'border-brand bg-brand text-brand-dark'
            : status === 'active'
              ? 'border-brand bg-brand text-brand-dark'
              : 'border-border-subtle bg-elevated text-secondary'
        }`}
      >
        {status === 'done' ? '✓' : step}
      </span>

      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="text-body-sm font-medium text-primary">{title}</h4>
        {action}
      </div>

      {children}
    </section>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-secondary">{label}</span>
      <span className="text-right text-primary">{value}</span>
    </div>
  )
}

function DepositQrPreview({ seed, size }: { seed: string; size: number }) {
  const cells = 11
  return (
    <div
      className="grid gap-0.5"
      style={{
        width: size,
        height: size,
        gridTemplateColumns: `repeat(${cells}, minmax(0, 1fr))`,
      }}
      aria-hidden
    >
      {Array.from({ length: cells * cells }).map((_, index) => {
        const code = seed.charCodeAt(index % seed.length) + index
        const filled = code % 3 !== 0
        return (
          <div
            key={index}
            className={filled ? 'bg-black' : 'bg-white'}
            style={{ aspectRatio: '1' }}
          />
        )
      })}
    </div>
  )
}
