import { getFavoriteProducts } from '@/app/api/actions'
import Products from '@/components/Products/Products'
import { SearchParamProps } from '@/lib/types'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Favorites(props: SearchParamProps) {
  // todo: add styling to empty favorites
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''

  const favorites = await getFavoriteProducts()

  return (
    <Suspense key={query} fallback={<div>Searching ..</div>}>
      {favorites.length ? (
        <Products products={favorites} searchQuery={query} />
      ) : (
        <>
          <p>No favorites added yet</p>
          <Link href="/catalog">Go to catalog</Link>
        </>
      )}
    </Suspense>
  )
}
