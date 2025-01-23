import { Suspense } from 'react'
import Products from '@/components/Products/Products'
import { products } from '@/mockedData/products'
import { Metadata } from 'next'
import { SearchParamProps } from '@/lib/types'
import Filters from '@/components/Filters/Filters'
import SortBy from '@/components/SortBy/SortBy'
import styles from './page.module.css'
import { filterBy } from '@/utils/filterBy'
import { sortBy } from '@/utils/sortBy'

export const metadata: Metadata = {
  title: 'Interior - Catalog',
  description: 'Furniture Store',
}

export default async function Catalog(props: SearchParamProps) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const categories = searchParams?.category?.split(',') || []
  const sortOption = searchParams?.sort || ''

  const filteredArray = filterBy(categories, products)
  const sortedArray = sortBy(sortOption, filteredArray)

  return (
    <Suspense key={query} fallback={<div>Searching ..</div>}>
      <div className={styles.menu}>
        <Filters />
        <SortBy />
      </div>
      <Products products={sortedArray} searchQuery={query} />
    </Suspense>
  )
}
