export type WalletCoin = 'USDT' | 'BNB' | 'TRX'
export type WalletChain = 'BSC' | 'TRC20'

export type WalletScreenName =
  | 'deposit'
  | 'deposit-fetching'
  | 'deposit-address'
  | 'withdraw'
  | 'withdraw-verify'
  | 'withdraw-success'

export interface WalletScreenState {
  screen: WalletScreenName
  coin?: WalletCoin
  chain?: WalletChain
}

export interface WithdrawDraft {
  coin: WalletCoin
  chain: WalletChain
  address: string
  amount: number
  fee: number
  receive: number
}

export interface WalletAsset {
  id: string
  symbol: WalletCoin
  chains: WalletChain[]
}

export const walletAssets: WalletAsset[] = [
  { id: 'usdt', symbol: 'USDT', chains: ['BSC', 'TRC20'] },
  { id: 'bnb', symbol: 'BNB', chains: ['BSC'] },
  { id: 'trx', symbol: 'TRX', chains: ['TRC20'] },
]

const depositAddresses: Record<string, string> = {
  'USDT-BSC': '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1',
  'USDT-TRC20': 'TXk3yP9n8vL2mR4qW6sH1jF5cD7bA9eG0x',
  'BNB-BSC': '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1',
  'TRX-TRC20': 'TXk3yP9n8vL2mR4qW6sH1jF5cD7bA9eG0x',
}

export const withdrawFees: Record<WalletCoin, number> = {
  USDT: 1,
  BNB: 0.0005,
  TRX: 1,
}

export const walletCopy = {
  depositTitle: '充币',
  depositFetchingTitle: '获取地址',
  depositAddressTitle: '充币地址',
  withdrawTitle: '提币',
  withdrawVerifyTitle: '安全验证',
  withdrawSuccessTitle: '提币申请已提交',
} as const

export function depositKey(coin: WalletCoin, chain: WalletChain): string {
  return `${coin}-${chain}`
}

export function getDepositAddress(coin: WalletCoin, chain: WalletChain): string {
  return depositAddresses[`${coin}-${chain}`] ?? ''
}

export function getChainsForCoin(coin: WalletCoin): WalletChain[] {
  return walletAssets.find((a) => a.symbol === coin)?.chains ?? []
}

export function calcWithdrawReceive(amount: number, coin: WalletCoin): {
  fee: number
  receive: number
} {
  const fee = withdrawFees[coin]
  return { fee, receive: Math.max(0, amount - fee) }
}

export const depositWarnings = [
  '请勿向上述地址充值任何非对应网络的资产，否则资产将不可找回',
  '充币到账时间取决于区块链网络确认速度',
  '最小充币金额以页面显示为准',
] as const
