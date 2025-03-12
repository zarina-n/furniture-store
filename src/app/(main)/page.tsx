import Products from '@/components/Products/Products'
import styles from './page.module.css'
import cn from 'classnames'
import { Suspense } from 'react'
import { SearchParamProps } from '@/lib/types'
import { getProducts } from '../api/actions'
import Main from '@/components/Main/Main'

export default async function Home(props: SearchParamProps) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''

  const products = await getProducts()

  return (
    <div className={cn(styles.home, 'center')}>
      {query ? (
        <Suspense key={query} fallback={<div>Searching ..</div>}>
          <Products products={products} searchQuery={query} />
        </Suspense>
      ) : (
        <Main products={products} />
      )}
    </div>
  )
}
