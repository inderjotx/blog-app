'use client'
const URL = 'http://localhost:3000/api'
import { useSession } from 'next-auth/react';
import parser from 'html-react-parser'
import { Blog } from '@prisma/client';


import Link from 'next/link'
import { ExecFileSyncOptionsWithBufferEncoding } from 'child_process';

async function getData(){
  const data = await fetch(URL, { next : { revalidate : 10}});
  const repo : Blog[] = await data.json();
  return { props : { repo }};
}


export default async function Home() {
  const  profile = useSession()
  const data  = await getData();
  

  return (
        <div>
              <div>
                <div>Hi { JSON.stringify(profile.data) }</div>
                      <div>
                      <Link href={'/admin/create_new'}>Create Post</Link>
                      </div>
              </div>
              <div>
              <div>{data.props.repo.map( ( object : Blog, index  ) => ( <Link href={`/article/${index}`}><div>{ object.blog_id }</div></Link> ))}</div>
              </div>
        </div>
       
  )
}
