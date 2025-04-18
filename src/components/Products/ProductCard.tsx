'use client'

import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { BiShoppingBag, BiSolidShoppingBag } from 'react-icons/bi'
import {
  addToFireStoreCart,
  addToFavorites,
  removeFromFavorites,
} from '@/app/api/actions'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Product as ProductType } from '@/lib/types'
import { useUser } from '@/providers/UserProvider'
import { MouseEventHandler } from 'react'
import styles from './Products.module.css'
import { useProducts } from '@/providers/ProductsProvider'

export default function ProductCard({ product }: { product: ProductType }) {
  const { user, isAuthenticated } = useKindeBrowserClient()

  const { firebaseUser } = useUser()
  const {
    name,
    imgSrc,
    shortDescription,
    price,
    priceBeforeDiscount,
    id,
    favorite,
  } = product

  const { cart, addToCart, removeFromCart } = useProducts()

  const cartItem =
    isAuthenticated && firebaseUser
      ? firebaseUser?.cart.find((cartItem) => cartItem.id === id)
      : cart.find((cartItem) => cartItem.id === id)

  const handleCart: MouseEventHandler<SVGElement> = async (e) => {
    e.preventDefault()
    if (cartItem) {
      if (isAuthenticated) {
        await addToFireStoreCart(user.id, cartItem)
      } else {
        removeFromCart(id)
      }
    } else {
      const newCartItem = { amount: 1, id, price }
      if (isAuthenticated) {
        await addToFireStoreCart(user.id, newCartItem)
      } else {
        addToCart(newCartItem)
      }
    }
  }

  const handleFavoriteToggle: MouseEventHandler<SVGElement> = async (e) => {
    // todo: repeated function
    e.preventDefault()
    if (isAuthenticated) {
      if (favorite) {
        await removeFromFavorites(user.id, id)
      } else {
        await addToFavorites(user.id, id)
      }
    } else {
      alert('please login or signup')
    }
  }

  return (
    <Link className={styles.product} href={`/catalog/${id}`}>
      <Image
        src={imgSrc[0]}
        width={370}
        height={240}
        alt={name}
        className={styles.product_img}
        unoptimized
      />
      <div className={styles.product_name}>{name}</div>
      <p className={styles.product_text}>{shortDescription}</p>
      <div className={styles.product_price_box}>
        <div>
          <span className={styles.product_price}>${price}</span>
          {priceBeforeDiscount && (
            <span
              className={cn(styles.product_price, styles.product_price_sale)}
            >
              ${priceBeforeDiscount}
            </span>
          )}
        </div>
        <div className={styles.product_icons}>
          {cartItem ? (
            <BiSolidShoppingBag
              className={styles.product_icon} // todo: add button
              onClick={handleCart}
            />
          ) : (
            <BiShoppingBag
              className={styles.product_icon} // todo: add button
              onClick={handleCart}
            />
          )}
          {favorite ? (
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
      </div>
    </Link>
  )
}
