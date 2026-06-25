import { useState } from 'react'
import { AuthButton } from '../../components/auth/AuthButton'
import { AuthPageShell } from '../../components/auth/AuthPageShell'
import { OtpField } from '../../components/auth/OtpField'
import { authCopy, isValidOtp } from '../../data/auth'
import { usePrototype } from '../../context/PrototypeContext'

interface VerifyCodePageProps {
  email: string
  purpose: 'login' | 'register'
  loginMethod?: 'password' | 'code'
  inviteCode?: string
}

export function VerifyCodePage({
  email,
  purpose,
  loginMethod,
  inviteCode,
}: VerifyCodePageProps) {
  const { setAuthScreen } = usePrototype()
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [countdown, setCountdown] = useState(0)

  const isEmail2fa = purpose === 'login' && loginMethod === 'password'
  const title = isEmail2fa ? authCopy.email2faTitle : authCopy.verifyTitle

  function handleBack() {
    if (purpose === 'login') {
      setAuthScreen({ screen: 'login' })
    } else {
      setAuthScreen({ screen: 'register', inviteCode })
    }
  }

  function handleResend() {
    if (countdown > 0) return
    setCountdown(60)
    const timer = window.setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          window.clearInterval(timer)
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValidOtp(otp)) {
      setError('请输入 6 位数字验证码')
      return
    }
    setError(undefined)
    setLoading(true)

    window.setTimeout(() => {
      setLoading(false)
      if (purpose === 'login') {
        setAuthScreen({
          screen: 'security-verify',
          email,
          flow: 'login',
        })
      } else {
        setAuthScreen({ screen: 'register-password', email, inviteCode })
      }
    }, 400)
  }

  return (
    <AuthPageShell title={title} onBack={handleBack}>
      {isEmail2fa ? (
        <>
          <p className="mb-2 text-body-sm text-secondary">{authCopy.email2faHint}</p>
          <p className="mb-6 text-body-sm text-secondary">
            {authCopy.email2faSent(email)}
          </p>
        </>
      ) : (
        <>
          <p className="mb-2 text-body-sm text-secondary">{authCopy.emailSent(email)}</p>
          {inviteCode ? (
            <p className="mb-6 text-caption text-brand">已绑定邀请码：{inviteCode}</p>
          ) : (
            <p className="mb-6 text-caption text-primary-muted">邀请码为选填，可跳过</p>
          )}
        </>
      )}

      <form onSubmit={handleSubmit}>
        <OtpField
          label={isEmail2fa ? '邮箱验证码' : '验证码'}
          value={otp}
          onChange={setOtp}
          error={error}
        />

        <div className="mb-6 flex items-center justify-between text-body-sm">
          <span className="text-secondary">未收到邮件？</span>
          <button
            type="button"
            disabled={countdown > 0}
            onClick={handleResend}
            className="text-brand disabled:text-primary-muted active:opacity-70"
          >
            {countdown > 0 ? `${countdown}s 后重发` : '重新发送'}
          </button>
        </div>

        <AuthButton type="submit" loading={loading}>
          {purpose === 'login' ? '验证并继续' : '下一步'}
        </AuthButton>
      </form>

      {purpose === 'login' && (
        <p className="mt-4 text-center text-caption text-primary-muted">
          原型提示：任意 6 位数字即可继续
        </p>
      )}
    </AuthPageShell>
  )
}
