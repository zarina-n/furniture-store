'use client'

import { getProducts } from '@/app/api/actions'
import { useProducts } from '@/providers/ProductsProvider'
import { useEffect } from 'react'

export default function HydrateProducts() {
  const { setProducts } = useProducts()

  useEffect(() => {
    const fetch = async () => {
      const products = await getProducts()
      setProducts(products)
    }
    fetch()
  }, [setProducts])

  return null
}
