import classNames from 'classnames'
import styles from './Products.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { BiShoppingBag, BiSolidShoppingBag } from 'react-icons/bi'
import { MouseEventHandler } from 'react'

interface Props {
  // TODO: replace with type from types.ts
  name: string
  imgSrc: string
  shortDescription: string
  price: number
  priceBeforeDiscount?: number | null | undefined
  id: string
  favorite: boolean
  inTheCart: boolean
}

export default function Product({
  name,
  imgSrc,
  shortDescription,
  price,
  priceBeforeDiscount,
  id,
  favorite,
  inTheCart,
}: Props) {
  const onCartHandle: MouseEventHandler<SVGElement> = (e) => {
    e.preventDefault()
  }

  const onFavoritesHandle: MouseEventHandler<SVGElement> = (e) => {
    e.preventDefault()
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
          {inTheCart ? (
            <BiSolidShoppingBag
              className={styles.product_icon}
              onClick={onCartHandle}
            />
          ) : (
            <BiShoppingBag
              className={styles.product_icon}
              onClick={onCartHandle}
            />
          )}
          {favorite ? (
            <FaHeart
              className={styles.product_icon}
              onClick={onFavoritesHandle}
            />
          ) : (
            <FaRegHeart
              className={styles.product_icon}
              onClick={onFavoritesHandle}
            />
          )}
        </div>
      </div>
    </Link>
  )
}
