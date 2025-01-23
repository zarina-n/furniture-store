import classNames from 'classnames'
import styles from './Products.module.css'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  // TODO: replace with type from types.ts
  name: string
  imgSrc: string
  description: string
  price: number
  priceBeforeDiscount?: number | null | undefined
  id: number
}

export default function Product({
  name,
  imgSrc,
  description,
  price,
  priceBeforeDiscount,
  id,
}: Props) {
  return (
    <Link className={styles.product} href={`/catalog/${id}`}>
      <Image src={imgSrc} width={370} height={240} alt={name} />
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
