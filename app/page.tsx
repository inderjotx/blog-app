import { Post } from '@prisma/client';
import Link from 'next/link'
const URL = 'http://localhost:3000/api'
import posts from './../testing_data/posts.json'
import { Card } from './../components/index'

async function getPosts(){
  // const data  = await fetch(URL, {next : {revalidate : 1000 }})
  // const posts = await data.json()  
  // console.log("rendering ...")
  return posts;
}

export default async   function Home() {
    const posts  = await getPosts(); 
    return (
            <div className='mx-40' >
            <div>
                <div>{}</div>
                      <div>
                      <Link href={'/admin/create_new'}>create post</Link>
                      </div>
              </div>
              <div>
              {/* <div>{ posts.map( ( object : post, index  ) => ( <link href={`/article/${index}`}><div>{ object.id }</div></link> ))}</div> */}
              {/* { posts.map((element, index)  => <div key={index} ><Link href={`/posts/${index}`}> {element.heading}</Link></div>)} */}
              </div>
              <div>
                <Card post={posts[0]} height={'400px'} width={'300px'} />
              </div>
        </div>

      )
}
        
