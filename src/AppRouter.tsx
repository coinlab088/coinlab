import { usePrototype } from './context/PrototypeContext'
import { useFigmaPcDocument } from './hooks/useFigmaPcDocument'
import { AccountRouter } from './AccountRouter'
import { AuthRouter } from './AuthRouter'
import { ChartRouter } from './ChartRouter'
import { RecordsRouter } from './RecordsRouter'
import { SupportRouter } from './SupportRouter'
import { WalletRouter } from './WalletRouter'
import { PcGoogleAuthModal } from './components/pc/PcGoogleAuthModal'
import {
  isPcAccountModalScreen,
  isPcGoogleAuthScreen,
  isPcSecuritySettingsScreen,
} from './components/pc/pcAccountModalScreens'
import { PcSecuritySettingsModal } from './components/pc/PcSecuritySettingsModal'
import { AssetsPage } from './pages/AssetsPage'
import { MarketPage } from './pages/MarketPage'
import { TradePage } from './pages/TradePage'
import { PcAssetsPage } from './pages/pc/PcAssetsPage'
import { PcHomePage } from './pages/pc/PcHomePage'
import { PcMarketPage } from './pages/pc/PcMarketPage'
import { PcTradePage } from './pages/pc/PcTradePage'

export function AppRouter() {
  const {
    activeTab,
    authScreen,
    accountScreen,
    walletScreen,
    supportScreen,
    recordsScreen,
    chartScreen,
    previewPlatform,
    closeAccount,
    navigateAccount,
  } = usePrototype()
  const pcDocument = useFigmaPcDocument()
  const pcAccountModalScreen = isPcAccountModalScreen(previewPlatform, accountScreen)
  const pcGoogleAuthScreen = isPcGoogleAuthScreen(previewPlatform, accountScreen)
  const pcSecuritySettingsScreen = isPcSecuritySettingsScreen(previewPlatform, accountScreen)

  const content = (() => {
    if (authScreen) return <AuthRouter />
    if (chartScreen) return <ChartRouter />
    if (recordsScreen) return <RecordsRouter />
    if (walletScreen) return <WalletRouter />
    if (supportScreen) return <SupportRouter />
    if (accountScreen && !pcAccountModalScreen) return <AccountRouter />

    if (previewPlatform === 'pc') {
      switch (activeTab) {
        case 'home':
          return <PcHomePage />
        case 'trade':
          return <PcTradePage />
        case 'assets':
          return <PcAssetsPage />
        case 'market':
        default:
          return <PcMarketPage />
      }
    }

    switch (activeTab) {
      case 'trade':
        return <TradePage />
      case 'assets':
        return <AssetsPage />
      case 'home':
      case 'market':
      default:
        return <MarketPage />
    }
  })()

  return (
    <>
      <div className={pcDocument ? '' : 'h-full min-h-0'}>{content}</div>
      {pcGoogleAuthScreen && (
        <PcGoogleAuthModal
          screen={accountScreen.screen}
          onClose={closeAccount}
          onNavigate={navigateAccount}
        />
      )}
      {pcSecuritySettingsScreen && (
        <PcSecuritySettingsModal screen={accountScreen.screen} onClose={closeAccount} />
      )}
    </>
  )
}
