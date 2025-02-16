import type { Metadata } from 'next'
import './globals.css'
import { Suspense } from 'react'

import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Interior',
  description: 'Furniture Store',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
