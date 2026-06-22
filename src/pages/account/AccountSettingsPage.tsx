import { accountCopy, maskEmail } from '../../data/account'
import { getKycLabel } from '../../data/mock'
import { fiatCurrencies, locales } from '../../data/settings'
import { usePrototype } from '../../context/PrototypeContext'
import {
  SettingsGroup,
  SettingsRow,
  UserAvatar,
} from '../../components/account/SettingsList'
import { SubPageLayout } from '../../components/account/SubPageLayout'
import { CopyButton } from '../../components/common/CopyButton'

export function AccountSettingsPage() {
  const {
    user,
    closeAccount,
    navigateAccount,
    locale,
    fiat,
    openSheet,
    openSupportCenter,
  } = usePrototype()

  const localeLabel =
    locales.find((item) => item.id === locale)?.label ?? locale
  const fiatLabel =
    fiatCurrencies.find((item) => item.id === fiat)?.label ?? fiat

  return (
    <SubPageLayout title={accountCopy.hubTitle} onBack={closeAccount}>
      <div className="mb-6 flex items-center gap-4 py-2">
        <UserAvatar nickname={user.nickname} />
        <div className="min-w-0">
          <p className="truncate text-h3 font-semibold text-primary">
            {user.nickname}
          </p>
          <p className="truncate text-body-sm text-secondary">
            {maskEmail(user.email)}
          </p>
          <div className="mt-0.5 flex items-center gap-1">
            <span className="text-caption text-secondary">UID {user.uid}</span>
            <CopyButton value={user.uid} label="复制 UID" iconOnly />
          </div>
        </div>
      </div>

      <SettingsGroup title="账户">
        <SettingsRow
          label="个人资料"
          onClick={() => navigateAccount({ screen: 'profile' })}
        />
        <SettingsRow
          label="身份认证"
          value={getKycLabel(user.kycStatus)}
          onClick={() => navigateAccount({ screen: 'kyc' })}
        />
      </SettingsGroup>

      <SettingsGroup title="安全">
        <SettingsRow
          label="安全设置"
          hint="Google 验证、密码与支付密码"
          onClick={() => navigateAccount({ screen: 'security' })}
        />
      </SettingsGroup>

      <SettingsGroup title="偏好">
        <SettingsRow
          label="多语言"
          value={localeLabel}
          onClick={() => openSheet('language')}
        />
        <SettingsRow
          label="法币单位"
          value={fiatLabel}
          onClick={() => openSheet('fiat')}
        />
        <SettingsRow
          label="客服"
          hint="在线聊天与邮件支持"
          onClick={openSupportCenter}
        />
      </SettingsGroup>

      <SettingsGroup>
        <SettingsRow
          label="退出登录"
          showChevron={false}
          onClick={() => navigateAccount({ screen: 'logout' })}
        />
        <SettingsRow
          label="注销账户"
          danger
          showChevron
          onClick={() => navigateAccount({ screen: 'delete' })}
        />
      </SettingsGroup>
    </SubPageLayout>
  )
}
