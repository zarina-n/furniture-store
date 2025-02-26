import classNames from 'classnames'
import styles from './Products.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { BiShoppingBag, BiSolidShoppingBag } from 'react-icons/bi'
import {
  addToCart,
  addToFavorites,
  removeFromFavorites,
} from '@/app/api/actions'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Product as ProductType } from '@/lib/types'
import { useUser } from '@/providers/UserProvider'
import { MouseEventHandler } from 'react'

export default function Product({ product }: { product: ProductType }) {
  const { user } = useKindeBrowserClient()
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

  const cartItem = firebaseUser?.cart?.filter(
    (cartItem: { itemId: string }) => cartItem.itemId === id,
  )

  const handleCart: MouseEventHandler<SVGElement> = async (e) => {
    e.preventDefault()
    const selectedCartItem = cartItem?.[0] ?? { amount: 1, itemId: id }

    await addToCart(user.id, selectedCartItem, id)
  }

  return (
    <Link className={styles.product} href={`/catalog/${id}`}>
      <Image
        src={imgSrc}
        width={370}
        height={240}
        alt={name}
        className={styles.product_img}
      />
      <div className={styles.product_name}>{name}</div>
      <p className={styles.product_text}>{shortDescription}</p>
      <div className={styles.product_price_box}>
        <div>
          <span className={styles.product_price}>${price}</span>
          {priceBeforeDiscount && (
            <span
              className={classNames(
                styles.product_price,
                styles.product_price_sale,
              )}
            >
              ${priceBeforeDiscount}
            </span>
          )}
        </div>
        <div className={styles.product_icons}>
          {cartItem?.length ? (
            <BiSolidShoppingBag
              className={styles.product_icon}
              onClick={handleCart}
            />
          ) : (
            <BiShoppingBag
              className={styles.product_icon}
              onClick={handleCart}
            />
          )}
          {favorite ? (
            <FaHeart
              className={styles.product_icon}
              onClick={async (e) => {
                e.preventDefault()
                await removeFromFavorites(user.id, id)
              }}
            />
          ) : (
            <FaRegHeart
              className={styles.product_icon}
              onClick={async (e) => {
                e.preventDefault()
                await addToFavorites(user.id, id)
              }}
            />
          )}
        </div>
      </div>
    </Link>
  )
}
