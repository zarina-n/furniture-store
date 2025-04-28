'use client'

import Products from '../Products/Products'
import { filterBy } from '@/utils/filterBy'
import { sortBy } from '@/utils/sortBy'
import { useProducts } from '@/providers/ProductsProvider'

interface Props {
  categories: string[]
  sortOption: string
  query: string
}

export default function CatalogProducts({
  categories,
  sortOption,
  query,
}: Props) {
  const { products } = useProducts()
  const filteredArray = filterBy(categories, products)
  const sortedArray = sortBy(sortOption, filteredArray)

  return <Products products={sortedArray} searchQuery={query} />
}
