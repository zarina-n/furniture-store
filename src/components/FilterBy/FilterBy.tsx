'use client'

import { useState } from 'react'
import styles from './FilterBy.module.css'
import cn from 'classnames'

export default function FilterBy() {
  const [areOptionsOpen, setAreOptionsOpen] = useState(false)

  return (
    <>
      <div className={styles.select}>
        <button
          className={cn(styles.toggle_button, styles.button)}
          onClick={() => setAreOptionsOpen((prev) => !prev)}
        >
          Sort by
        </button>
        {areOptionsOpen && (
          <div className={styles.option_box}>
            <button className={styles.button}>Newest</button>
            <button className={styles.button}>Featured</button>
            <button className={styles.button}>Price: High to Low</button>
            <button className={styles.button}>Price: Low to High</button>
          </div>
        )}
      </div>
    </>
  )
}
