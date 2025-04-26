import { NavbarPagesType } from './types'
import { BiShoppingBag } from 'react-icons/bi'
import { FaRegCircleUser, FaRegHeart } from 'react-icons/fa6'
import { RiSofaLine } from 'react-icons/ri'

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
    icon: <RiSofaLine />,
  },

  {
    href: 'account',
    title: 'Account',
    className: 'account_header',
    inTheMenu: true,
    requiresAuth: true,
    icon: <FaRegCircleUser />,
  },
  {
    href: 'catalog/favorites',
    title: 'Favorites',
    className: 'cart_header',
    inTheMenu: true,
    requiresAuth: true,
    icon: <FaRegHeart />,
  },
  {
    href: 'cart',
    title: 'Cart',
    className: 'cart_header',
    extraStyle: true,
    inTheMenu: true,
    icon: <BiShoppingBag />,
  },
]
