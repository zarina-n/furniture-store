import { AuthProvider } from './AuthProvider'
import { ProductsProvider } from './ProductsProvider'
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
        <ProductsProvider>{children}</ProductsProvider>
      </UserProvider>
    </AuthProvider>
  )
}
