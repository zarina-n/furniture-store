'use client'

import { useUserProvider } from '@/providers/UserProvider'

export default function UserAccount() {
  const { user } = useUserProvider()
  return <div className="center">Hello {user?.email}</div>
}
