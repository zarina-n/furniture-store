'use client'

import { Product } from '@/lib/types'
import Button from '../Button/Button'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import styles from './ProductPage.module.css'
import {
  addOrUpdateCartItem,
  addToFavorites,
  removeFromFavorites,
} from '@/app/api/actions'
import { MouseEventHandler, useState } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useProducts } from '@/providers/ProductsProvider'

export default function ProductDescription({ product }: { product: Product }) {
  const { user, isAuthenticated } = useKindeBrowserClient()
  const [cartAmount, setCartAmount] = useState(
    !product.amount ? 1 : product.amount,
  )
  const { addToCart, updateAmount } = useProducts()

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

  const handleCart = async () => {
    const cartItem = {
      amount: cartAmount,
      id: product.id,
      price: product.price,
    }

    if (isAuthenticated) {
      await addOrUpdateCartItem(user.id, {
        id: product.id,
        amount: cartAmount,
        price: product.price,
      })
    } else {
      addToCart(cartItem)
      updateAmount(product.id, cartAmount) // todo : add check to not run 2 functions
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
          value={cartAmount}
          min={1}
          className={styles.amount_input}
          onChange={(e) => setCartAmount(Number(e.target.value))}
        />
        <Button
          title="ADD TO CART"
          active
          onButtonClick={handleCart}
          size="lg"
        />
      </div>
    </div>
  )
}
