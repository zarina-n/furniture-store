import Link from 'next/link'
import styles from './page.module.css'

export default function EmptyCart() {
  return (
    <div className={styles.empty_cart}>
      <h3>Your cart is empty</h3>
      <Link href={'/catalog'}> Go to Catalog</Link>
    </div>
  )
}
