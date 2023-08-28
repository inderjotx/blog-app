import posts from './../../../testing_data/posts.json'
import Image from 'next/image'
import  ReactMarkdown  from 'react-markdown'
import { getMarkdownBlock } from '@/utils/notion/helper-functions'
import { makeDocument } from '@prisma/client/runtime';

async function pageMarkdown(){
    
    const markdown   = await getMarkdownBlock();
    console.log(markdown)
    return markdown;
}



export default async function Post({ object } : { object : { post_id : string }}){
    const markdown = await   pageMarkdown();

    const post = posts[0];

    return (
    
            <ReactMarkdown >{markdown[0].parent}</ReactMarkdown>
       
    )
}