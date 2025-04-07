import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import { ProductProvider } from '@/providers/ProductProvider'

export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ProductProvider>
      <div className="center">
        <Breadcrumbs />
        {children}
      </div>
    </ProductProvider>
  )
}
