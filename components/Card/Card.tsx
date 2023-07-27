import React from 'react'
import Image from 'next/image'


interface Post{
    heading : string 
    creator : string
    mainImage : string 
} 

export default function Card({post, height , width } : {post : Post, height : string , width : string} ) {
  return (
    <div>     
        <div className='flex flex-col  border border-slate-950 rounded-md  p-2 align-middle gap-2 bg-white' style={{ height : `${height}`, width : `${width}`}}>
        <div className='flex h-4/5 w-full'>
                <Image alt='bondu' unoptimized={true} width={20} height={50} className='h-full w-full object-cover rounded-sm' src={post.mainImage}  />
        </div>

        <div className='flex justify-center'>
            {post.heading}
        </div>

        <div>
            {post.creator}
        </div>

    </div>
    </div>
  )
}
