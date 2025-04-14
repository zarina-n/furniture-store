'use client'

import React, { Suspense } from 'react'
import Products from '../Products/Products'
import { useProducts } from '@/providers/ProductsProvider'

export default function SearchedProducts({ query }: { query: string }) {
  // todo: remove input value when changing pages
  const { products } = useProducts()

  return (
    <Suspense key={query} fallback={<div>Searching ..</div>}>
      <Products products={products} searchQuery={query} />
    </Suspense>
  )
}
