import { accountCopy } from '../../data/account'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'
import { KycContent } from './KycContent'

export function KycPage() {
  const { navigateAccount } = usePrototype()

  return (
    <SubPageLayout
      title={accountCopy.kycTitle}
      onBack={() => navigateAccount({ screen: 'hub' })}
    >
      <KycContent onStart={() => navigateAccount({ screen: 'kyc-sumsub' })} />
    </SubPageLayout>
  )
}
