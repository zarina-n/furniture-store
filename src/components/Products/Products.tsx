import { Product as ProductType } from '@/app/types'
import Product from './Product'
import styles from './Products.module.css'

interface Props {
  heading?: string
  products: ProductType[]
  numberOfProductsToDisplay?: number
}

export default function Products({
  heading,
  products,
  numberOfProductsToDisplay,
}: Props) {
  const reducedArray = numberOfProductsToDisplay
    ? products.slice(0, numberOfProductsToDisplay)
    : products

  return (
    <div className={styles.product_box}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <div className={styles.product_content}>
        {reducedArray.map(
          ({ name, imgSrc, description, price, priceBeforeDiscount, id }) => (
            <Product
              name={name}
              imgSrc={imgSrc}
              key={id}
              description={description}
              price={price}
              priceBeforeDiscount={priceBeforeDiscount}
              id={id}
            />
          ),
        )}
      </div>
    </div>
  )
}
