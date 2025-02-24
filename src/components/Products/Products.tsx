'use client'

import { Product as ProductType } from '@/lib/types'
import Product from './Product'
import styles from './Products.module.css'
import cn from 'classnames'
import { processProducts } from '@/utils/processProducts'

interface Props {
  heading?: string
  products: ProductType[]
  numberOfProductsToDisplay?: number
  searchQuery?: string
}

export default function Products({
  heading,
  products,
  numberOfProductsToDisplay,
  searchQuery,
}: Props) {
  const processedProducts = processProducts(
    products,
    numberOfProductsToDisplay,
    searchQuery,
  )
  const emptyState = searchQuery && !processedProducts.length

  return (
    <div
      className={cn(
        styles.product_box,
        searchQuery && styles.searched_product_box,
      )}
    >
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <div className={styles.product_content}>
        {emptyState ? (
          <div className={styles.empty_search}>No results are found</div>
        ) : (
          processedProducts.map(
            ({
              name,
              imgSrc,
              shortDescription,
              price,
              priceBeforeDiscount,
              id,
              favorite,
              inTheCart,
            }) => (
              <Product
                name={name}
                imgSrc={imgSrc}
                key={id}
                shortDescription={shortDescription}
                price={price}
                priceBeforeDiscount={priceBeforeDiscount}
                id={id}
                favorite={favorite}
                inTheCart={inTheCart}
              />
            ),
          )
        )}
      </div>
    </div>
  )
}
