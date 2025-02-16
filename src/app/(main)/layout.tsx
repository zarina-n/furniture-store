import Footer from '@/components/Footer/Footer'
import Wrapper from '@/components/Wrapper/Wrapper'
import styles from './page.module.css'
import Header from '@/components/Header/Header'
import Modal from '@/components/Modal/Modal'
import Providers from '@/providers/Providers'
import { cookies } from 'next/headers'
import { SESSION_COOKIE } from '@/lib/constants'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isCookie = (await cookies()).get(SESSION_COOKIE)

  return (
    <Providers>
      <Wrapper>
        <Header isSessionCookie={!!isCookie} />
        <main className={styles.main}>{children}</main>
        <Footer />
        <Modal />
      </Wrapper>
    </Providers>
  )
}
