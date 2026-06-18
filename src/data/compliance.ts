export interface ComplianceRestrictionOptions {
  /** 触发受限的功能模块标识，便于后续差异化文案或埋点 */
  module?: string
}

export const complianceCopy = {
  message:
    '由于当地法律法规限制，该服务在您所在的地区不可用。对于由此造成的不便，我们深表歉意。如需了解更多信息，请查看完整的',
  termsLabel: '条款与条件',
  back: '返回',
} as const
