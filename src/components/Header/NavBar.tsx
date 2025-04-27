'use client'

import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import styles from './Header.module.css'
import Link from 'next/link'
import { NavbarPagesType } from '@/lib/types'
import { useUser } from '@/providers/UserProvider'
import { FaRegCircleUser } from 'react-icons/fa6'
import { TbLogout } from 'react-icons/tb'
import { useCartSyncStore } from '@/stores/cartSyncStore'
import cn from 'classnames'
import { useProductsStore } from '@/stores/productsStore'

export default function NavBar({
  // todo: add loader to login/logout links
  navbarPages,
}: {
  navbarPages: NavbarPagesType[]
}) {
  const { isAuthenticated, firebaseUser } = useUser()
  const { setCart, cart } = useProductsStore.getState()
  const { setHasSynced, setHasMerged } = useCartSyncStore.getState()
  const itemsInTheCart = !!cart.length || !!firebaseUser?.cart.length

  const logoutHandler = () => {
    setCart([])
    setHasSynced(false)
    setHasMerged(false)
  }

  // todo: add alt for svg

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
              className={cn(
                styles.nav_link,
                page.extraStyle && itemsInTheCart && styles.items_in_the_cart,
              )}
              href={`/${page.href}`}
            >
              {page.icon}
            </Link>
          )
        )
      })}

      {isAuthenticated ? (
        <LogoutLink className={styles.nav_link} onClick={logoutHandler}>
          <TbLogout />
        </LogoutLink>
      ) : (
        <LoginLink className={styles.nav_link}>
          <FaRegCircleUser />
        </LoginLink>
      )}
    </nav>
  )
}
