'use client'

import { Product } from '@/lib/types'
import styles from './ProductPage.module.css'
import { useProduct } from '@/providers/ProductProvider'
import { useEffect } from 'react'
import ProductDescription from './ProductDescription'
import ImageCarousel from './ImageCarousel'
import Products from '../Products/Products'
import ProductDetails from './ProductDetails'

export default function ProductPage({
  product,
  products,
}: {
  product: Product
  products: Product[]
}) {
  const { setProductName } = useProduct()

  useEffect(() => {
    setProductName(product.name)
  }, [product, setProductName])

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
