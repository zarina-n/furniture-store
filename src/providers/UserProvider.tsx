'use client'

import { UserContextType, FirebaseUser } from '@/lib/types'
import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext<UserContextType | null>(null)

interface Props {
  user: FirebaseUser
  children: React.ReactNode
}

export const UserProvider = ({ children, user }: Props) => {
  // todo: refactor naming
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser>(null)

  useEffect(() => {
    if (user) {
      setFirebaseUser(user)
    }
  }, [user])

  return (
    <UserContext.Provider value={{ firebaseUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
