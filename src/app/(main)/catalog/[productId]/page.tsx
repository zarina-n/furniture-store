import ProductPage from '@/components/ProductPage/ProductPage'

export default async function Product({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params
  return <ProductPage productId={productId} />
}
