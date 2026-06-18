import { CheckCircle2 } from 'lucide-react'
import { AuthButton } from '../../components/auth/AuthButton'
import { accountCopy } from '../../data/account'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'

export function DeleteAccountSuccessPage() {
  const { deleteAccount } = usePrototype()

  return (
    <SubPageLayout title={accountCopy.deleteSuccessTitle} onBack={deleteAccount}>
      <div className="flex flex-col items-center py-10 text-center">
        <CheckCircle2 className="h-14 w-14 text-success" strokeWidth={1.5} />
        <p className="mt-5 text-h3 font-semibold text-primary">注销成功</p>
        <p className="mt-2 max-w-[280px] text-body-sm text-secondary">
          您的 CoinNova 账户已注销，相关数据将在 30 天内从系统中清除。
        </p>
      </div>

      <AuthButton onClick={deleteAccount}>返回首页</AuthButton>
    </SubPageLayout>
  )
}
