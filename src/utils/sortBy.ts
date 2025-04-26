import { Product } from '@/lib/types'
import { sortByOptions } from '@/utils/sortByOptions'

export const sortBy = (option: string | undefined, arrayToSort: Product[]) => {
  const chosenOption = sortByOptions?.find(
    ({ value }) => value === option,
  )?.value

  switch (
    chosenOption // todo: add more sort options
  ) {
    // case 'newest': {
    //   console.log('newest')
    //   break
    // }
    // case 'featured': {
    //   console.log('featured')
    //   break
    // }
    case 'price:high-to-low': {
      const sortedArray = arrayToSort.sort((a, b) => b.price - a.price)
      return sortedArray
    }
    case 'price:low-to-high': {
      const sortedArray = arrayToSort.sort((a, b) => a.price - b.price)
      return sortedArray
    }
    default:
      return arrayToSort
  }
}
