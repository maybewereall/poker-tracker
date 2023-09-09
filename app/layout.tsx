import './globals.css'
import type { Metadata } from 'next'
import { Dosis } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { ToasterProvider } from '@/providers/toaster-provider';

import Container from '@/components/ui/container';
import { Navbar } from '@/components/navbar';
import AuthProvider from '@/providers/auth-provider';

const font = Dosis({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aria Poker Tracker',
  description: 'Next.js database application'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProvider>
          <ToasterProvider />
          <Navbar />
          <Container>
            {children}
          </Container>
        </AuthProvider>
      </body>
    </html>
  )
}
