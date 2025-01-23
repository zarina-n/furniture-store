import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'

export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="center">
      <Breadcrumbs />
      {children}
    </div>
  )
}
