import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import styles from './page.module.css'
import FilterBy from '@/components/FilterBy/FilterBy'

export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="center">
      <div className={styles.menu}>
        <Breadcrumbs />
        <FilterBy />
        {/*  TODO: add condition if on the product page */}
      </div>
      {children}
    </div>
  )
}
