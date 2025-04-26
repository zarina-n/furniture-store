'use client'

import { getProducts } from '@/app/api/actions'
import { useProducts } from '@/providers/ProductsProvider'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function HydrateProducts() {
  const { setProducts } = useProducts()

  useEffect(() => {
    const fetch = async () => {
      const result = await getProducts()

      if (Array.isArray(result)) {
        setProducts(result)
      } else {
        toast.error(result.message)
      }
    }

    fetch()
  }, [setProducts])

  return null
}
