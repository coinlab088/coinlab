import { useState } from 'react'
import { AuthButton } from '../../components/auth/AuthButton'
import { TextField } from '../../components/auth/TextField'
import { accountCopy } from '../../data/account'
import { usePrototype } from '../../context/PrototypeContext'
import { SubPageLayout } from '../../components/account/SubPageLayout'
import { UserAvatar } from '../../components/account/SettingsList'
import { CopyField } from '../../components/common/CopyButton'

export function ProfilePage() {
  const { user, updateProfile, navigateAccount } = usePrototype()
  const [nickname, setNickname] = useState(user.nickname)
  const [bio, setBio] = useState(user.bio)
  const [saving, setSaving] = useState(false)

  function handleBack() {
    navigateAccount({ screen: 'hub' })
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    window.setTimeout(() => {
      updateProfile({
        nickname: nickname.trim() || user.nickname,
        bio: bio.trim(),
      })
      setSaving(false)
      navigateAccount({ screen: 'hub' })
    }, 300)
  }

  return (
    <SubPageLayout title={accountCopy.profileTitle} onBack={handleBack}>
      <div className="mb-5 flex flex-col items-center gap-3 py-3">
        <UserAvatar nickname={nickname || user.nickname} size={72} />
        <button
          type="button"
          className="text-body-sm text-brand active:opacity-70"
        >
          更换头像
        </button>
      </div>

      <div className="mb-5">
        <CopyField label="UID" value={user.uid} />
      </div>

      <form onSubmit={handleSave}>
        <TextField
          label="昵称"
          value={nickname}
          onChange={setNickname}
          placeholder="请输入昵称"
        />
        <TextField
          label="简介"
          value={bio}
          onChange={setBio}
          placeholder="介绍一下自己（选填）"
        />
        <p className="mb-4 text-caption text-secondary">
          绑定邮箱：{user.email}
        </p>
        <AuthButton type="submit" loading={saving}>
          保存
        </AuthButton>
      </form>
    </SubPageLayout>
  )
}
