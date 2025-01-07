'use client'

import Image from 'next/image'
import styles from './Header.module.css'
import Link from 'next/link'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import Title from './Title'

const pageList = [
  {
    pageName: '/',
    title: 'Everything your home deserves',
    titleDescription: 'Our furniture is your reflection',
    className: 'home_header',
  },
  {
    pageName: 'catalog',
    title: 'Catalog',
    className: 'catalog_header',
  },
  {
    pageName: 'cart',
    title: 'Cart',
    className: 'cart_header',
  },
]

export default function Header() {
  const pathName = usePathname()

  const currentPage = pageList.filter((page) =>
    page.pageName.includes(pathName),
  ) // TODO: refactor
  const currentPageClassName = currentPage[0]?.className || 'catalog_header'

  return (
    <header className={classNames(styles[currentPageClassName], 'center')}>
      <div className={styles.header}>
        <Link href={'/'} className="logo logo_invert">
          <Image
            src="/assets/svg/logo.svg"
            width={193}
            height={35}
            alt="logo"
          />
        </Link>
        <input
          placeholder="Search"
          className={styles.header_input}
          type="search"
        />
        <nav className={styles.header_navigation}>
          <Link className={styles.nav_link} href="/catalog">
            Catalog
          </Link>
          <Link className={styles.nav_link} href="/cart">
            Cart
          </Link>
        </nav>
      </div>
      <Title
        title={currentPage[0]?.title}
        titleDescription={currentPage[0]?.titleDescription}
      />
    </header>
  )
}
