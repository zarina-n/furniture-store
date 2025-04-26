'use client'

import { UserContextType, FirebaseUser } from '@/lib/types'
import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext<UserContextType | null>(null)

interface Props {
  user: FirebaseUser
  isUserAuthenticated: boolean
  children: React.ReactNode
}

export const UserProvider = ({
  children,
  user,
  isUserAuthenticated,
}: Props) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (user) {
      setFirebaseUser(user)
    }
  }, [user])

  useEffect(() => {
    if (isUserAuthenticated) {
      setIsAuthenticated(isUserAuthenticated)
    }
  }, [isUserAuthenticated])

  return (
    <UserContext.Provider value={{ firebaseUser, isAuthenticated }}>
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
