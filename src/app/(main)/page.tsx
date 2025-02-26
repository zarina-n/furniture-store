import Products from '@/components/Products/Products'
import styles from './page.module.css'
import Link from 'next/link'
import Categories from '@/components/Categories/Categories'
import classNames from 'classnames'
import { Suspense } from 'react'
import { SearchParamProps } from '@/lib/types'
import { getProducts } from '../api/actions'

export default async function Home(props: SearchParamProps) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''

  const products = await getProducts()

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
