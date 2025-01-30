export type Product = {
  name: string
  imgSrc: string
  cartImgSrc: string
  description: string
  price: number
  discount?: boolean
  priceBeforeDiscount?: number | null | undefined
  id: number
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

export type AuthInputName =
  | 'username'
  | 'email'
  | 'password'
  | 'repeat_password'

export type AuthInputs = {
  name: AuthInputName
  type: string
  placeholder: string
  label?: string
}
