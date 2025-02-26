import Products from '@/components/Products/Products'
import styles from './page.module.css'
import CartForm from '@/components/CartForm/CartForm'
import CartProduct from '@/components/CartProduct/CartProduct'
import classNames from 'classnames'
import { cartList } from '../../../mockedData/products'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { SearchParamProps } from '@/lib/types'
import { getProducts } from '@/app/api/actions'

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
                {cartList.map(
                  ({
                    name,
                    imgSrc,
                    shortDescription,
                    price,
                    priceBeforeDiscount,
                    id,
                  }) => (
                    <CartProduct
                      key={id}
                      name={name}
                      imgSrc={imgSrc}
                      description={shortDescription}
                      price={price}
                      priceBeforeDiscount={priceBeforeDiscount}
                      id={id}
                    />
                  ),
                )}
                <div className={styles.cart_button_box}>
                  <button className={styles.cart_button} type="reset">
                    Empty the cart
                  </button>
                  <button className={styles.cart_button}>
                    Continue shopping
                  </button>
                </div>
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
