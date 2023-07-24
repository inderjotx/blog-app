'use client'
import { useSession } from 'next-auth/react';
import { Post } from '@prisma/client';
import Link from 'next/link'
const URL = 'http://localhost:3000/api'
import { useEffect, useState } from 'react'


export default  function Home() {
  const  profile = useSession()
  const [ posts , setPosts ] = useState<any[]>([]);

  
  useEffect(  () => {
      async function fetcher(url  : string ){
        const data = await fetch(url);
        const posts : Post[] | null  = await data.json();
        return posts ;
      }

      fetcher(URL)
      .then( (postsData) => {

      
          if ( postsData){
            setPosts(postsData) 
          }
          else{
            console.log("No Posts yet")
          }

        }
           
      )
      .catch( (err) => console.log(err) )

    }, [])

  return (
        <div>
              <div>
                <div>{ profile.data?.user?.name}</div>
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
        
