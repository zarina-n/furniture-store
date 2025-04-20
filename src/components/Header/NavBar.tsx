'use client'

import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import styles from './Header.module.css'
import Link from 'next/link'
import { NavbarPagesType } from '@/lib/types'
import { useProducts } from '@/providers/ProductsProvider'
import { useUser } from '@/providers/UserProvider'
// import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

export default function NavBar({
  // todo: add loader to login/logout links
  navbarPages,
}: {
  navbarPages: NavbarPagesType[]
}) {
  const { isAuthenticated } = useUser()
  const { setCart } = useProducts()
  // const { isLoading } = useKindeBrowserClient() // todo: add user provider

  return (
    <nav className={styles.navbar_navigation}>
      {navbarPages.map((page) => {
        if (page.requiresAuth && !isAuthenticated) {
          return null
        }

        return (
          page.inTheMenu && (
            <Link
              key={page.href}
              className={styles.nav_link}
              href={`/${page.href}`}
            >
              {page.title}
            </Link>
          )
        )
      })}

      {isAuthenticated ? (
        <LogoutLink className={styles.nav_link} onClick={() => setCart([])}>
          Logout
        </LogoutLink>
      ) : (
        <LoginLink className={styles.nav_link}>Login</LoginLink>
      )}
    </nav>
  )
}
