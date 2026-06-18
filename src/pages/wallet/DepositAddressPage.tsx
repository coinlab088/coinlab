import { depositWarnings, getDepositAddress, walletCopy } from '../../data/wallet'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'
import { Annotatable } from '../../components/inspect/Annotatable'
import { CopyField } from '../../components/common/CopyButton'

export function DepositAddressPage() {
  const { walletScreen, navigateWallet, closeWallet } = usePrototype()

  const coin = walletScreen?.coin ?? 'USDT'
  const chain = walletScreen?.chain ?? 'BSC'
  const address = getDepositAddress(coin, chain)

  function handleBack() {
    closeWallet()
  }

  function handleSwitchCoin() {
    navigateWallet({ screen: 'deposit', coin, chain })
  }

  return (
    <SubPageLayout title={walletCopy.depositAddressTitle} onBack={handleBack}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-body font-semibold text-primary">{coin}</p>
          <p className="text-caption text-secondary">{chain} 网络</p>
        </div>
        <button
          type="button"
          onClick={handleSwitchCoin}
          className="rounded-full border border-border px-2.5 py-1 text-caption font-medium text-brand"
        >
          切换币种
        </button>
      </div>

      <div className="mb-4 flex justify-center">
        <div className="flex h-40 w-40 items-center justify-center rounded-lg border border-dashed border-border bg-sunken text-caption text-secondary">
          二维码占位
        </div>
      </div>

      <Annotatable id="deposit-address">
        <CopyField label="充币地址" value={address} />
      </Annotatable>

      <ul className="mt-4 space-y-2">
        {depositWarnings.map((tip) => (
          <li key={tip} className="text-caption leading-relaxed text-secondary">
            · {tip}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-center text-caption text-primary-muted">
        最小充币：{coin === 'USDT' ? '10 USDT' : coin === 'BNB' ? '0.01 BNB' : '20 TRX'}
      </p>
    </SubPageLayout>
  )
}
