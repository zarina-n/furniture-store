import Footer from '@/components/Footer/Footer'
import Wrapper from '@/components/Wrapper/Wrapper'
import styles from './page.module.css'
import Header from '@/components/Header/Header'
import Modal from '@/components/Modal/Modal'
import Providers from '@/providers/Providers'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <Wrapper>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
        <Modal />
      </Wrapper>
    </Providers>
  )
}
