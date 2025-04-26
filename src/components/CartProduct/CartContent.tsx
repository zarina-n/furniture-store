'use client'

import cn from 'classnames'
import CartForm from '../CartForm/CartForm'
import Products from '../Products/Products'
import styles from './CartProduct.module.css'
import CartProduct from './CartProduct'
import { useUser } from '@/providers/UserProvider'
import { useEffect, useMemo, useState } from 'react'
import { removeAllFromCart } from '@/app/api/actions'
import Link from 'next/link'
import { syncCartsOnLogin } from '@/utils/syncCartsOnLogin'
import { useProducts } from '@/providers/ProductsProvider'
import { toast } from 'sonner'
import { showToast } from '@/utils/showToast'
import { useCartSyncStore } from '@/stores/cartSyncStore'

export default function CartContent() {
  const { firebaseUser, isAuthenticated } = useUser()
  const [merge] = useState(true) // todo: add modal to it
  const { setCart, products, cart } = useProducts()
  const { hasSynced, setHasSynced } = useCartSyncStore()

  const cartMap = useMemo(
    () => new Map(cart.map((item) => [item.id, item])),
    [cart],
  )

  const cartItems = useMemo(() => {
    return products
      .filter((product) => cartMap.has(product.id))
      .map((product) => {
        const cartItem = cartMap.get(product.id)!
        return {
          ...product,
          amount: cartItem.amount,
          price: cartItem.price ?? product.price,
        }
      })
  }, [products, cartMap])

  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      if (item.amount == null) return acc
      return acc + (item.price || 0) * item.amount
    }, 0)
  }, [cartItems])

  const emptyState = cartItems.length > 0

  const removeItemsHandler = async () => {
    setCart([])

    if (firebaseUser?.id) {
      const result = await removeAllFromCart(firebaseUser?.id)
      showToast(result)
    } else {
      toast.success('The cart is empty!') // todo: repeated text
    }
  }

  useEffect(() => {
    if (hasSynced) return

    if (!isAuthenticated || !firebaseUser) return

    syncCartsOnLogin({
      userId: firebaseUser.id,
      localCart: cart,
      userCart: firebaseUser.cart || [],
      merge,
      setCart,
    })

    setHasSynced(true)
  }, [
    cart,
    firebaseUser,
    hasSynced,
    isAuthenticated,
    merge,
    setCart,
    setHasSynced,
  ])

  return (
    <form onSubmit={() => {}}>
      <div className={cn(styles.cart)}>
        <div className={styles.cart_content}>
          <div className={styles.cart_content_top}>
            {emptyState && ( // todo: refactor empty state conditional rendering
              <>
                <p className={styles.cart_text}>Product</p>
                <div className={styles.cart_content_top_price_group}>
                  <p className={styles.cart_text}>Price</p>
                  <p className={styles.cart_text}>Quantity</p>
                </div>
              </>
            )}
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
