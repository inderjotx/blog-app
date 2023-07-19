import { NextResponse } from 'next/server'
import  { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
const USER_ID = 'random_id'


export async function  POST(request : Request ){
    const { content  } = await request.json();
    await Post(content);
    return NextResponse.json("created a object prehaps ")
}



async function Post( content : string   ){
    await prisma.$connect;
    try {
        const newUser = await prisma.post.create( {
          data : {
            content : content,
          }
        })
  
        console.log( "user created ");
    }
  
    catch(error){
        console.log(error);
    }
  
    finally {
      await prisma.$disconnect();
  
    }

}