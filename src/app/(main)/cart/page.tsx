import Products from '@/components/Products/Products'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { SearchParamProps } from '@/lib/types'
import { getProducts } from '@/app/api/actions'
import CartContent from '@/components/CartProduct/CartContent'

export const metadata: Metadata = {
  title: 'Interior - Cart',
  description: 'Furniture Store',
}

export default async function Cart(props: SearchParamProps) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const products = await getProducts()

  return (
    <>
      <div className="center">
        {query ? (
          <Suspense key={query} fallback={<div>Searching ..</div>}>
            <Products products={products} searchQuery={query} />
          </Suspense>
        ) : (
          <CartContent products={products} />
        )}
      </div>
    </>
  )
}
