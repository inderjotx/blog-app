import { NextResponse } from 'next/server'
import articles from '../../testing_data/sample_articles.json' 


import  { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();



export async function GET() {
  prisma.$connect

  const articles = await prisma.post.findMany()

  prisma.$disconnect
  console.log(articles)
  return NextResponse.json(articles )

}


