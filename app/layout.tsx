import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'YouTube Channel Manager',
  description: 'Manage your running channel and video ideas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
