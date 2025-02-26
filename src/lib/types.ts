export type Product = {
  name: string
  imgSrc: string
  cartImgSrc: string
  shortDescription: string
  price: number
  discount?: boolean
  priceBeforeDiscount?: number | null | undefined
  id: string
  categories?: string[]
  inTheCart: boolean
  cartAmount: number | null
  favorite: boolean
}

export type SearchParamProps = {
  searchParams?: Promise<{
    query?: string
    category?: string
    sort?: string
  }>
}

export type AuthInputs = {
  name: 'email' | 'password' | 'repeat_password'
  type: string
  placeholder: string
}

export type NavbarPagesType = {
  href: string
  title: string
  titleDescription?: string
  className: string
  inTheMenu: boolean
  requiresAuth?: boolean
}

export type FirebaseUser = {
  name: string
  id: string
  favorites: string[]
  cart: { amount: number; itemId: string }[]
} | null

export type UserContextType = {
  firebaseUser: FirebaseUser
}
