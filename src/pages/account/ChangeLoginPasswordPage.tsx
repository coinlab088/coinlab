import { useState } from 'react'
import { AuthButton } from '../../components/auth/AuthButton'
import { TextField } from '../../components/auth/TextField'
import { isValidPassword } from '../../data/auth'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function ChangeLoginPasswordPage() {
  const { navigateAccount } = usePrototype()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{
    current?: string
    next?: string
    confirm?: string
  }>({})

  function handleBack() {
    navigateAccount({ screen: 'security' })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nextErrors: typeof errors = {}

    if (!isValidPassword(current)) {
      nextErrors.current = '请输入当前密码'
    }
    if (!isValidPassword(next)) {
      nextErrors.next = '新密码至少 8 位'
    }
    if (next !== confirm) {
      nextErrors.confirm = '两次输入的密码不一致'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      navigateAccount({ screen: 'security' })
    }, 400)
  }

  return (
    <SubPageLayout title="修改登录密码" onBack={handleBack}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="当前密码"
          type="password"
          value={current}
          onChange={setCurrent}
          error={errors.current}
          autoComplete="current-password"
        />
        <TextField
          label="新密码"
          type="password"
          value={next}
          onChange={setNext}
          error={errors.next}
          autoComplete="new-password"
        />
        <TextField
          label="确认新密码"
          type="password"
          value={confirm}
          onChange={setConfirm}
          error={errors.confirm}
          autoComplete="new-password"
        />
        <AuthButton type="submit" loading={loading}>
          确认修改
        </AuthButton>
      </form>
    </SubPageLayout>
  )
}
