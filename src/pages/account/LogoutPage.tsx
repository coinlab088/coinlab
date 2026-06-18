import { AuthButton } from '../../components/auth/AuthButton'
import { accountCopy } from '../../data/account'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function LogoutPage() {
  const { logout, navigateAccount } = usePrototype()

  function handleBack() {
    navigateAccount({ screen: 'hub' })
  }

  return (
    <SubPageLayout title={accountCopy.logoutTitle} onBack={handleBack}>
      <p className="mb-8 pt-4 text-center text-body text-secondary">
        确定要退出当前账户吗？
      </p>

      <AuthButton onClick={logout}>确认退出</AuthButton>
      <div className="mt-3">
        <AuthButton variant="secondary" onClick={handleBack}>
          取消
        </AuthButton>
      </div>
    </SubPageLayout>
  )
}
