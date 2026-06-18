import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function SecurityEmailPage() {
  const { user, navigateAccount } = usePrototype()

  function handleBack() {
    navigateAccount({ screen: 'security' })
  }

  return (
    <SubPageLayout title="邮箱" onBack={handleBack}>
      <div className="rounded-lg border border-border-subtle bg-elevated px-4 py-5">
        <p className="text-caption text-secondary">当前绑定邮箱</p>
        <p className="mt-1 text-body font-medium text-primary">{user.email}</p>
        <p className="mt-3 text-body-sm text-secondary">
          邮箱用于登录、找回密码及安全验证，修改需通过原邮箱验证。
        </p>
      </div>

      <button
        type="button"
        className="mt-6 h-11 w-full rounded-md border border-border text-body-sm font-medium text-primary active:bg-elevated"
      >
        修改邮箱
      </button>

      <p className="mt-4 text-center text-caption text-primary-muted">
        原型提示：修改邮箱流程一期仅展示入口
      </p>
    </SubPageLayout>
  )
}
