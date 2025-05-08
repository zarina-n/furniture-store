'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './SortBy.module.css'
import cn from 'classnames'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { sortByOptions } from '@/utils/sortByOptions'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
import { SORT } from '@/lib/constants'

export default function SortBy() {
  const [areOptionsOpen, setAreOptionsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()

  const params = new URLSearchParams(searchParams)
  const existingSortOption = params.get(SORT)

  const onnSortOptionHandler = (value: string) => {
    if (existingSortOption === value) {
      params.delete(SORT)
    } else {
      params.set(SORT, value)
    }

    router.replace(`${pathName}?${params.toString()}`)
  }

  useEffect(() => {
    const onOutsideClickHandler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setAreOptionsOpen(false)
      }
    }

    document.addEventListener('mousedown', onOutsideClickHandler)

    return () => {
      document.removeEventListener('mousedown', onOutsideClickHandler)
    }
  }, [])

  return (
    <>
      <div className={styles.dropdown} ref={dropdownRef}>
        <button
          className={cn(styles.toggle_button, styles.button)}
          onClick={() => setAreOptionsOpen((prev) => !prev)}
        >
          Sort by
          {areOptionsOpen ? (
            <TiArrowSortedUp className={styles.toggle_button_icon} />
          ) : (
            <TiArrowSortedDown className={styles.toggle_button_icon} />
          )}
        </button>
        <div
          className={cn(
            styles.dropdown_content,
            areOptionsOpen && styles.visible,
          )}
        >
          {sortByOptions.map(({ name, value }) => (
            <button
              key={name}
              className={cn(
                styles.button,
                existingSortOption == value && styles.active_option,
              )}
              onClick={() => onnSortOptionHandler(value)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
