'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './CartProduct.module.css'
import { products } from '@/app/mockedData/products'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { RiDeleteBinFill } from 'react-icons/ri'
import { ChangeEventHandler } from 'react'

interface Props {
  // TODO: replace with type from types.ts
  name: string
  cartImgSrc: string
  description: string
  price: number
  priceBeforeDiscount?: number | null | undefined
  id: number
  cartAmount: number | null
  favorite: boolean
}

export default function CartProduct({
  // TODO: add form for input
  name,
  cartImgSrc,
  description,
  price,
  id,
  cartAmount,
  favorite,
}: Props) {
  const onAddToFavoritesHandle = () => {
    const adjustedProducts = products.map((product) =>
      product.id === id ? { ...product, favorite: !product.favorite } : product,
    )

    localStorage.setItem('products', JSON.stringify(adjustedProducts))
    window.location.reload()
  }

  const onRemoveFromCartHandle = () => {
    const adjustedProducts = products.map((product) =>
      product.id === id
        ? { ...product, inTheCart: !product.inTheCart, cartAmount: null }
        : product,
    )

    localStorage.setItem('products', JSON.stringify(adjustedProducts))
    window.location.reload()
  }

  const onProductAmountChange:
    | ChangeEventHandler<HTMLInputElement>
    | undefined = (e) => {
    const adjustedProducts = products.map((product) =>
      product.id === id ? { ...product, cartAmount: e.target.value } : product,
    )

    localStorage.setItem('cartItems', JSON.stringify(adjustedProducts))
  }

  return (
    <div className={styles.cart_item}>
      <div className={styles.cart_item_info}>
        <div className={styles.cart_item_box}>
          <Link href={`/catalog/${id}`}>
            <Image src={cartImgSrc} width={173} height={173} alt={name} />
          </Link>
          <div>
            <h3 className={styles.cart_product_name}>{name}</h3>
            <p className={styles.cart_product_text}>{description}</p>
            <span className={styles.cart_product_price}>{price}</span>
            <div className={styles.cart_link_box}>
              <p className={styles.cart_link} onClick={onAddToFavoritesHandle}>
                {favorite ? <FaHeart /> : <FaRegHeart />}
              </p>
              <p className={styles.cart_link} onClick={onRemoveFromCartHandle}>
                <RiDeleteBinFill />
              </p>
            </div>
          </div>
        </div>
        <div className={styles.cart_input}>
          <input
            className={styles.cart_quantity}
            type="number"
            name="quantity" // TODO: add constant
            min="1"
            value={cartAmount || 1}
            onChange={onProductAmountChange}
          />
        </div>
      </div>
    </div>
  )
}
