import type { AccountScreenState } from '../data/account'
import type { AuthScreenState } from '../data/auth'
import type { AppTheme } from '../data/appTheme'
import type { ChartScreenState } from '../data/kline'
import type { BottomTabId, KycStatus } from '../data/mock'
import type { PreviewPlatform } from '../data/platform'
import type { RecordsScreenState } from '../data/records'
import type { SettingsSheet } from '../data/settings'
import type { SupportScreenState } from '../data/support'
import type { PendingOrder, SpotOrder, TradeSheet } from '../data/trade'
import type { WalletScreenState, WithdrawDraft } from '../data/wallet'

export type FigmaToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface FigmaToastPreset {
  variant: FigmaToastVariant
  message: string
}

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
  showComplianceRestriction?: boolean
  activeSheet?: SettingsSheet
  tradeSheet?: TradeSheet
  pendingOrder?: PendingOrder | null
  orders?: SpotOrder[]
  withdrawDraft?: WithdrawDraft | null
  figmaToast?: FigmaToastPreset
  /** Figma 导出：覆盖登录用户 KYC 状态 */
  userKycStatus?: KycStatus
  /** Figma 导出：覆盖是否已设置支付密码 */
  userPaymentPasswordSet?: boolean
  /** Figma 导出：资产中心叠加层 */
  accountOverlay?: 'security' | 'logout' | 'delete'
  /** Figma 导出：钱包页叠加层 */
  walletOverlay?: 'deposit-share'
  /** Figma 导出：交易页叠加层 */
  tradeOverlay?: 'order-book-depth'
  /** Figma 导出页：禁用自动跳转等原型行为 */
  figmaExport?: boolean
  /** Figma 导出：PC 固定视口（交易台）或文档高度（落地页等） */
  figmaPcViewport?: 'fixed' | 'document'
}

export type MobileFigmaScreenGroup =
  | 'tab'
  | 'auth'
  | 'account'
  | 'wallet'
  | 'records'
  | 'support'
  | 'chart'
  | 'overlay'

export type FigmaScreenGroup =
  | 'pc'
  | `app-${MobileFigmaScreenGroup}`
  | `h5-${MobileFigmaScreenGroup}`

export interface FigmaScreenEntry {
  path: string
  label: string
  description?: string
  group: FigmaScreenGroup
  preset: PrototypePreset
}
