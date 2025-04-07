'use client'

import cn from 'classnames'
import CartForm from '../CartForm/CartForm'
import Products from '../Products/Products'
import styles from './CartProduct.module.css'
import { Product } from '@/lib/types'
import CartProduct from './CartProduct'
import { useUser } from '@/providers/UserProvider'
import { useEffect, useMemo } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useCart } from '@/providers/CartProvider'
import { removeAllFromCart } from '@/app/api/actions'
import Link from 'next/link'

export default function CartContent({ products }: { products: Product[] }) {
  const { firebaseUser } = useUser()
  const { isAuthenticated } = useKindeBrowserClient()
  const { cart, updateLocalStorage } = useCart()

  const cartItems = products.filter((product) => product.amount !== 0)
  const emptyState = cartItems.length > 0

  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      if (item.amount == null) return acc
      return acc + (item.price || 0) * item.amount
    }, 0)
  }, [cartItems])

  const removeItemsHandler = async () => {
    updateLocalStorage([])
    if (firebaseUser?.id) await removeAllFromCart(firebaseUser?.id)
  }

  useEffect(() => {
    if (isAuthenticated && firebaseUser?.cart) {
      updateLocalStorage(firebaseUser.cart)
    } else {
      updateLocalStorage(cart)
    }
  }, [isAuthenticated, firebaseUser?.cart, cart, updateLocalStorage])

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
          <>
            {emptyState
              ? cartItems.map((cartItem) => (
                  <CartProduct cartItem={cartItem} key={cartItem.id} />
                ))
              : 'Your cart is empty'}
            <div className={styles.cart_button_box}>
              {emptyState && (
                <button
                  className={styles.cart_button}
                  type="reset"
                  onClick={removeItemsHandler}
                >
                  Empty the cart
                </button>
              )}
              <button className={styles.cart_button}>
                {/*todo: replace with Button component*/}
                <Link href={'/catalog'}>Continue shopping</Link>
              </button>
            </div>
          </>
        </div>
        <CartForm total={total} />
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
