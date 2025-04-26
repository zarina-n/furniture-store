import { AuthProvider } from './AuthProvider'
import { ProductsProvider } from './ProductsProvider'
import { UserProvider } from './UserProvider'
import { getFirebaseUser } from '@/app/api/actions'
import { FirebaseUser } from '@/lib/types'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export default async function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  const firebaseUser = (await getFirebaseUser()) as FirebaseUser
  const { isAuthenticated } = getKindeServerSession()
  const isAuth = await isAuthenticated()

  return (
    <AuthProvider>
      <UserProvider user={firebaseUser} isUserAuthenticated={isAuth}>
        <ProductsProvider>{children}</ProductsProvider>
      </UserProvider>
    </AuthProvider>
  )
}
