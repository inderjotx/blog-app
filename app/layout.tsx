import './globals.css'
import { Inter } from 'next/font/google'
import {Navbar, Footer} from '../components/index'
import { NextAuthProvider } from './provider';
import image from './../assets/background_image/desktop.png'
import Image from 'next/image';
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
      <body className={`${inter.className}`  }  style={{ width: "100%", height : '100%'}}>
             
              <NextAuthProvider>
                        <Navbar />
                               <div className='pt-20 h-full'>
                                  {children}
                                </div>
                        <Footer />
              </NextAuthProvider>
        </body>
    </html>
  )
}
