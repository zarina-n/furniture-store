import { Metadata } from 'next'
import { SearchParamProps } from '@/lib/types'
import CartContent from '@/components/CartProduct/CartContent'
import SearchedProducts from '@/components/SearchedProducts/SearchedProducts'

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
        {query ? <SearchedProducts query={query} /> : <CartContent />}
      </div>
    </>
  )
}
