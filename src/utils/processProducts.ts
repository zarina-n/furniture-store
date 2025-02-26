import { Product } from '@/lib/types'

const filterBySearchQuery = (
  products: Product[],
  query: string | undefined,
): Product[] => {
  if (!query) return products

  const lowerCaseQuery = query.toLowerCase()
  return products.filter(
    ({ name, shortDescription }) =>
      name.toLowerCase().includes(lowerCaseQuery) ||
      shortDescription.toLowerCase().includes(lowerCaseQuery),
  )
}

const limitProducts = (products: Product[], limit?: number): Product[] =>
  limit ? products.slice(0, limit) : products

export const processProducts = (
  products: Product[],
  numberOfProductsToDisplay?: number,
  searchQuery?: string,
): Product[] => {
  return filterBySearchQuery(
    limitProducts(products, numberOfProductsToDisplay),
    searchQuery,
  )
}
