'use client'

import Link from 'next/link'
import React from 'react'
import Categories from '../Categories/Categories'
import Products from '../Products/Products'
import styles from './Main.module.css'
import { Product } from '@/lib/types'

export default function Main({ products }: { products: Product[] }) {
  return (
    <>
      <Categories />
      <Products
        heading="Special Offers"
        products={products.filter((product) => product.priceBeforeDiscount)}
      />
      <Products
        heading="Products Catalog"
        products={products.filter((product) => !product.priceBeforeDiscount)}
        numberOfProductsToDisplay={6}
      />
      <Link className={styles.catalog_link} href={'/catalog'}>
        Go to Catalog
      </Link>
    </>
  )
}
