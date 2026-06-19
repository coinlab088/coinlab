import type { FigmaScreenEntry } from './types'

const app = (preset: FigmaScreenEntry['preset']) => ({
  previewPlatform: 'app' as const,
  ...preset,
})

export const figmaScreens: FigmaScreenEntry[] = [
  {
    path: 'market/guest',
    label: '行情 · 游客',
    description: '黄黑 · 默认首页',
    preset: app({ isLoggedIn: false, activeTab: 'market', appTheme: 'yellow-black' }),
  },
  {
    path: 'market/guest/green-white',
    label: '行情 · 游客 · 绿白',
    preset: app({ isLoggedIn: false, activeTab: 'market', appTheme: 'green-white' }),
  },
  {
    path: 'market/guest/green-black',
    label: '行情 · 游客 · 绿黑',
    preset: app({ isLoggedIn: false, activeTab: 'market', appTheme: 'green-black' }),
  },
  {
    path: 'market/logged-in',
    label: '行情 · 已登录',
    preset: app({ isLoggedIn: true, activeTab: 'market', appTheme: 'yellow-black' }),
  },
  {
    path: 'trade',
    label: '交易',
    preset: app({ isLoggedIn: true, activeTab: 'trade', appTheme: 'yellow-black' }),
  },
  {
    path: 'assets/guest',
    label: '资产 · 游客',
    preset: app({ isLoggedIn: false, activeTab: 'assets', appTheme: 'yellow-black' }),
  },
  {
    path: 'assets/logged-in',
    label: '资产 · 已登录',
    preset: app({ isLoggedIn: true, activeTab: 'assets', appTheme: 'yellow-black' }),
  },
  {
    path: 'auth/login',
    label: '登录',
    preset: app({
      isLoggedIn: false,
      activeTab: 'market',
      authScreen: { screen: 'login' },
    }),
  },
  {
    path: 'auth/register',
    label: '注册',
    preset: app({
      isLoggedIn: false,
      activeTab: 'market',
      authScreen: { screen: 'register' },
    }),
  },
  {
    path: 'wallet/deposit',
    label: '充值',
    preset: app({
      isLoggedIn: true,
      activeTab: 'assets',
      walletScreen: { screen: 'deposit' },
    }),
  },
  {
    path: 'wallet/deposit-address',
    label: '充值地址',
    preset: app({
      isLoggedIn: true,
      activeTab: 'assets',
      walletScreen: { screen: 'deposit-address', coin: 'USDT', chain: 'TRC20' },
    }),
  },
  {
    path: 'wallet/withdraw',
    label: '提现',
    preset: app({
      isLoggedIn: true,
      activeTab: 'assets',
      walletScreen: { screen: 'withdraw' },
    }),
  },
  {
    path: 'chart/kline',
    label: 'K 线',
    preset: app({
      isLoggedIn: true,
      activeTab: 'trade',
      chartScreen: { pairId: 'btc-usdt' },
    }),
  },
]

const screenByPath = new Map(figmaScreens.map((s) => [s.path, s]))

export function getFigmaScreen(path: string): FigmaScreenEntry | undefined {
  return screenByPath.get(path.replace(/^\/+|\/+$/g, ''))
}
