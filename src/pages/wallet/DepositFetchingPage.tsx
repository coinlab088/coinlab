import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { walletCopy } from '../../data/wallet'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function DepositFetchingPage() {
  const { walletScreen, activateDeposit, navigateWallet, figmaExport } = usePrototype()

  const coin = walletScreen?.coin ?? 'USDT'
  const chain = walletScreen?.chain ?? 'TRC20'

  useEffect(() => {
    if (figmaExport) return

    const timer = window.setTimeout(() => {
      activateDeposit(coin, chain)
      navigateWallet({ screen: 'deposit-address', coin, chain })
    }, 1200)

    return () => window.clearTimeout(timer)
  }, [activateDeposit, coin, chain, navigateWallet, figmaExport])

  return (
    <SubPageLayout title={walletCopy.depositFetchingTitle} hideBack>
      <div className="flex flex-col items-center py-16 text-center">
        <Loader2
          className="h-10 w-10 animate-spin text-brand"
          strokeWidth={1.5}
        />
        <p className="mt-5 text-body font-medium text-primary">正在获取充币地址</p>
        <p className="mt-2 max-w-[260px] text-body-sm text-secondary">
          首次充币需向链上申请专属地址，请稍候…
        </p>
        <p className="mt-4 text-caption text-primary-muted">
          {coin} · {chain}
        </p>
      </div>
    </SubPageLayout>
  )
}
