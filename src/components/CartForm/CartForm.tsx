'use client'

import { TAX } from '@/lib/constants'
import styles from './CartForm.module.css'

export default function CartForm({ total }: { total: number }) {
  const tax = total * TAX

  return (
    <div className={styles.form}>
      <h3 className={styles.form_heading}>Order summary</h3>
      <div className={styles.cart_info}>
        <div className={styles.form_input_box}>
          <p>Cart subtotal: {total}</p>
          <p>Tax: {tax}</p>
        </div>
        <div className={styles.submit}>
          <p className={styles.form_text}>{`Order total: $${total + tax}`}</p>
          <button className={styles.form_button} type="submit">
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
