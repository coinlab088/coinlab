import type { WalletChain } from './wallet'

export type FundRecordType = 'deposit' | 'withdraw'
export type FundRecordStatus = 'pending' | 'completed' | 'failed'

export type RecordsScreenName =
  | 'fund'
  | 'fund-detail'
  | 'orders'
  | 'order-detail'

export interface RecordsScreenState {
  screen: RecordsScreenName
  fundId?: string
  orderId?: string
}

export interface FundRecord {
  id: string
  type: FundRecordType
  coin: string
  chain: WalletChain
  amount: number
  fee: number
  status: FundRecordStatus
  address: string
  txHash: string
  createdAt: number
}

export const recordsCopy = {
  fundTitle: '充提记录',
  fundDetailTitle: '流水详情',
  ordersTitle: '订单明细',
  orderDetailTitle: '订单详情',
} as const

export const mockFundRecords: FundRecord[] = [
  {
    id: 'fund-001',
    type: 'deposit',
    coin: 'USDT',
    chain: 'TRC20',
    amount: 500,
    fee: 0,
    status: 'completed',
    address: 'TXk3yP9n8vL2mR4qW6sH1jF5cD7bA9eG0x',
    txHash: '0xa1b2c3d4e5f6789012345678901234567890abcd',
    createdAt: Date.now() - 86_400_000 * 2,
  },
  {
    id: 'fund-002',
    type: 'deposit',
    coin: 'BNB',
    chain: 'BSC',
    amount: 2.5,
    fee: 0,
    status: 'completed',
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1',
    txHash: '0xb2c3d4e5f6789012345678901234567890abcdef12',
    createdAt: Date.now() - 86_400_000 * 5,
  },
  {
    id: 'fund-003',
    type: 'withdraw',
    coin: 'USDT',
    chain: 'BSC',
    amount: 120,
    fee: 1,
    status: 'completed',
    address: '0x8f3A2b1c9d4e5f6789012345678901234567890ab',
    txHash: '0xc3d4e5f6789012345678901234567890abcdef1234',
    createdAt: Date.now() - 86_400_000 * 8,
  },
  {
    id: 'fund-004',
    type: 'withdraw',
    coin: 'TRX',
    chain: 'TRC20',
    amount: 2000,
    fee: 1,
    status: 'pending',
    address: 'TXk9yP1n8vL2mR4qW6sH1jF5cD7bA9eG0y',
    txHash: '—',
    createdAt: Date.now() - 3_600_000,
  },
]

export function formatRecordTime(ts: number): string {
  return new Date(ts).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getFundStatusLabel(status: FundRecordStatus): string {
  switch (status) {
    case 'completed':
      return '已完成'
    case 'pending':
      return '处理中'
    default:
      return '失败'
  }
}

export function getFundTypeLabel(type: FundRecordType): string {
  return type === 'deposit' ? '充币' : '提币'
}

export function getFundRecord(id: string, records: FundRecord[]): FundRecord | undefined {
  return records.find((r) => r.id === id)
}
