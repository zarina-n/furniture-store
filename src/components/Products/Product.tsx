'use client'

import classNames from 'classnames'
import styles from './Products.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { MouseEventHandler } from 'react'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { RiShoppingBagFill, RiShoppingBagLine } from 'react-icons/ri'

interface Props {
  // TODO: replace with type from types.ts
  name: string
  imgSrc: string
  description: string
  price: number
  priceBeforeDiscount?: number | null | undefined
  id: number
  favorite: boolean
  inTheCart: boolean
}

type IconButtonType = MouseEventHandler<SVGSVGElement> | undefined

export default function Product({
  name,
  imgSrc,
  description,
  price,
  priceBeforeDiscount,
  id,
  favorite,
  inTheCart,
}: Props) {
  const onCartClickHandle: IconButtonType = (e) => {
    e.preventDefault()
  }

  const onHeartClickHandle: IconButtonType = (e) => {
    e.preventDefault()
  }

  return (
    <Link className={styles.product} href={`/catalog/${id}`}>
      <div>
        <Image
          src={imgSrc}
          width={370}
          height={240}
          alt={name}
          className={styles.product_image}
        />
        <div className={styles.icons_box}>
          {inTheCart ? (
            <RiShoppingBagFill
              className={styles.icon}
              onClick={onCartClickHandle}
            />
          ) : (
            <RiShoppingBagLine
              className={styles.icon}
              onClick={onCartClickHandle}
            />
          )}
          {favorite ? (
            <FaHeart className={styles.icon} onClick={onHeartClickHandle} />
          ) : (
            <FaRegHeart className={styles.icon} onClick={onHeartClickHandle} />
          )}
        </div>
      </div>
      <div className={styles.product_name}>{name}</div>
      <p className={styles.product_text}>{description}</p>
      <div className={styles.product_price_box}>
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
    </Link>
  )
}
