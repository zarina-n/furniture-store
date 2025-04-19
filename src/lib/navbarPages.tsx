import { NavbarPagesType } from './types'

export const navbarPages: NavbarPagesType[] = [
  {
    href: '',
    title: 'Everything your home deserves',
    titleDescription: 'Our furniture is your reflection',
    className: 'home_header',
    inTheMenu: false,
  },
  {
    href: 'catalog',
    title: 'Catalog',
    className: 'catalog_header',
    inTheMenu: true,
  },
  {
    href: 'cart',
    title: 'Cart',
    className: 'cart_header',
    inTheMenu: true,
  },
  {
    href: 'catalog/favorites',
    title: 'Favorites',
    className: 'cart_header',
    inTheMenu: true,
    requiresAuth: true,
  },
]
