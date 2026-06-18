export interface BuyCryptoGuide {
  title: string
  steps: { step: number; label: string }[]
}

export const buyCryptoGuide: BuyCryptoGuide = {
  title: '如何使用 CoinNova 购买加密货币',
  steps: [
    { step: 1, label: '注册账户' },
    { step: 2, label: '完成认证' },
    { step: 3, label: '充币' },
    { step: 4, label: '现货买入' },
  ],
}
