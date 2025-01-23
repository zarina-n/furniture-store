'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './Breadcrumbs.module.css'

export default function Breadcrumbs() {
  const paths = usePathname() ?? ''
  const pathNames = paths.split('/').filter((path) => path)

  return (
    <ul className={styles.breadcrumb}>
      <li className={styles.list_link}>
        <Link href={'/'}>Home</Link>
      </li>
      {pathNames.map((link, index) => {
        const href = `/${pathNames.slice(0, index + 1).join('/')}`

        const itemLink = link[0].toUpperCase() + link.slice(1, link.length) // TODO: refactor links appearance

        return (
          <li className={styles.list_link} key={index}>
            <Link href={href}>{itemLink}</Link>
          </li>
        )
      })}
    </ul>
  )
}
