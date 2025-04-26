import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LocalState } from '@/lib/types'
import { LOCALSTORAGE_NAME } from '@/lib/constants'

export const useProductsStore = create<LocalState>()(
  persist(
    (set, get) => ({
      cart: [],
      products: [],
      favorites: [],
      setProducts: (products) => set({ products }),
      setFavorites: (ids) => set({ favorites: ids }),
      getProductById: (id) =>
        get().products.find((product) => product.id === id),
      setCart: (items) => set({ cart: items }),
      addToCart: (item) => {
        const existing = get().cart.find((i) => i.id === item.id)
        const newCart = existing ? get().cart : [...get().cart, item]
        get().updateLocalStorage(newCart)
      },
      removeFromCart: (id) => {
        const newCart = get().cart.filter((item) => item.id !== id)
        get().updateLocalStorage(newCart)
      },
      updateAmount: (id, amount) => {
        const newCart = get().cart.map((item) =>
          item.id === id ? { ...item, amount } : item,
        )
        get().updateLocalStorage(newCart)
      },
      updateLocalStorage: (updatedCart) => {
        set({ cart: updatedCart })
      },
    }),
    { name: LOCALSTORAGE_NAME },
  ),
)
