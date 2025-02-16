'use client'

import { useUserProvider } from '@/providers/UserProvider'

export default function Header() {
  const { user } = useUserProvider()
  return <div> Hello {user?.displayName ? user?.displayName : user?.email}</div>
}
