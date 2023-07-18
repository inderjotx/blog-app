import './globals.css'
import { Inter } from 'next/font/google'
import {Navbar, Footer} from '../components/index'
import { NextAuthProvider } from './provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Inder Log',
  description: 'Blog for ass people',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
              <NextAuthProvider>
                        <Navbar />
                               <div className='pt-20'>
                                  {children}
                                </div>
                        <Footer />
              </NextAuthProvider>
        </body>
    </html>
  )
}
