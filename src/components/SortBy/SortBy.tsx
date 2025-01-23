'use client'

import { useState } from 'react'
import styles from './SortBy.module.css'
import cn from 'classnames'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { sortByOptions } from '@/mockedData/sortByOptions'

export default function SortBy() {
  const [areOptionsOpen, setAreOptionsOpen] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()

  const params = new URLSearchParams(searchParams)
  const existingSortOption = params.get('sort')

  const onnSortOptionHandler = (name: string, value: string) => {
    if (existingSortOption === value) {
      params.delete('sort')
    } else {
      params.set('sort', value)
    }

    router.replace(`${pathName}?${params.toString()}`)
  }

  return (
    <>
      <div className={styles.select}>
        <button
          className={cn(styles.toggle_button, styles.button)}
          onClick={() => setAreOptionsOpen((prev) => !prev)}
        >
          Sort by
        </button>
      </div>
      <div className={cn(styles.option_box, areOptionsOpen && styles.visible)}>
        {sortByOptions.map(({ name, value }) => (
          <button
            key={name}
            className={cn(
              styles.button,
              existingSortOption == value && styles.active_option,
            )}
            onClick={() => onnSortOptionHandler(name, value)}
          >
            {name}
          </button>
        ))}
      </div>
    </>
  )
}
