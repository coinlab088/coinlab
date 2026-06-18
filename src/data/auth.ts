export type AuthScreenName =
  | 'entry'
  | 'login'
  | 'login-verify'
  | 'register'
  | 'register-verify'
  | 'register-password'
  | 'security-verify'
  | 'tg-connect'
  | 'tg-link'
  | 'tg-success'

export interface AuthScreenState {
  screen: AuthScreenName
  email?: string
  flow?: 'login' | 'register'
  /** 登录验证码页来源：密码登录后的邮箱二次验证 / 验证码登录主验证 */
  loginMethod?: 'password' | 'code'
}

export type LoginMode = 'password' | 'code'

export const MOCK_OTP = '123456'

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function isValidPassword(value: string): boolean {
  return value.length >= 8
}

export function isValidOtp(value: string): boolean {
  return /^\d{6}$/.test(value)
}

export const authCopy = {
  loginTitle: '登录',
  registerTitle: '注册',
  verifyTitle: '输入验证码',
  email2faTitle: '邮箱二次验证',
  passwordTitle: '设置密码',
  securityTitle: '安全验证',
  emailSent: (email: string) => `验证码已发送至 ${email}`,
  email2faHint: '账户密码已验证，请完成邮箱二次验证',
  email2faSent: (email: string) => `二次验证码已发送至 ${email}`,
  termsLabel: '我已阅读并同意《服务协议》和《隐私政策》',
} as const
