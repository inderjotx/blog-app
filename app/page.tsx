'use client'
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { Post } from '@prisma/client';
import Link from 'next/link'
const URL = 'http://localhost:3000/api'
import { use } from 'react'


async function fetcher(url  : string ){
  const data = await fetch(url);
  const repo : Post[] = await data.json();

  return { props : { repo }};
}


const dataPromise = fetcher(URL);


export default  function Home() {
  const  profile = useSession()
  const  data = use(dataPromise);
  console.log("panda")
  return (
        <div>
              <div>
                <div>Hi { profile.data?.user?.name }</div>
                      <div>
                      <Link href={'/admin/create_new'}>Create Post</Link>
                      </div>
              </div>
              <div>
              <div>{ data?.props.repo.map( ( object : Post, index  ) => ( <Link href={`/article/${index}`}><div>{ object.id }</div></Link> ))}</div>
              </div>
        </div>
       
  )
}
