'use client'

import { removeAllFromCart } from '@/app/api/actions'
import styles from './CartProduct.module.css'
import { useUser } from '@/providers/UserProvider'
import Link from 'next/link'
import { useCart } from '@/providers/CartProvider'

export default function CartButtons({ emptyState }: { emptyState: boolean }) {
  const { firebaseUser } = useUser()
  const { updateLocalStorage } = useCart()

  const removeItemsHandler = async () => {
    updateLocalStorage([])
    if (firebaseUser?.id) await removeAllFromCart(firebaseUser?.id)
  }

  return (
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
  )
}
