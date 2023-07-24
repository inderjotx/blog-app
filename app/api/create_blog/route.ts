import { NextResponse } from 'next/server'
import  { PrismaClient, Post, User } from '@prisma/client'

const prisma = new PrismaClient();


export async function  POST(request : Request ){
    const { id , content , heading } = await request.json();
    await createPost( id ,  content, heading);
    return NextResponse.json("created a object prehaps ")
}



async function createPost( id : string , content : string  , heading  : string ){
     prisma.$connect;
     console.log(id) 
  
    try {
        const newUser = await prisma.post.create( {
          data : {
            content : content,
            user_id : id,
            heading : heading,
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