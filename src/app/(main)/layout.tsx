import Footer from '@/components/Footer/Footer'
import Wrapper from '@/components/Wrapper/Wrapper'
import styles from './page.module.css'
import Header from '@/components/Header/Header'
import Providers from '@/providers/Providers'
import HydrateProducts from '@/components/HydrateProducts'

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
        </main>
        <Footer />
      </Wrapper>
    </Providers>
  )
}
