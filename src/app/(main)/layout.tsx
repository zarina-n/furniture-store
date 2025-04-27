import Footer from '@/components/Footer/Footer'
import Wrapper from '@/components/Wrapper/Wrapper'
import styles from './page.module.css'
import Header from '@/components/Header/Header'
import Providers from '@/providers/Providers'
import HydrateProducts from '@/components/HydrateProducts'
import Modal from '@/components/Modal/Modal'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <Wrapper>
        <Header />
        <main className={styles.main}>
          <HydrateProducts />
          {children}
          <Modal />
        </main>
        <Footer />
      </Wrapper>
    </Providers>
  )
}
