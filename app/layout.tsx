import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })


import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider defaultTheme='system' attribute='class' enableSystem>
            <ModalProvider/>
            <ToastProvider/>
            { children }
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
