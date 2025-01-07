import Products from '@/components/Products/Products'
import styles from './page.module.css'
import CartForm from '@/components/CartForm/CartForm'
import CartProduct from '@/components/CartProduct/CartProduct'
import classNames from 'classnames'
import { products, cartList } from '../../mockedData/products'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Interior - Cart',
  description: 'Cart',
}

export default function Cart() {
  return (
    <>
      <div className={classNames(styles.cart, 'center')}>
        <div className={styles.cart_content}>
          <div className={styles.cart_content_top}>
            <p className={styles.cart_text}>Product</p>
            <p className={styles.cart_text}>Quantity</p>
          </div>
          {cartList.map(
            ({ name, imgSrc, description, price, priceBeforeDiscount, id }) => (
              <CartProduct
                key={id}
                name={name}
                imgSrc={imgSrc}
                description={description}
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
            <button className={styles.cart_button}>Continue shopping</button>
          </div>
        </div>
        <CartForm />
      </div>

      <div className="center">
        <Products
          heading="Special Offers"
          products={products.filter((product) => product.priceBeforeDiscount)}
        />
      </div>
    </>
  )
}
