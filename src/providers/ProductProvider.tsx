'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ProductContextType {
  productName: string | null
  setProductName: (name: string) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [productName, setProductName] = useState<string | null>(null)

  return (
    <ProductContext.Provider value={{ productName, setProductName }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProduct() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider')
  }
  return context
}
