import { Post } from '@prisma/client';
import Link from 'next/link'
const URL = 'http://localhost:3000/api'
import posts from './../testing_data/posts.json'
 

async function getPosts(){
  // const data  = await fetch(URL, {next : {revalidate : 1000 }})
  // const posts = await data.json()  
  // console.log("rendering ...")
  return posts;
}

export default async   function Home() {
    const posts  = await getPosts(); 
    return (
        <div>
              <div>
                <div>{}</div>
                      <div>
                      <Link href={'/admin/create_new'}>Create Post</Link>
                      </div>
              </div>
              <div>
              {/* <div>{ posts.map( ( object : Post, index  ) => ( <Link href={`/article/${index}`}><div>{ object.id }</div></Link> ))}</div> */}
              { posts.map((element, index)  => <div key={index} ><Link href={`/posts/${index}`}> {element.heading}</Link></div>)}
              </div>
        </div>

      )
}
        
