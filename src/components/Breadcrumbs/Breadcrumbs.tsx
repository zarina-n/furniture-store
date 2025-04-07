'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './Breadcrumbs.module.css'
import { useProduct } from '@/providers/ProductProvider'

export default function Breadcrumbs() {
  const paths = usePathname() ?? ''
  const pathNames = paths.split('/').filter((path) => path)
  const { productName } = useProduct()

  const isFavoritesPage = pathNames.length === 2 && pathNames[1] === 'favorites' // todo: move to constant

  const isProductPage =
    pathNames.length === 2 &&
    pathNames[0] === 'catalog' && // todo: move to constant
    pathNames[1] !== 'favorites' // todo: move to constant

  return (
    <ul className={styles.breadcrumb}>
      <li className={styles.list_link}>
        <Link href={'/'}>Home</Link>
      </li>
      {pathNames.map((link, index) => {
        const href = `/${pathNames.slice(0, index + 1).join('/')}`

        let itemLink = link[0].toUpperCase() + link.slice(1)

        if (isProductPage && index === 1) {
          itemLink = productName ? productName : link
        }

        if (isFavoritesPage && index === 1) {
          itemLink = 'Favorites'
        }

        const isLastItem = index === pathNames.length - 1
        const className = isLastItem
          ? `${styles.list_link} ${styles.lastItem}`
          : styles.list_link

        return (
          <li className={className} key={index}>
            <Link href={href}>{itemLink}</Link>
          </li>
        )
      })}
    </ul>
  )
}
