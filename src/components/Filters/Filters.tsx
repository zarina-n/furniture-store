'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import styles from './Filters.module.css'
import { filters } from '@/lib/categories'
import Button from '../Button/Button'

// TODO: change namings for filters and categories

export default function Filters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()

  const filtersArray = searchParams.get('category')?.split(',') || []

  const params = new URLSearchParams(searchParams)

  const buttonsHandler = (filter: string) => {
    const categories = [...filtersArray]

    const isCategory = categories.some(
      (category) => filter.toLowerCase() === category.toLowerCase(),
    )

    if (isCategory) {
      const index = categories.indexOf(filter.toLowerCase())
      categories.splice(index, 1)
    } else {
      categories.push(filter.toLowerCase())
    }

    if (!categories.length) {
      // todo: refactor conditions
      params.delete('category')
    } else {
      params.set('category', categories?.join(','))
    }

    router.replace(`${pathName}?${params.toString()}`)
  }

  return (
    <div className={styles.filters}>
      {filters.map(({ name }) => (
        <Button
          key={name}
          title={name}
          active={filtersArray?.some(
            (filter) => name.toLowerCase() === filter.toLowerCase(),
          )}
          onButtonClick={() => buttonsHandler(name)}
          size="sm"
        />
      ))}
    </div>
  )
}
