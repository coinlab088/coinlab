export type SettingsSheet = 'language' | 'fiat' | null

export interface LocaleOption {
  id: string
  label: string
  short: string
}

export interface FiatOption {
  id: string
  symbol: string
  label: string
}

export interface HelpLink {
  id: string
  title: string
  description: string
}

export const locales: LocaleOption[] = [
  { id: 'zh-CN', label: '简体中文', short: '中文' },
  { id: 'zh-TW', label: '繁體中文', short: '繁中' },
  { id: 'en-US', label: 'English', short: 'EN' },
]

export const fiatCurrencies: FiatOption[] = [
  { id: 'USD', symbol: '$', label: '美元 USD' },
  { id: 'CNY', symbol: '¥', label: '人民币 CNY' },
  { id: 'EUR', symbol: '€', label: '欧元 EUR' },
  { id: 'HKD', symbol: 'HK$', label: '港币 HKD' },
]

export const helpLinks: HelpLink[] = [
  {
    id: 'agreement',
    title: '服务协议',
    description: 'CoinLab 平台服务条款与用户协议',
  },
  {
    id: 'privacy',
    title: '隐私政策',
    description: '个人信息收集、使用与保护说明',
  },
  {
    id: 'faq',
    title: '常见问题',
    description: '注册、充提、交易与安全相关 FAQ',
  },
  {
    id: 'fees',
    title: '费率说明',
    description: '现货交易手续费与充提费用',
  },
]

export const supportInfo = {
  title: '在线客服',
  hours: '7×24 小时',
  channels: [
    { id: 'chat', label: '在线聊天', hint: '平均响应 < 2 分钟' },
    { id: 'email', label: '邮件支持', hint: 'support@coinlab.app' },
  ],
} as const
