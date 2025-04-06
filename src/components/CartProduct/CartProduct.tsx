'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './CartProduct.module.css'
import { Product } from '@/lib/types'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import {
  addToFavorites,
  removeFromFavorites,
  addToFireStoreCart,
  updateCartItemAmount,
} from '@/app/api/actions'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useState } from 'react'
import { useCart } from '@/providers/CartProvider'

export default function CartProduct({
  // TODO: add form for input
  // todo: add skeleton
  cartItem,
}: {
  cartItem: Product
}) {
  const { name, imgSrc, shortDescription, price, id, favorite, amount } =
    cartItem

  const { user, isAuthenticated } = useKindeBrowserClient()
  const [cartAmount, setCartAmount] = useState(amount ?? 1)
  const { updateAmount } = useCart()
  const selectedCartItem = { itemId: id, amount: cartAmount, price }

  const handleFavoriteToggle = async () => {
    if (favorite) {
      await removeFromFavorites(user.id, id)
    } else {
      await addToFavorites(user.id, id)
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value)
    setCartAmount(newAmount)
    if (isAuthenticated)
      await updateCartItemAmount(user.id, {
        itemId: id,
        amount: newAmount,
      })
    updateAmount(id, newAmount)
  }

  return (
    <div className={styles.cart_item}>
      <div className={styles.cart_item_info}>
        <div className={styles.cart_item_box}>
          <Link href={`/catalog/${id}`}>
            <Image
              src={imgSrc[0]}
              width={173}
              height={173}
              alt={name}
              style={{ objectFit: 'cover' }} // todo: add image loader
              loading="lazy"
              unoptimized
            />
          </Link>
          <div>
            <h3 className={styles.cart_product_name}>{name}</h3>
            <p className={styles.cart_product_text}>{shortDescription}</p>

            <div className={styles.cart_link_box}>
              {favorite ? (
                <FaHeart
                  className={styles.product_icon} // todo: add button, repeated element from Product, move logic to a separate
                  onClick={handleFavoriteToggle}
                />
              ) : (
                <FaRegHeart
                  className={styles.product_icon} // todo: add button, repeated element from Product
                  onClick={handleFavoriteToggle}
                />
              )}
              <RiDeleteBin6Line
                className={styles.product_icon}
                onClick={async (e) => {
                  e.preventDefault() // todo: add button, repeated element from Product
                  if (isAuthenticated)
                    await addToFireStoreCart(user.id, selectedCartItem)
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.cart_product_price_box}>
          <p className={styles.cart_product_price}>${price * cartAmount}</p>
          <div className={styles.cart_input}>
            <input
              className={styles.cart_quantity}
              type="number"
              min="1"
              value={cartAmount}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
