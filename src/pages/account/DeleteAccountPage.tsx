import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { AuthButton } from '../../components/auth/AuthButton'
import { accountCopy, deleteAccountWarnings } from '../../data/account'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function DeleteAccountPage() {
  const { navigateAccount } = usePrototype()
  const [checks, setChecks] = useState<boolean[]>(
    deleteAccountWarnings.map(() => false),
  )

  const allChecked = checks.every(Boolean)

  function handleBack() {
    navigateAccount({ screen: 'hub' })
  }

  function toggleCheck(index: number) {
    setChecks((prev) => prev.map((v, i) => (i === index ? !v : v)))
  }

  return (
    <SubPageLayout title={accountCopy.deleteTitle} onBack={handleBack}>
      <div className="mb-5 flex items-start gap-3 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3">
        <AlertTriangle
          className="mt-0.5 h-5 w-5 shrink-0 text-danger"
          strokeWidth={1.5}
        />
        <p className="text-body-sm text-primary">
          注销账户为不可逆操作，请仔细阅读以下说明并确认。
        </p>
      </div>

      <ul className="mb-6 space-y-3">
        {deleteAccountWarnings.map((warning, index) => (
          <li key={warning}>
            <label className="flex items-start gap-3 rounded-lg border border-border-subtle bg-elevated px-3 py-3">
              <input
                type="checkbox"
                checked={checks[index]}
                onChange={() => toggleCheck(index)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-brand"
              />
              <span className="text-body-sm text-secondary">{warning}</span>
            </label>
          </li>
        ))}
      </ul>

      <AuthButton
        disabled={!allChecked}
        onClick={() => navigateAccount({ screen: 'delete-verify' })}
      >
        继续注销
      </AuthButton>
    </SubPageLayout>
  )
}
