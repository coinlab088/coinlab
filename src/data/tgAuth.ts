export type TgAuthScreenName = 'tg-connect' | 'tg-link' | 'tg-success'

export const tgAuthCopy = {
  connectTitle: 'Telegram 授权',
  linkTitle: '关联账户',
  successTitle: '授权成功',
  botName: 'CoinLab Bot',
  botHandle: '@CoinLabOfficial',
  permissions: [
    '读取您的 Telegram 用户名与头像',
    '获取 Telegram 用户 ID 用于账户关联',
    '接收交易与充提通知（可选）',
  ],
  authorize: '授权并继续',
  linkExisting: '关联已有 CoinLab 账户',
  createNew: '使用 Telegram 新建账户',
  linkedHint: '将 Telegram 与 CoinLab 账户绑定后，可在小程序内免密登录。',
} as const

export interface TgUserPreview {
  id: number
  username: string
  firstName: string
  photoUrl?: string
}

export const mockTgUser: TgUserPreview = {
  id: 884729103,
  username: 'crypto_trader',
  firstName: 'Alex',
}
