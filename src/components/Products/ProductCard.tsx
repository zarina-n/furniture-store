'use client'

import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { BiShoppingBag, BiSolidShoppingBag } from 'react-icons/bi'
import { addToFireStoreCart } from '@/app/api/actions'
import { Product as ProductType } from '@/lib/types'
import { useUser } from '@/providers/UserProvider'
import { MouseEventHandler } from 'react'
import styles from './Products.module.css'
import { useProducts } from '@/providers/ProductsProvider'
import { handleFavoriteToggle } from '@/utils/handleFavoriteToggle'

export default function ProductCard({ product }: { product: ProductType }) {
  const { firebaseUser, isAuthenticated } = useUser()

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
      if (isAuthenticated && firebaseUser) {
        await addToFireStoreCart(firebaseUser.id, cartItem)
      } else {
        removeFromCart(id)
      }
    } else {
      const newCartItem = { amount: 1, id, price }
      if (isAuthenticated && firebaseUser) {
        await addToFireStoreCart(firebaseUser.id, newCartItem)
      } else {
        addToCart(newCartItem)
      }
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
              onClick={(e) =>
                handleFavoriteToggle({
                  e,
                  isAuthenticated,
                  firebaseUser,
                  product,
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
                })
              }
            />
          )}
        </div>
      </div>
    </Link>
  )
}
