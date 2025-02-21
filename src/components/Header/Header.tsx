'use client'

import Image from 'next/image'
import styles from './Header.module.css'
import Link from 'next/link'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import Title from './Title'
import Search from './Search'
import NavBar from './NavBar'
import { navbarPages } from '@/lib/navbarPages'

export default function Header() {
  const pathName = usePathname().slice(1).split('/')[0]

  const navbarPagesMap = new Map(navbarPages.map((page) => [page.href, page]))
  const currentPage = navbarPagesMap.get(pathName) || navbarPagesMap.get('')
  const currentPageClassName = currentPage?.className ?? 'home_header' // todo: move to a constant

  return (
    <header
      className={classNames(
        styles[currentPageClassName],
        styles.header,
        'center',
      )}
    >
      <div className={styles.navbar}>
        <Link href={'/'} className="logo logo_invert">
          <Image
            src="/assets/svg/logo.svg"
            width={193}
            height={35}
            alt="logo"
          />
        </Link>
        <Search />
        <NavBar navbarPages={navbarPages} />
      </div>
      {currentPage && (
        <Title
          title={currentPage.title}
          titleDescription={currentPage.titleDescription}
        />
      )}
    </header>
  )
}
