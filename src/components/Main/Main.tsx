'use client'

import Link from 'next/link'
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
      <Link className={styles.catalog_link} href={'/catalog'}>
        Go to Catalog
      </Link>
    </>
  )
}
