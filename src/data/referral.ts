export const referralSummary = {
  inviteCode: 'CN8888',
  inviteLink: 'https://coinnova.app/invite/CN8888',
  totalInvites: 128,
  qualifiedFriends: 42,
  commissionUsdt: 3684.5,
}

export const referralHighlights = [
  {
    label: '好友注册奖励',
    value: '最高 100 USDT',
    description: '好友完成注册并通过基础任务后发放',
  },
  {
    label: '交易返佣',
    value: '最高 40%',
    description: '按好友现货手续费阶梯返佣',
  },
] as const

export const referralSteps = [
  '复制专属邀请码或邀请链接分享给好友',
  '好友注册时填写邀请码（选填）并完成邮箱验证',
  '好友完成首笔交易后，系统自动结算邀请奖励',
] as const

export const referralRewardRules = [
  {
    title: '基础注册奖励',
    detail: '好友成功注册并完成密码设置后，双方各得 10 USDT 体验金。',
  },
  {
    title: '首充加码',
    detail: '好友 7 天内累计净充值 >= 100 USDT，可额外获得 20 USDT。',
  },
  {
    title: '长期返佣',
    detail: '好友 90 天内现货手续费按等级返佣，最高 40%。',
  },
] as const
