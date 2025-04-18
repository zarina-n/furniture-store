'use client'

import styles from './page.module.css'
import cn from 'classnames'
import Main from '@/components/Main/Main'
import { useSearchParams } from 'next/navigation'
import SearchedProducts from '@/components/SearchedProducts/SearchedProducts'

export default function Home() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''

  return (
    <div className={cn(styles.home, 'center')}>
      {query ? <SearchedProducts query={query} /> : <Main />}
    </div>
  )
}
