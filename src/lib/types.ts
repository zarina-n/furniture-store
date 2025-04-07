export type Product = {
  name: string
  imgSrc: string[]
  shortDescription: string
  price: number
  discount?: boolean
  priceBeforeDiscount?: number | null | undefined
  id: string
  categories?: string[]
  inTheCart: boolean
  favorite: boolean
  amount?: number
  details: ProductDetail[]
  productHighlights: string[]
  longDescription: string[]
  availability: string
}

type ProductDetail = {
  label: string
  value: string
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
  cart: { amount: number; itemId: string; price: number }[]
} | null

export type UserContextType = {
  firebaseUser: FirebaseUser
}

export type CartItem = { itemId: string; amount: number; price?: number }

export type CartContextType = {
  cart: CartItem[]
  total: number
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateAmount: (id: string, amount: number) => void
  updateLocalStorage: (updatedCart: CartItem[]) => void
}
