'use client'

import { removeAllFromCart } from '@/app/api/actions'
import styles from './CartProduct.module.css'
import { useUser } from '@/providers/UserProvider'
import Link from 'next/link'

export default function CartButtons({ emptyState }: { emptyState: boolean }) {
  const { firebaseUser } = useUser()

  return (
    <div className={styles.cart_button_box}>
      {emptyState && (
        <button
          className={styles.cart_button}
          type="reset"
          onClick={async (e) => {
            e.preventDefault()
            if (!firebaseUser?.id) return
            await removeAllFromCart(firebaseUser?.id) // todo: replace with Button component
          }}
        >
          Empty the cart
        </button>
      )}
      <button className={styles.cart_button}>
        <Link href={'/catalog'}>Continue shopping</Link>
      </button>
    </div>
  )
}
