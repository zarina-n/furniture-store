'use client'

import { Product } from '@/lib/types'
import Button from '../Button/Button'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import styles from './ProductPage.module.css'
import { addOrUpdateCartItem } from '@/app/api/actions'
import { useState } from 'react'
import { useProducts } from '@/providers/ProductsProvider'
import { useUser } from '@/providers/UserProvider'
import { handleFavoriteToggle } from '@/utils/handleFavoriteToggle'
import { toast } from 'sonner'
import { showToast } from '@/utils/showToast'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function ProductDescription({ product }: { product: Product }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()
  const params = new URLSearchParams(searchParams)
  const { firebaseUser, isAuthenticated } = useUser()
  const [cartAmount, setCartAmount] = useState(
    !product.amount ? 1 : product.amount,
  )
  const { addToCart, updateAmount, cart } = useProducts()

  const handleCart = async () => {
    const cartItem = {
      amount: cartAmount,
      id: product.id,
      price: product.price,
    }

    if (isAuthenticated && firebaseUser) {
      const result = await addOrUpdateCartItem(firebaseUser.id, {
        id: product.id,
        amount: cartAmount,
        price: product.price,
      })
      showToast(result)
    } else {
      if (cart.some((item) => cartItem.id === item.id)) {
        updateAmount(product.id, cartAmount)
        toast.success('The item amount was updated')
      } else {
        addToCart(cartItem)
        toast.success('The item was added to the cart')
      }
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
            onClick={(e) =>
              handleFavoriteToggle({
                e,
                isAuthenticated,
                firebaseUser,
                product,
                params,
                router,
                pathName,
              })
            }
          />
        ) : (
          <FaRegHeart
            className={styles.product_icon} // todo: add button
            onClick={(e) =>
              handleFavoriteToggle({
                e,
                isAuthenticated,
                firebaseUser,
                product,
                params,
                router,
                pathName,
              })
            }
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
