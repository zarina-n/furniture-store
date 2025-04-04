'use client'

import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import styles from './Header.module.css'
import Link from 'next/link'
import { NavbarPagesType } from '@/lib/types'
import { useCart } from '@/providers/CartProvider'

export default function NavBar({
  navbarPages,
}: {
  navbarPages: NavbarPagesType[]
}) {
  const { isAuthenticated, isLoading } = useKindeBrowserClient() // todo: add user provider
  const { updateLocalStorage } = useCart()

  return (
    <nav className={styles.navbar_navigation}>
      {isLoading ? (
        <p style={{ color: 'white' }}>Loading...</p> // todo: replace
      ) : (
        <>
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
            <LogoutLink
              className={styles.nav_link}
              onClick={() => updateLocalStorage([])}
            >
              Logout
            </LogoutLink>
          ) : (
            <LoginLink className={styles.nav_link}>Login</LoginLink>
          )}
        </>
      )}
    </nav>
  )
}
