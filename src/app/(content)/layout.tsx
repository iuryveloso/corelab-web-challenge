import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Core Notes',
  description: 'Um simples gerenciador de notas',
}

interface ContentLayout {
  children: React.ReactNode
}

export default function ContentLayout({ children }: Readonly<ContentLayout>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className={'h-screen overflow-y-auto bg-gray-100 text-gray-700'}>
          {children}
        </div>
      </body>
    </html>
  )
}
