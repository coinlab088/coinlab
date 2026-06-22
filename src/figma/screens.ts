import type { PendingOrder } from '../data/trade'
import type { FigmaScreenEntry } from './types'

const app = (preset: FigmaScreenEntry['preset']) => ({
  previewPlatform: 'app' as const,
  ...preset,
})

const mockBuyOrder: PendingOrder = {
  pairId: 'btc',
  base: 'BTC',
  quote: 'USDT',
  side: 'buy',
  type: 'limit',
  price: 67_842.5,
  amount: 0.01,
  total: 678.425,
  fee: 0.678425,
}

const pageScreens: FigmaScreenEntry[] = [
  {
    path: 'market/guest',
    label: '行情 · 游客',
    description: '黄黑 · 默认首页',
    group: 'page',
    preset: app({ isLoggedIn: false, activeTab: 'market', appTheme: 'yellow-black' }),
  },
  {
    path: 'market/guest/green-white',
    label: '行情 · 游客 · 绿白',
    group: 'page',
    preset: app({ isLoggedIn: false, activeTab: 'market', appTheme: 'green-white' }),
  },
  {
    path: 'market/guest/green-black',
    label: '行情 · 游客 · 绿黑',
    group: 'page',
    preset: app({ isLoggedIn: false, activeTab: 'market', appTheme: 'green-black' }),
  },
  {
    path: 'market/logged-in',
    label: '行情 · 已登录',
    group: 'page',
    preset: app({ isLoggedIn: true, activeTab: 'market', appTheme: 'yellow-black' }),
  },
  {
    path: 'trade',
    label: '交易',
    group: 'page',
    preset: app({ isLoggedIn: true, activeTab: 'trade', appTheme: 'yellow-black' }),
  },
  {
    path: 'assets/guest',
    label: '资产 · 游客',
    group: 'page',
    preset: app({ isLoggedIn: false, activeTab: 'assets', appTheme: 'yellow-black' }),
  },
  {
    path: 'assets/logged-in',
    label: '资产 · 已登录',
    group: 'page',
    preset: app({ isLoggedIn: true, activeTab: 'assets', appTheme: 'yellow-black' }),
  },
  {
    path: 'auth/login',
    label: '登录',
    group: 'page',
    preset: app({
      isLoggedIn: false,
      activeTab: 'market',
      authScreen: { screen: 'login' },
    }),
  },
  {
    path: 'auth/register',
    label: '注册',
    group: 'page',
    preset: app({
      isLoggedIn: false,
      activeTab: 'market',
      authScreen: { screen: 'register' },
    }),
  },
  {
    path: 'wallet/deposit',
    label: '充值',
    group: 'page',
    preset: app({
      isLoggedIn: true,
      activeTab: 'assets',
      walletScreen: { screen: 'deposit' },
    }),
  },
  {
    path: 'wallet/deposit-address',
    label: '充值地址',
    group: 'page',
    preset: app({
      isLoggedIn: true,
      activeTab: 'assets',
      walletScreen: { screen: 'deposit-address', coin: 'USDT', chain: 'TRC20' },
    }),
  },
  {
    path: 'wallet/withdraw',
    label: '提现',
    group: 'page',
    preset: app({
      isLoggedIn: true,
      activeTab: 'assets',
      walletScreen: { screen: 'withdraw' },
    }),
  },
  {
    path: 'chart/kline',
    label: 'K 线',
    group: 'page',
    preset: app({
      isLoggedIn: true,
      activeTab: 'trade',
      chartScreen: { pairId: 'btc' },
    }),
  },
]

const overlayScreens: FigmaScreenEntry[] = [
  {
    path: 'overlay/sheet-language',
    label: 'Bottom Sheet · 语言',
    description: '设置选择器',
    group: 'overlay',
    preset: app({
      isLoggedIn: true,
      activeTab: 'market',
      activeSheet: 'language',
    }),
  },
  {
    path: 'overlay/sheet-fiat',
    label: 'Bottom Sheet · 法币',
    description: '设置选择器',
    group: 'overlay',
    preset: app({
      isLoggedIn: true,
      activeTab: 'market',
      activeSheet: 'fiat',
    }),
  },
  {
    path: 'overlay/sheet-pair-picker',
    label: 'Bottom Sheet · 交易对',
    description: '列表选择',
    group: 'overlay',
    preset: app({
      isLoggedIn: true,
      activeTab: 'trade',
      tradeSheet: 'pair-picker',
    }),
  },
  {
    path: 'overlay/sheet-order-confirm',
    label: 'Bottom Sheet · 下单确认',
    description: '确认单 + 买卖 CTA',
    group: 'overlay',
    preset: app({
      isLoggedIn: true,
      activeTab: 'trade',
      tradeSheet: 'confirm',
      pendingOrder: mockBuyOrder,
    }),
  },
  {
    path: 'overlay/sheet-add-favorite',
    label: 'Bottom Sheet · 添加自选',
    description: '列表选择',
    group: 'overlay',
    preset: app({
      isLoggedIn: true,
      activeTab: 'market',
      tradeSheet: 'add-favorite',
    }),
  },
  {
    path: 'overlay/alert-compliance',
    label: 'Alert Dialog · 地区限制',
    description: '合规阻断，不可点遮罩关闭',
    group: 'overlay',
    preset: app({
      isLoggedIn: true,
      activeTab: 'trade',
      showComplianceRestriction: true,
    }),
  },
  {
    path: 'overlay/toast-success',
    label: 'Toast · 成功',
    description: '3s 自动消失',
    group: 'overlay',
    preset: app({
      isLoggedIn: true,
      activeTab: 'market',
      figmaToast: { variant: 'success', message: '已复制 UID' },
    }),
  },
  {
    path: 'overlay/toast-error',
    label: 'Toast · 错误',
    description: '5s，可手动关闭',
    group: 'overlay',
    preset: app({
      isLoggedIn: true,
      activeTab: 'market',
      figmaToast: { variant: 'error', message: '下单失败，请检查网络后重试' },
    }),
  },
  {
    path: 'overlay/toast-warning',
    label: 'Toast · 警告',
    description: '4s，可手动关闭',
    group: 'overlay',
    preset: app({
      isLoggedIn: true,
      activeTab: 'trade',
      figmaToast: { variant: 'warning', message: '滑点较大，请确认价格后下单' },
    }),
  },
  {
    path: 'overlay/toast-info',
    label: 'Toast · 提示',
    description: '3s 自动消失',
    group: 'overlay',
    preset: app({
      isLoggedIn: true,
      activeTab: 'market',
      figmaToast: { variant: 'info', message: '行情数据每 3 秒更新' },
    }),
  },
]

/** @deprecated 使用 overlay/alert-compliance */
const legacyScreens: FigmaScreenEntry[] = [
  {
    path: 'compliance/restriction',
    label: '地区限制弹窗（旧路径）',
    group: 'overlay',
    preset: app({
      isLoggedIn: true,
      activeTab: 'trade',
      showComplianceRestriction: true,
    }),
  },
]

export const figmaScreens: FigmaScreenEntry[] = [
  ...pageScreens,
  ...overlayScreens,
  ...legacyScreens,
]

export const figmaScreenGroups = [
  { id: 'page' as const, title: '页面' },
  { id: 'overlay' as const, title: 'Toast / 弹窗 / Bottom Sheet' },
]

const screenByPath = new Map(figmaScreens.map((s) => [s.path, s]))

export function getFigmaScreen(path: string): FigmaScreenEntry | undefined {
  return screenByPath.get(path.replace(/^\/+|\/+$/g, ''))
}
