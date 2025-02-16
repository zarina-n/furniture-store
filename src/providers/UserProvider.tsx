'use client'

import { UserRecord } from 'firebase-admin/auth'
import { createContext, useContext, useMemo } from 'react'

type UserContextType = {
  user: UserRecord | null
}

const UserProviderContext = createContext<UserContextType | null>(null)

interface Props {
  children: React.ReactNode
  user: UserRecord | null
}

export const UserProvider = ({ children, user }: Props) => {
  const providerValue = useMemo(
    () => ({
      user: user ?? null,
    }),
    [user],
  )

  return (
    <UserProviderContext.Provider value={providerValue}>
      {children}
    </UserProviderContext.Provider>
  )
}

export const useUserProvider = (): UserContextType => {
  const context = useContext(UserProviderContext)

  if (!context) {
    throw new Error('useUserProvider must be used within a UserProvider')
  }

  return context
}
