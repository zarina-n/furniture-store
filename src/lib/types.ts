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
  cart: { amount: number; id: string; price: number }[]
} | null

export type FirebaseUserResult =
  | FirebaseUser
  | { success: false; message: string }

export type UserContextType = {
  firebaseUser: FirebaseUser
  isAuthenticated: boolean
}

export type CartItem = { id: string; amount: number; price: number }

export type CartContextType = {
  cart: CartItem[]
  total: number
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateAmount: (id: string, amount: number) => void
  updateLocalStorage: (updatedCart: CartItem[]) => void
}

export interface LocalState {
  cart: CartItem[]
  products: Product[]
  favorites: string[]
  setProducts: (products: Product[]) => void
  setFavorites: (ids: string[]) => void
  setCart: (items: CartItem[]) => void
  getProductById: (id: string) => Product | undefined
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateAmount: (itemId: string, amount: number) => void
  updateLocalStorage: (updatedCart: CartItem[]) => void
}
