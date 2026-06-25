import { usePrototype } from './context/PrototypeContext'
import { DepositAddressPage } from './pages/wallet/DepositAddressPage'
import { DepositFetchingPage } from './pages/wallet/DepositFetchingPage'
import { DepositPage } from './pages/wallet/DepositPage'
import { PcDepositPage } from './pages/pc/PcDepositPage'
import { WithdrawPage } from './pages/wallet/WithdrawPage'
import { WithdrawSuccessPage } from './pages/wallet/WithdrawSuccessPage'
import { WithdrawVerifyPage } from './pages/wallet/WithdrawVerifyPage'

function isPcDepositScreen(screen: string, previewPlatform: string) {
  return (
    previewPlatform === 'pc' &&
    (screen === 'deposit' ||
      screen === 'deposit-fetching' ||
      screen === 'deposit-address')
  )
}

export function WalletRouter() {
  const { walletScreen, previewPlatform } = usePrototype()

  if (!walletScreen) return null

  if (isPcDepositScreen(walletScreen.screen, previewPlatform)) {
    return <PcDepositPage />
  }

  switch (walletScreen.screen) {
    case 'deposit':
      return <DepositPage />
    case 'deposit-fetching':
      return <DepositFetchingPage />
    case 'deposit-address':
      return <DepositAddressPage />
    case 'withdraw':
      return <WithdrawPage />
    case 'withdraw-verify':
      return <WithdrawVerifyPage />
    case 'withdraw-success':
      return <WithdrawSuccessPage />
    default:
      return null
  }
}
