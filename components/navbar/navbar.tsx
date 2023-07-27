'use client'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import  Link from 'next/link'

export default function Navbar() {

  const {status} = useSession();

  return (
    <>
    {/* {for large and medium devices } */}
    <div className='fixed top-0  z-10 flex w-full  lg:px-28 md:px-20 justify-between py-5'>
      <div>Logo</div>
      <div className='flex justify-between gap-10 '>
        <div><Link href={'/'}>Home</Link></div>
        <div>Blogs</div>
        <div>Search</div>
        <div>About</div>
        <div> { (status === 'authenticated') ? <button onClick={() => signOut() }>Logout</button> : <button onClick={ () => signIn() }>LogIn</button> }</div>
        <></>
      </div>
    </div>






    {/* {for small devices */}
    <div className='lg:hidden md:hidden fixed bottom-0 z-10 bg-blue-400 w-full py-5 flex justify-around'>
      <div>About</div>
      <div>Search</div>
      <div>Contact</div>
      </div>
    </>


    
  )
}
