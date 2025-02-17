'use client'

import Image from 'next/image'
import styles from './Header.module.css'
import Link from 'next/link'
import classNames from 'classnames'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import Title from './Title'
import { ChangeEvent } from 'react'
import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

const pageList = [
  {
    pageName: '/',
    title: 'Everything your home deserves',
    titleDescription: 'Our furniture isLoading your reflection',
    className: 'home_header',
    inTheMenu: false,
  },
  {
    pageName: 'catalog',
    title: 'Catalog',
    className: 'catalog_header',
    inTheMenu: true,
  },
  {
    pageName: 'cart',
    title: 'Cart',
    className: 'cart_header',
    inTheMenu: true,
  },
  {
    pageName: 'account',
    title: 'Account',
    className: 'cart_header',
    inTheMenu: true,
    requiresAuth: true,
  },
  {
    pageName: 'catalog/favorites',
    title: 'Favorites',
    className: 'cart_header',
    inTheMenu: true,
    requiresAuth: true,
  },
]

export default function Header() {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const { isAuthenticated, isLoading } = useKindeBrowserClient()

  const currentPage = pageList.filter((page) =>
    page.pageName.includes(pathName.slice(1).split('/')[0]),
  ) // TODO: refactor

  const currentPageClassName = currentPage[0]?.className || 'catalog_header'

  const onSearchHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams)
    const searchValue = e.target.value

    if (searchValue) {
      params.set('query', searchValue)
    } else {
      params.delete('query')
    }

    router.replace(`${pathName}?${params.toString()}`)
  }

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
          onChange={onSearchHandle}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <nav className={styles.header_navigation}>
          {isLoading
            ? 'Loading...'
            : pageList.map((page) => {
                if (page.requiresAuth && !isAuthenticated) {
                  return null
                }

                return (
                  page.inTheMenu && (
                    <Link
                      key={page.pageName}
                      className={styles.nav_link}
                      href={`/${page.pageName}`}
                    >
                      {page.title}
                    </Link>
                  )
                )
              })}

          {isAuthenticated ? (
            <LogoutLink className={styles.nav_link}>Logout</LogoutLink>
          ) : (
            <LoginLink className={styles.nav_link}>Login</LoginLink>
          )}
        </nav>
      </div>
      <Title
        title={currentPage[0]?.title}
        titleDescription={currentPage[0]?.titleDescription}
      />
    </header>
  )
}
