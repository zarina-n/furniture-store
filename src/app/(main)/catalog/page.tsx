import { Suspense } from 'react'
import { Metadata } from 'next'
import { SearchParamProps } from '@/lib/types'
import Filters from '@/components/Filters/Filters'
import SortBy from '@/components/SortBy/SortBy'
import styles from './page.module.css'

import CatalogProducts from '@/components/CatalogProducts/CatalogContent'

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
      <CatalogProducts
        categories={categories}
        sortOption={sortOption}
        query={query}
      />
    </Suspense>
  )
}
