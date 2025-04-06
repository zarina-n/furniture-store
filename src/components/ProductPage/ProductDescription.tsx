'use client'

import { Product } from '@/lib/types'
import Button from '../Button/Button'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import styles from './ProductPage.module.css'
import { addToFavorites, removeFromFavorites } from '@/app/api/actions'
import { MouseEventHandler } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

export default function ProductDescription({ product }: { product: Product }) {
  const { user, isAuthenticated } = useKindeBrowserClient()

  const handleFavoriteToggle: MouseEventHandler<SVGElement> = async (e) => {
    // todo: repeated function (ProductCard)
    e.preventDefault()
    if (isAuthenticated) {
      if (product.favorite) {
        await removeFromFavorites(user.id, product.id)
      } else {
        await addToFavorites(user.id, product.id)
      }
    } else {
      alert('please login or signup') // todo: add toast
    }
  }
  return (
    <div>
      <h1 className={styles.product_name}>{product.name}</h1>
      <div className={styles.price_box}>
        <p className={styles.product_price}>${product.price}</p>
        {product.favorite ? (
          <FaHeart
            className={styles.product_icon} // todo: add button
            onClick={handleFavoriteToggle}
          />
        ) : (
          <FaRegHeart
            className={styles.product_icon} // todo: add button
            onClick={handleFavoriteToggle}
          />
        )}
      </div>
      <div>
        {product.details.map(({ label, value }, index) => (
          <p key={index} className={styles.product_info_label}>
            <strong>{label}</strong>: {value}
          </p>
        ))}
      </div>

      <div className={styles.cart_info}>
        <input
          type="number"
          value={product.amount}
          min={1}
          className={styles.amount_input}
        />
        <Button title="ADD TO CART" active onButtonClick={() => {}} size="lg" />
      </div>
    </div>
  )
}
