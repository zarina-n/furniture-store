import type { Metadata } from 'next'
import './globals.css'
import { Suspense } from 'react'
import { Toaster } from 'sonner'
export const metadata: Metadata = {
  title: 'Interior',
  description: 'Furniture Store',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster richColors position="top-right" />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
