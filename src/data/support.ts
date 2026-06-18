export type SupportScreenName =
  | 'help'
  | 'help-article'
  | 'support'
  | 'support-chat'

export interface SupportScreenState {
  screen: SupportScreenName
  articleId?: string
}

export interface HelpArticle {
  id: string
  title: string
  description: string
  sections: { heading?: string; body: string }[]
}

export const helpArticles: HelpArticle[] = [
  {
    id: 'agreement',
    title: '服务协议',
    description: 'CoinNova 平台服务条款与用户协议',
    sections: [
      {
        body: '欢迎使用 CoinNova。使用本平台即表示您同意遵守本服务协议的全部条款。请在使用前仔细阅读。',
      },
      {
        heading: '账户与使用',
        body: '您应确保注册信息真实有效，并妥善保管账户凭证。因个人原因导致的账户安全问题，平台将在合理范围内协助处理。',
      },
      {
        heading: '交易与资产',
        body: '数字资产价格波动较大，请您充分了解风险后参与交易。平台提供现货交易与链上充提服务，具体支持范围以页面展示为准。',
      },
    ],
  },
  {
    id: 'privacy',
    title: '隐私政策',
    description: '个人信息收集、使用与保护说明',
    sections: [
      {
        body: 'CoinNova 重视您的隐私。我们仅在提供服务所必需的范围内收集和使用您的个人信息。',
      },
      {
        heading: '信息收集',
        body: '包括但不限于邮箱、设备信息、登录日志、KYC 资料及交易记录，用于账户安全、合规审核与客户支持。',
      },
      {
        heading: '信息保护',
        body: '我们采用加密传输、访问控制等措施保护您的数据，不会在未经法律要求的情况下向第三方出售您的个人信息。',
      },
    ],
  },
  {
    id: 'faq',
    title: '常见问题',
    description: '注册、充提、交易与安全相关 FAQ',
    sections: [
      {
        heading: '如何注册？',
        body: '使用邮箱注册并完成验证即可。注册后建议绑定 Google 验证器并设置支付密码。',
      },
      {
        heading: '充币多久到账？',
        body: '到账时间取决于区块链网络确认数，通常 BSC 约 15 次确认、TRC20 约 20 次确认后入账。',
      },
      {
        heading: '提币为什么失败？',
        body: '请检查 KYC 状态、提币地址与网络是否匹配、余额是否充足，并完成安全验证。',
      },
    ],
  },
  {
    id: 'fees',
    title: '费率说明',
    description: '现货交易手续费与充提费用',
    sections: [
      {
        body: 'CoinNova 一期现货交易采用统一费率，充提费用随网络情况调整。',
      },
      {
        heading: '现货交易',
        body: '挂单与吃单手续费均为 0.1%（以 USDT 计价扣除）。',
      },
      {
        heading: '充提费用',
        body: '充币免费。提币收取链上矿工费：USDT 约 1 USDT、BNB 约 0.0005 BNB、TRX 约 1 TRX，实际以提币页展示为准。',
      },
    ],
  },
]

export const supportChannels = [
  {
    id: 'chat',
    title: '在线聊天',
    description: '7×24 小时，平均响应 < 2 分钟',
    action: '开始对话',
  },
  {
    id: 'email',
    title: '邮件支持',
    description: 'support@coinnova.app',
    action: '发送邮件',
  },
  {
    id: 'ticket',
    title: '提交工单',
    description: '复杂问题建议提交工单跟踪处理',
    action: '创建工单',
  },
] as const

export const supportFaq = [
  '如何完成身份认证？',
  '充币未到账怎么办？',
  '如何修改绑定邮箱？',
  '忘记支付密码如何处理？',
] as const

export const supportCopy = {
  helpTitle: '帮助中心',
  supportTitle: '联系客服',
  chatTitle: '在线客服',
} as const

export function getHelpArticle(id: string): HelpArticle | undefined {
  return helpArticles.find((a) => a.id === id)
}
