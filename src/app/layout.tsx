import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Advanced Token Decoder',
  description: 'Decode JWT, Base64, URL-encoded, and Hex tokens with ease',
}

export default function RootLayout({ children}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
          {children}
        </div>
      </body>
    </html>
  )
}