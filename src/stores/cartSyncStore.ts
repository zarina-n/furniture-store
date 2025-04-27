import { CART_SYNCED_NAME } from '@/lib/constants'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartSyncStore = {
  hasSynced: boolean
  setHasSynced: (value: boolean) => void
  hasMerged: boolean
  setHasMerged: (value: boolean) => void
}

export const useCartSyncStore = create<CartSyncStore>()(
  persist(
    (set) => ({
      hasSynced: false,
      hasMerged: false,
      setHasSynced: (value) => set({ hasSynced: value }),
      setHasMerged: (value) => set({ hasMerged: value }),
    }),
    {
      name: CART_SYNCED_NAME,
      storage: {
        getItem: (key) => {
          if (typeof window === 'undefined') return null
          const item = sessionStorage.getItem(key)
          return item ? JSON.parse(item) : null
        },
        setItem: (key, value) => {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(key, JSON.stringify(value))
          }
        },
        removeItem: (key) => {
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem(key)
          }
        },
      },
    },
  ),
)
