'use client'

import Link from 'next/link'
import React from 'react'
import Categories from '../Categories/Categories'
import Products from '../Products/Products'
import styles from './Main.module.css'
import { useProducts } from '@/providers/ProductsProvider'

export default function Main() {
  const { products } = useProducts()

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
