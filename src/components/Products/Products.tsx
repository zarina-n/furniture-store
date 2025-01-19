'use client'

import { Product as ProductType } from '@/app/types'
import Product from './Product'
import styles from './Products.module.css'
import cn from 'classnames'

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
  const reducedArray = numberOfProductsToDisplay
    ? products.slice(0, numberOfProductsToDisplay)
    : products

  const searchArray = searchQuery // TODO: refactor products sorting
    ? reducedArray.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : reducedArray

  const emptyState = searchQuery && !searchArray.length

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
          searchArray.map(
            ({
              name,
              imgSrc,
              description,
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
                description={description}
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
