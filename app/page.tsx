import { Post } from '@prisma/client';
import Link from 'next/link'
const URL = 'http://localhost:3000/api'

async function getPosts(){
  const data  = await fetch(URL, {next : {revalidate : 1000 }})
  const posts = await data.json()  
  return posts;
}

export default async   function Home() {
    const posts : any[] = await getPosts(); 
    return (
        <div>
              <div>
                <div>{}</div>
                      <div>
                      <Link href={'/admin/create_new'}>Create Post</Link>
                      </div>
              </div>
              <div>
              <div>{ posts.map( ( object : Post, index  ) => ( <Link href={`/article/${index}`}><div>{ object.id }</div></Link> ))}</div>
              </div>
        </div>

      )
}
        
