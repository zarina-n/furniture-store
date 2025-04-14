import { addOrUpdateCartItem } from '@/app/api/actions'
import { CartItem } from '@/lib/types'
import { useProductsStore } from '@/stores/productsStore'

export const syncCartsOnLogin = async ({
  userId,
  localCart,
  userCart,
  merge,
}: {
  userId: string
  localCart: CartItem[]
  userCart: CartItem[]
  merge: boolean
}) => {
  const setCart = useProductsStore.getState().setCart

  const localHasItems = localCart.length > 0
  const userHasItems = userCart.length > 0

  if (!userHasItems && localHasItems) {
    await Promise.all(
      localCart.map((item) => addOrUpdateCartItem(userId, item)),
    )
    return
  }

  if (merge && localHasItems && userHasItems) {
    const mergedMap = new Map<string, CartItem>()

    localCart.forEach((item) => {
      mergedMap.set(item.id, { ...item })
    })

    userCart.forEach((item) => {
      if (mergedMap.has(item.id)) {
        const existing = mergedMap.get(item.id)!
        mergedMap.set(item.id, {
          ...existing,
          amount: (existing.amount || 0) + (item.amount || 0),
        })
      } else {
        mergedMap.set(item.id, { ...item })
      }
    })

    const mergedCart = Array.from(mergedMap.values())

    setCart(mergedCart)
    await Promise.all(
      mergedCart.map((item) => addOrUpdateCartItem(userId, item)),
    )
  }
}
