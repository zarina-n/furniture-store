import Footer from '@/components/Footer/Footer'
import Wrapper from '@/components/Wrapper/Wrapper'
import styles from './page.module.css'
import Header from '@/components/Header/Header'
import { AuthProvider } from '@/providers/AuthProvider'
import { UserProvider } from '@/providers/UserProvider'
import { getFirebaseUser } from '../api/actions'
import { FirebaseUser } from '@/lib/types'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const firebaseUser = (await getFirebaseUser()) as FirebaseUser

  return (
    <AuthProvider>
      <UserProvider user={firebaseUser}>
        <Wrapper>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </Wrapper>
      </UserProvider>
    </AuthProvider>
  )
}
