import Products from '@/components/Products/Products'
import { products } from '../../mockedData/products'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { SearchParamProps } from '@/app/types'
import CartContent from './CartContent'

export const metadata: Metadata = {
  title: 'Interior - Cart',
  description: 'Furniture Store',
}

export default async function Cart(props: SearchParamProps) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''

  return (
    <>
      <div className="center">
        {query ? (
          <Suspense key={query} fallback={<div>Searching ..</div>}>
            <Products products={products} searchQuery={query} />
          </Suspense>
        ) : (
          <CartContent />
        )}
      </div>
    </>
  )
}
