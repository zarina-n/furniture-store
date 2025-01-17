export type Product = {
  name: string
  imgSrc: string
  cartImgSrc?: string
  description: string
  price: number
  discount?: boolean
  priceBeforeDiscount?: number | null | undefined
  id: number
  category?: string[]
  inTheCart: boolean
  cartAmount: number | null
  favorite: boolean
}

export type SearchParamProps = {
  searchParams?: Promise<{
    query?: string
  }>
}
