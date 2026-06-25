import { usePrototype } from './context/PrototypeContext'
import { DepositAddressPage } from './pages/wallet/DepositAddressPage'
import { DepositFetchingPage } from './pages/wallet/DepositFetchingPage'
import { DepositPage } from './pages/wallet/DepositPage'
import { WithdrawPage } from './pages/wallet/WithdrawPage'
import { WithdrawSuccessPage } from './pages/wallet/WithdrawSuccessPage'
import { WithdrawVerifyPage } from './pages/wallet/WithdrawVerifyPage'

export function WalletRouter() {
  const { walletScreen } = usePrototype()

  if (!walletScreen) return null

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
