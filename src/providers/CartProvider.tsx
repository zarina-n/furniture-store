'use client'

import { CartContextType, CartItem } from '@/lib/types'
import { CART } from '@/utils/constants'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext<CartContextType>({
  cart: [],
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateAmount: () => {},
  updateLocalStorage: () => {},
})

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.price || 0) * item.amount, 0)
  }, [cart])

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(storedCart)
  }, [])

  const updateLocalStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem(CART, JSON.stringify(updatedCart))
    setCart(updatedCart)
  }

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.itemId === item.itemId)
      const newCart = existing ? prevCart : [...prevCart, item]

      updateLocalStorage(newCart)
      return newCart
    })
  }

  const removeFromCart = (id: string) => {
    const newCart = cart.filter((item) => item.itemId !== id)
    updateLocalStorage(newCart)
  }

  const updateAmount = (itemId: string, amount: number) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.itemId === itemId ? { ...item, amount } : item,
      )
      updateLocalStorage(newCart)
      return newCart
    })
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        addToCart,
        removeFromCart,
        updateAmount,
        updateLocalStorage,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider') // todo: repeated, move to a separate file
  }
  return context
}
