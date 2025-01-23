import Products from '@/components/Products/Products'
import { SearchParamProps } from '@/lib/types'
import { products } from '@/mockedData/products'
import { Suspense } from 'react'

export default async function Favorites(props: SearchParamProps) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  return (
    <Suspense key={query} fallback={<div>Searching ..</div>}>
      <Products
        products={products.filter((product) => product.favorite)}
        searchQuery={query}
      />
    </Suspense>
  )
}
