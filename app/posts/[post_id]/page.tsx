import posts from './../../../testing_data/posts.json'
import Image from 'next/image'


export default function Post({ object } : { object : { post_id : string }}){
    const post = posts[0]
    return (
    <div className='flex flex-col  h-80 border border-slate-950 rounded-md w-60 p-2 align-middle gap-2'>
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
    )
}