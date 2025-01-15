import { Suspense } from 'react'
import Products from '@/components/Products/Products'
import { products } from '@/app/mockedData/products'
import { Metadata } from 'next'
import { SearchParamProps } from '@/app/types'

export const metadata: Metadata = {
  title: 'Interior - Catalog',
  description: 'Furniture Store',
}

export default async function Catalog(props: SearchParamProps) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''

  return (
    <Suspense key={query} fallback={<div>Searching ..</div>}>
      <Products products={products} searchQuery={query} />
    </Suspense>
  )
}
