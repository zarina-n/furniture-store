'use client'

import styles from './ProductPage.module.css'
import { useProduct } from '@/providers/ProductProvider'
import { useEffect } from 'react'
import ProductDescription from './ProductDescription'
import ImageCarousel from './ImageCarousel'
import Products from '../Products/Products'
import ProductDetails from './ProductDetails'
import { useProducts } from '@/providers/ProductsProvider'

export default function ProductPage({ productId }: { productId: string }) {
  const { setProductName } = useProduct()
  const { products, getProductById } = useProducts()

  const product = getProductById(productId)

  useEffect(() => {
    if (product) setProductName(product.name)
  }, [product, setProductName])

  if (!product) return <div>Loading or product not found</div>

  return (
    <div className={styles.product_wrapper}>
      <div className={styles.top_section}>
        <ImageCarousel imgSrc={product.imgSrc} name={product.name} />
        <ProductDescription product={product} />
      </div>
      <ProductDetails product={product} />
      <div>
        <h4 className={styles.title}>Other designs you will love</h4>
        <div className="center">
          <Products products={products} />
        </div>
      </div>
    </div>
  )
}
