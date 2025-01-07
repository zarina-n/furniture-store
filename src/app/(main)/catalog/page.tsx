import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Interior - Catalog',
  description: 'Catalog',
}

export default function Catalog({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <> {children}</>
}
