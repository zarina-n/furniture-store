import Products from '@/components/Products/Products'
import styles from './page.module.css'
import Link from 'next/link'
import Categories from '@/components/Categories/Categories'
import classNames from 'classnames'
import { products } from '../../mockedData/products'
import { SearchParamProps } from '../../lib/types'
import { Suspense } from 'react'

export default async function Home(props: SearchParamProps) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''

  return (
    <div className={classNames(styles.home, 'center')}>
      {query ? (
        <Suspense key={query} fallback={<div>Searching ..</div>}>
          <Products products={products} searchQuery={query} />
        </Suspense>
      ) : (
        <>
          <Categories />
          <Products
            heading="Special Offers"
            products={products.filter((product) => product.priceBeforeDiscount)}
          />
          <Products
            heading="Products Catalog"
            products={products.filter(
              (product) => !product.priceBeforeDiscount,
            )}
            numberOfProductsToDisplay={6}
          />
          <Link className={styles.catalog_link} href={'/catalog'}>
            Go to Catalog
          </Link>
        </>
      )}
    </div>
  )
}
