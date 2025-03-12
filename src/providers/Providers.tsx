import { AuthProvider } from './AuthProvider'
import { CartProvider } from './CartProvider'
import { UserProvider } from './UserProvider'
import { getFirebaseUser } from '@/app/api/actions'
import { FirebaseUser } from '@/lib/types'

export default async function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  const firebaseUser = (await getFirebaseUser()) as FirebaseUser

  return (
    <AuthProvider>
      <UserProvider user={firebaseUser}>
        <CartProvider>{children}</CartProvider>
      </UserProvider>
    </AuthProvider>
  )
}
