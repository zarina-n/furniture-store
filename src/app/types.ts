export type Product = {
  name: string
  imgSrc: string
  description: string
  price: number
  discount?: boolean
  priceBeforeDiscount?: number | null | undefined
  id: number
  category?: string[]
}

export type SearchParamProps = {
  searchParams?: Promise<{
    query?: string
  }>
}
