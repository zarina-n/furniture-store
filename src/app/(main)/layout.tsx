import Footer from '@/components/Footer/Footer'
import Wrapper from '@/components/Wrapper/Wrapper'
import styles from './page.module.css'
import Header from '@/components/Header/Header'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Wrapper>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </Wrapper>
  )
}
