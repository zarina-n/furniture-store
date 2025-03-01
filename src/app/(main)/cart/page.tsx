import Products from '@/components/Products/Products'
import styles from './page.module.css'
import CartForm from '@/components/CartForm/CartForm'
import classNames from 'classnames'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { SearchParamProps } from '@/lib/types'
import { getProducts } from '@/app/api/actions'
import CartList from '@/components/CartProduct/CartList'

export const metadata: Metadata = {
  title: 'Interior - Cart',
  description: 'Furniture Store',
}

export default async function Cart(props: SearchParamProps) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const products = await getProducts()

  return (
    <>
      <div className="center">
        {query ? (
          <Suspense key={query} fallback={<div>Searching ..</div>}>
            <Products products={products} searchQuery={query} />
          </Suspense>
        ) : (
          <>
            <div className={classNames(styles.cart)}>
              <div className={styles.cart_content}>
                <div className={styles.cart_content_top}>
                  <p className={styles.cart_text}>Product</p>
                  <p className={styles.cart_text}>Quantity</p>
                </div>
                <CartList products={products} />
              </div>
              <CartForm />
            </div>
            <div className="center">
              <Products
                heading="Special Offers"
                products={products.filter(
                  (product) => product.priceBeforeDiscount,
                )}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}
