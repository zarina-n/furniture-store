'use client'

import cn from 'classnames'
import CartList from './CartList'
import CartForm from '../CartForm/CartForm'
import Products from '../Products/Products'
import styles from './CartProduct.module.css'
import { Product } from '@/lib/types'

export default function CartContent({ products }: { products: Product[] }) {
  return (
    <form onSubmit={() => {}}>
      <div className={cn(styles.cart)}>
        <div className={styles.cart_content}>
          <div className={styles.cart_content_top}>
            <p className={styles.cart_text}>Product</p>
            <div className={styles.cart_content_top_price_group}>
              <p className={styles.cart_text}>Price</p>
              <p className={styles.cart_text}>Quantity</p>
            </div>
          </div>
          <CartList products={products} />
        </div>
        <CartForm />
      </div>
      <div className="center">
        <Products
          heading="Special Offers"
          products={products.filter((product) => product.priceBeforeDiscount)}
        />
      </div>
    </form>
  )
}
