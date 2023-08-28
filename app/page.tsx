import { Post } from '@prisma/client';
import Link from 'next/link'
const URL = 'http://localhost:3000/api'
import posts from './../testing_data/posts.json'
import { Card } from './../components/index'
import { getPosts as gP } from '../utils/notion/helper-functions'

async function getPosts(){
  // const data  = await fetch(URL, {next : {revalidate : 1000 }})
  // const posts = await data.json()  
  // console.log("rendering ...")

    gP()
    .then( (d) => console.log(d))
    .catch(e => console.log(e));

    return {posts : posts , mdBlocks : "", mdString  : "" };
  
}

export default async   function Home() {
    const {posts, mdBlocks , mdString }  = await getPosts(); 
    
    return (
      <div className='h-full hero_margin'>
       <div className='my_grid'>
        { posts.map( (post, index) => {
          if ( index == 0){
                return <div className='hero_content grid_children'><Link href={`posts/${index}`} >Special Content </Link></div>        
 } 
          else if ( index == 10){
                return <div className='base_content grid_children'>Special Content </div>
          }
          else{
                  return <div key={index} className='grid_children'><Card  post={post} height='250px' width='250px'  /></div>
          }
        })}
        </div> 
     
        </div>

      )
}
        
