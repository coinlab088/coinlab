import type { AccountScreenState } from '../data/account'
import type { AuthScreenState } from '../data/auth'
import type { AppTheme } from '../data/appTheme'
import type { ChartScreenState } from '../data/kline'
import type { BottomTabId } from '../data/mock'
import type { PreviewPlatform } from '../data/platform'
import type { RecordsScreenState } from '../data/records'
import type { SupportScreenState } from '../data/support'
import type { WalletScreenState } from '../data/wallet'

/** 单页 Figma 导出时的初始原型状态 */
export interface PrototypePreset {
  isLoggedIn?: boolean
  activeTab?: BottomTabId
  appTheme?: AppTheme
  previewPlatform?: PreviewPlatform
  authScreen?: AuthScreenState | null
  accountScreen?: AccountScreenState | null
  walletScreen?: WalletScreenState | null
  supportScreen?: SupportScreenState | null
  recordsScreen?: RecordsScreenState | null
  chartScreen?: ChartScreenState | null
}

export interface FigmaScreenEntry {
  path: string
  label: string
  description?: string
  preset: PrototypePreset
}
