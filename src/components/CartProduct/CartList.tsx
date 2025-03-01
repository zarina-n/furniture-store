'use client'

import CartProduct from './CartProduct'
import { useUser } from '@/providers/UserProvider'
import { Product } from '@/lib/types'
import CartButtons from './CartButtons'

export default function CartList({ products }: { products: Product[] }) {
  const { firebaseUser } = useUser()

  const map = new Map(firebaseUser?.cart.map((item) => [item.itemId, item]))
  const cartItems = products.filter((item) => map.has(item.id))
  const emptyState = !!cartItems.length

  return (
    <>
      {cartItems.length
        ? cartItems.map((cartItem) => (
            <CartProduct cartItem={cartItem} key={cartItem.id} />
          ))
        : 'No items in the cart'}
      {/*todo: change text*/}
      <CartButtons emptyState={emptyState} />
    </>
  )
}
