'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './Breadcrumbs.module.css'
import cn from 'classnames'
import { useState } from 'react'

const links = [
  'All',
  'Rest',
  'Work',
  'Kitchen',
  'Children',
  'Bath',
  'Favorites',
]

export default function Breadcrumbs() {
  // TODO: refactor this component
  const paths = usePathname() ?? ''
  const categoryPathName = paths.split('/').filter((path) => path)[1]

  const [areLinksShown, setAreLinksShown] = useState(false)

  return (
    <ul className={styles.breadcrumb}>
      <li className={styles.list_link}>
        <Link href={'/'}>Home</Link>
      </li>
      <li className={styles.list_link}>
        <Link href={'/catalog'}>Catalog</Link>
      </li>
      <li className={cn(styles.list_link, styles.list_link_category)}>
        <Link
          href={`/catalog/${categoryPathName}`}
          onMouseEnter={() => setAreLinksShown(true)}
          onMouseLeave={() => setAreLinksShown(false)}
        >
          {categoryPathName[0].toUpperCase() +
            categoryPathName.slice(1, categoryPathName.length)}
        </Link>
        <ul
          className={styles.categories_list}
          onMouseEnter={() => setAreLinksShown(true)}
          onMouseLeave={() => setAreLinksShown(false)}
        >
          {areLinksShown &&
            links.map((link) => (
              <li key={link}>
                <Link href={`/catalog/${link}`}>{link}</Link>
              </li>
            ))}
        </ul>
      </li>
    </ul>
  )
}
