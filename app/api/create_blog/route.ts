import { NextResponse } from 'next/server'
import  { PrismaClient, Post } from '@prisma/client'
import { useSession } from 'next-auth/react'

const prisma = new PrismaClient();


export async function  POST(request : Request ){
    const { data  } = useSession();
    const { content , heading  } = await request.json();
    await Post( data?.user?. , content, heading);
    return NextResponse.json("created a object prehaps ")
}



async function Post( user_id : string , content : string  , heading  : number  ){
     prisma.$connect;
    
     const user = await prisma.user.findFirst( { where : { id : id }}) 

  
    try {
        const newUser = await prisma.post.create( {
          data : {
            content : content,
            user_id : id
            user : user
            heading : "panda"
          }
        })


        console.log(newUser);
    }
  
    catch(error){
        console.log(error);
    }
  
    finally {
      await prisma.$disconnect();
  
    }

}