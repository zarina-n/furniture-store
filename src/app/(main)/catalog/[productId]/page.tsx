import { getProduct, getProducts } from '@/app/api/actions'
import ProductPage from '@/components/ProductPage/ProductPage'
import { Product as ProductType } from '@/lib/types'

export default async function Product({
  params,
}: {
  params: { productId: string }
}) {
  const { productId } = await params
  const product = (await getProduct(productId)) as ProductType
  const products = await getProducts()
  return <ProductPage product={product} products={products} />
}
