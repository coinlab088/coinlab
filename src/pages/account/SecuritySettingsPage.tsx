import { accountCopy, maskEmail, securityItems } from '../../data/account'
import { usePrototype } from '../../context/PrototypeContext'
import { SettingsGroup, SettingsRow } from '../../components/account/SettingsList'
import { SubPageLayout } from '../../components/account/SubPageLayout'

function getSecurityValue(
  id: string,
  user: ReturnType<typeof usePrototype>['user'],
): string | undefined {
  switch (id) {
    case 'google':
      return user.googleAuthBound ? '已绑定' : '未绑定'
    case 'email':
      return maskEmail(user.email)
    case 'login-password':
      return '修改'
    case 'payment-password':
      return user.paymentPasswordSet ? '已设置' : '未设置'
    default:
      return undefined
  }
}

export function SecuritySettingsPage() {
  const { user, navigateAccount } = usePrototype()

  function handleBack() {
    navigateAccount({ screen: 'hub' })
  }

  return (
    <SubPageLayout title={accountCopy.securityTitle} onBack={handleBack}>
      <p className="mb-5 text-body-sm text-secondary">
        建议开启 Google 验证器并设置支付密码，保护您的资产安全。
      </p>

      <SettingsGroup>
        {securityItems.map((item) => (
          <SettingsRow
            key={item.id}
            label={item.label}
            value={getSecurityValue(item.id, user)}
            onClick={() => navigateAccount({ screen: item.screen })}
          />
        ))}
      </SettingsGroup>
    </SubPageLayout>
  )
}
