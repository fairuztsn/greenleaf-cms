import "@/styles/globals.css";
import type { Metadata } from 'next';
import { Providers } from "./providers";
import { fontSans } from '@/config/fonts';
import clsx from "clsx";

export const metadata: Metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({children}: RootLayoutProps) {
  
  return (
    <html lang="en">
      <body className={clsx("font-sans antialiased", fontSans.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

