'use client'

import Image from 'next/image'
import styles from './Header.module.css'
import Link from 'next/link'
import classNames from 'classnames'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import Title from './Title'
import { ChangeEvent } from 'react'
import { signUserOut } from '@/api/actions/actions'
import { useUserProvider } from '@/providers/UserProvider'
import { ROOT_URL } from '@/lib/constants'

const pageList = [
  // TODO: move to the separate file
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

  {
    pageName: 'account',
    title: 'Account',
    className: 'account_header',
  },
]

export default function Header() {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useUserProvider()
  const isUserLoggedIn = !!user?.email

  const signOut = async () => {
    await signUserOut()
    router.push(ROOT_URL)
  }

  const currentPage = pageList.filter((page) =>
    page.pageName.includes(pathName.slice(1).split('/')[0]),
  ) // TODO: refactor

  const currentPageClassName = currentPage[0]?.className

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

  const onLoginHandle = () => {
    const params = new URLSearchParams(searchParams)
    params.set('modal', 'login')
    router.replace(`${pathName}?${params.toString()}`)
  }

  return (
    <header
      className={classNames(
        styles[currentPageClassName],
        styles.header_background,
        'center',
      )}
    >
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
          <Link className={styles.nav_link} href={'/catalog'}>
            Catalog
          </Link>
          <Link className={styles.nav_link} href={'/cart'}>
            Cart
          </Link>

          {isUserLoggedIn ? (
            <>
              <Link href={`/catalog/favorites`} className={styles.nav_link}>
                Favorites
              </Link>
              <Link href={`/account`} className={styles.nav_link}>
                My account
              </Link>
              <Link
                href={`${pathName}`}
                // replace
                // shallow
                className={styles.nav_link}
                onClick={signOut}
              >
                Sign Out
              </Link>
            </>
          ) : (
            <Link
              href={`${pathName}?modal=login`}
              replace
              shallow
              className={styles.nav_link}
              onClick={onLoginHandle}
            >
              Login
            </Link>
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
