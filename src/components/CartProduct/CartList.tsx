'use client'

import CartProduct from './CartProduct'
import { useUser } from '@/providers/UserProvider'
import { Product } from '@/lib/types'
import CartButtons from './CartButtons'
import { useEffect, useMemo } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useCart } from '@/providers/CartProvider'

export default function CartList({ products }: { products: Product[] }) {
  const { firebaseUser } = useUser()
  const { isAuthenticated } = useKindeBrowserClient()
  const { cart, updateLocalStorage } = useCart()

  useEffect(() => {
    if (isAuthenticated && firebaseUser?.cart) {
      updateLocalStorage(firebaseUser.cart)
    } else {
      updateLocalStorage(cart)
    }
  }, [isAuthenticated, firebaseUser?.cart, cart, updateLocalStorage])

  const cartMap = useMemo(() => {
    const cartData = isAuthenticated ? firebaseUser?.cart : cart
    return new Map(cartData?.map((item) => [item.itemId, item]) ?? [])
  }, [isAuthenticated, firebaseUser?.cart, cart])

  const cartItems = useMemo(
    () =>
      products
        .filter((item) => cartMap.has(item.id))
        .map((item) => ({
          ...item,
          amount: cartMap.get(item.id)?.amount ?? 1,
        })),
    [products, cartMap],
  )

  const emptyState = !!cartItems.length

  return (
    <>
      {cartItems.length
        ? cartItems.map((cartItem) => (
            <CartProduct cartItem={cartItem} key={cartItem.id} />
          ))
        : 'Your cart is empty'}
      <CartButtons emptyState={emptyState} />
    </>
  )
}
