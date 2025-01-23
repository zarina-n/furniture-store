import { Product } from '@/lib/types'

export const filterBy = (
  filters: string[] | undefined,
  arrayToFilter: Product[],
): Product[] => {
  if (!filters || filters.length === 0) {
    return arrayToFilter
  }

  const isSaleFilterActive = filters.includes('sale')
  const categoryFilters = filters.filter((filter) => filter !== 'sale')

  return arrayToFilter.filter((product) => {
    const matchesCategory =
      categoryFilters.length === 0 ||
      product.categories?.some((category) => categoryFilters.includes(category))

    const matchesSale =
      !isSaleFilterActive ||
      (product.priceBeforeDiscount !== null &&
        product.priceBeforeDiscount !== undefined)

    return matchesCategory && matchesSale
  })
}
