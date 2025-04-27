'use client'

import { LocalState } from '@/lib/types'
import { useProductsStore } from '@/stores/productsStore'
import { createContext, useContext } from 'react'

const ProductsContext = createContext<LocalState>({
  cart: [],
  products: [],
  favorites: [],
  setProducts: () => {},
  setFavorites: () => {},
  setCart: () => {},
  getProductById: () => undefined,
  addToCart: () => {},
  removeFromCart: () => {},
  updateAmount: () => {},
  updateLocalStorage: () => {},
})

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const cart = useProductsStore((state) => state.cart)
  const products = useProductsStore((state) => state.products)
  const favorites = useProductsStore((state) => state.favorites)
  const getProductById = useProductsStore((state) => state.getProductById)
  const addToCart = useProductsStore((state) => state.addToCart)
  const removeFromCart = useProductsStore((state) => state.removeFromCart)
  const updateAmount = useProductsStore((state) => state.updateAmount)
  const setCart = useProductsStore((state) => state.setCart)
  const updateLocalStorage = useProductsStore(
    (state) => state.updateLocalStorage,
  )
  const setProducts = useProductsStore((state) => state.setProducts)
  const setFavorites = useProductsStore((state) => state.setFavorites)

  return (
    <ProductsContext.Provider
      value={{
        cart,
        products,
        favorites,
        addToCart,
        removeFromCart,
        updateAmount,
        updateLocalStorage,
        getProductById,
        setCart,
        setProducts,
        setFavorites,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider') // todo: repeated, move to a separate file
  }
  return context
}
