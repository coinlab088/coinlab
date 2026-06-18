import { useState } from 'react'
import { AuthButton } from '../../components/auth/AuthButton'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { TextField } from '../../components/auth/TextField'
import { authCopy, isValidPassword } from '../../data/auth'
import { usePrototype } from '../../context/PrototypeContext'

interface SetPasswordPageProps {
  email: string
}

export function SetPasswordPage({ email }: SetPasswordPageProps) {
  const { setAuthScreen } = usePrototype()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({})

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next: typeof errors = {}

    if (!isValidPassword(password)) {
      next.password = '密码至少 8 位'
    }
    if (password !== confirm) {
      next.confirm = '两次输入的密码不一致'
    }

    setErrors(next)
    if (Object.keys(next).length > 0) return

    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setAuthScreen({
        screen: 'security-verify',
        email,
        flow: 'register',
      })
    }, 400)
  }

  return (
    <AuthLayout
      title={authCopy.passwordTitle}
      onBack={() => setAuthScreen({ screen: 'register-verify', email })}
    >
      <p className="mb-6 text-body-sm text-secondary">
        为 <span className="text-primary">{email}</span> 设置登录密码
      </p>

      <form onSubmit={handleSubmit}>
        <TextField
          label="密码"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="至少 8 位"
          error={errors.password}
          autoComplete="new-password"
        />
        <TextField
          label="确认密码"
          type="password"
          value={confirm}
          onChange={setConfirm}
          placeholder="再次输入密码"
          error={errors.confirm}
          autoComplete="new-password"
        />

        <AuthButton type="submit" loading={loading}>
          完成注册
        </AuthButton>
      </form>
    </AuthLayout>
  )
}
