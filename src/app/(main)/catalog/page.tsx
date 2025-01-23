import { Suspense } from 'react'
import Products from '@/components/Products/Products'
import { products } from '@/mockedData/products'
import { Metadata } from 'next'
import { SearchParamProps } from '@/lib/types'
import Filters from '@/components/Filters/Filters'
import SortBy from '@/components/SortBy/SortBy'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Interior - Catalog',
  description: 'Furniture Store',
}

export default async function Catalog(props: SearchParamProps) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const categories = searchParams?.category?.split(',') || []
  const sortOption = searchParams?.sort || ''

  return (
    <Suspense key={query} fallback={<div>Searching ..</div>}>
      <div className={styles.menu}>
        <Filters />
        <SortBy />
      </div>
      <Products
        products={products}
        searchQuery={query}
        categories={categories}
        sortOption={sortOption}
      />
    </Suspense>
  )
}
