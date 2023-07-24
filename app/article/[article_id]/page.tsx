import React from 'react'
import parser from 'html-react-parser'
import { Post } from '@prisma/client'
const URL = "http://localhost:3000/api"



async function getPost(id : number){
   const data = await fetch(URL, { cache : "no-cache"});
   const jsonData : Post[] = await data.json();
 
  return { props : jsonData[id] }
}


export default async  function article({params } : {  params :  { article_id : string }}) {


  const data  = await getPost( parseInt( params.article_id , 10 ) );

  return (
    <div>
      <div>{ parser(data.props.content) }</div>

    </div>

  )
}
