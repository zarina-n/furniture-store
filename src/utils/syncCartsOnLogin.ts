'use client'

import { addOrUpdateCartItem } from '@/app/api/actions'
import { CartItem } from '@/lib/types'
import { toast } from 'sonner'

export const syncCartsOnLogin = async ({
  userId,
  localCart,
  userCart,
  merge,
  setCart,
}: {
  userId: string
  localCart: CartItem[]
  userCart: CartItem[]
  merge: boolean
  setCart: (items: CartItem[]) => void
}) => {
  const localHasItems = localCart.length > 0
  const userHasItems = userCart.length > 0

  try {
    if (userHasItems && !localHasItems) {
      setCart(userCart)
      return
    }

    if (merge && localHasItems && userHasItems) {
      await mergeCarts({ localCart, userCart, userId, setCart })
      return
    }

    if (localHasItems && !userHasItems) {
      await syncLocalToUser({ localCart, userId })
      return
    }

    if (userHasItems && localHasItems) {
      setCart(userCart)
      return
    }

    setCart([])
  } catch (error) {
    toast.error(`An error occurred while syncing your cart: ${error}`)
  }
}

const mergeCarts = async ({
  localCart,
  userCart,
  userId,
  setCart,
}: {
  localCart: CartItem[]
  userCart: CartItem[]
  userId: string
  setCart: (items: CartItem[]) => void
}) => {
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

  const results = await Promise.all(
    mergedCart.map((item) => addOrUpdateCartItem(userId, item)),
  )

  const hasError = results.some((res) => !res.success)
  if (hasError) {
    toast.error('Some items in your cart could not be merged.')
  }
}

const syncLocalToUser = async ({
  localCart,
  userId,
}: {
  localCart: CartItem[]
  userId: string
}) => {
  const results = await Promise.all(
    localCart.map((item) => addOrUpdateCartItem(userId, item)),
  )

  const hasError = results.some((res) => !res.success)
  if (hasError) {
    toast.error('Some items could not be synced to your cart.')
  }
}
