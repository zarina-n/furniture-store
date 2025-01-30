'use client'

import AccountForm from '@/components/AccountForm/AccountForm'
import { useUserProvider } from '@/providers/UserProvider'

export default function UserAccount() {
  const { user } = useUserProvider()
  return (
    <div className="center">
      Hello {user?.displayName ? user?.displayName : user?.email}
      <AccountForm />
    </div>
  )
}
