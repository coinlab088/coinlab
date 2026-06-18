import { usePrototype } from './context/PrototypeContext'
import { FundDetailPage } from './pages/records/FundDetailPage'
import { FundHistoryPage } from './pages/records/FundHistoryPage'
import { OrderDetailPage } from './pages/records/OrderDetailPage'
import { OrderHistoryPage } from './pages/records/OrderHistoryPage'

export function RecordsRouter() {
  const { recordsScreen } = usePrototype()

  if (!recordsScreen) return null

  switch (recordsScreen.screen) {
    case 'fund':
      return <FundHistoryPage />
    case 'fund-detail':
      return <FundDetailPage />
    case 'orders':
      return <OrderHistoryPage />
    case 'order-detail':
      return <OrderDetailPage />
    default:
      return null
  }
}
