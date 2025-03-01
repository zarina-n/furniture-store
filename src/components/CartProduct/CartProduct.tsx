'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './CartProduct.module.css'
import { Product } from '@/lib/types'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import {
  addToFavorites,
  removeFromFavorites,
  addToCart,
} from '@/app/api/actions'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { RiDeleteBin6Line } from 'react-icons/ri'

export default function CartProduct({
  // TODO: add form for input
  // todo: add skeleton
  cartItem,
}: {
  cartItem: Product
}) {
  const { name, imgSrc, shortDescription, price, id, favorite } = cartItem
  const { user } = useKindeBrowserClient()
  const selectedCartItem = { itemId: id, amount: 1 } // todo: replace amount

  return (
    <div className={styles.cart_item}>
      <div className={styles.cart_item_info}>
        <div className={styles.cart_item_box}>
          <Link href={`/catalog/${id}`}>
            <Image
              src={imgSrc} // todo: remove cartImgSrc
              width={173}
              height={173}
              alt={name}
              style={{ objectFit: 'cover' }} // todo: add image loader
              loading="lazy"
            />
          </Link>
          <div>
            <h3 className={styles.cart_product_name}>{name}</h3>
            <p className={styles.cart_product_text}>{shortDescription}</p>
            <span className={styles.cart_product_price}>${price}</span>
            <div className={styles.cart_link_box}>
              {favorite ? (
                <FaHeart
                  className={styles.product_icon} // todo: add button, repeated element from Product
                  onClick={async (e) => {
                    e.preventDefault()
                    await removeFromFavorites(user.id, id)
                  }}
                />
              ) : (
                <FaRegHeart
                  className={styles.product_icon} // todo: add button, repeated element from Product
                  onClick={async (e) => {
                    e.preventDefault()
                    await addToFavorites(user.id, id)
                  }}
                />
              )}
              <RiDeleteBin6Line
                className={styles.product_icon}
                onClick={async (e) => {
                  e.preventDefault() // todo: add button, repeated element from Product
                  await addToCart(user.id, selectedCartItem, id)
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.cart_input}>
          <input
            className={styles.cart_quantity}
            type="number"
            name="quantity" // TODO: add constant
            min="1"
            value="1"
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  )
}
