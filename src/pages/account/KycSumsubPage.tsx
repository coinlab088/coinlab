import { accountCopy } from '../../data/account'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'
import { KycSumsubContent } from './KycSumsubContent'

export function KycSumsubPage() {
  const { navigateAccount } = usePrototype()

  return (
    <SubPageLayout
      title={accountCopy.kycSumsubTitle}
      onBack={() => navigateAccount({ screen: 'kyc' })}
    >
      <KycSumsubContent onComplete={() => navigateAccount({ screen: 'kyc' })} />
    </SubPageLayout>
  )
}
