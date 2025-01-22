import Filters from '@/components/Filters/Filters'
import styles from './page.module.css'
import SortBy from '@/components/SortBy/SortBy'

export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="center">
      <div className={styles.menu}>
        <Filters />
        <SortBy />
        {/*  TODO: add condition if on the product page */}
      </div>
      {children}
    </div>
  )
}
