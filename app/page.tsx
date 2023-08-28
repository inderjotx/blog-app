import { Post } from '@prisma/client';
import Link from 'next/link'
const URL = 'http://localhost:3000/api'
import posts from './../testing_data/posts.json'
import { Card } from './../components/index'
import ReactMarkdown from 'react-markdown';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

// const CodeBlock= ({ language , codestring }: { language  :any , codestring : any }) => {
//   return (
//     <SyntaxHighlighter language={language} style={vscDarkPlus} PreTag="div">
//       {codestring}
//     </SyntaxHighlighter>
//   )
// }


async function getPosts(){
  // const data  = await fetch(URL, {next : {revalidate : 1000 }})
  // const posts = await data.json()  
  // console.log("rendering ...")
    return {posts : posts , mdBlocks : "", mdString  : "" };
  
}

export default async   function Home() {
    const {posts, mdBlocks , mdString }  = await getPosts(); 
    
    return (
      <div className='h-full hero_margin'>
       <div className='my_grid'>
        { posts.map( (post, index) => {
          if ( index == 0){
                return <div className='hero_content grid_children'>Special Content </div>
          } 
          else if ( index == 10){
                return <div className='base_content grid_children'>Special Content </div>
          }
          else{
                  return <div key={index} className='grid_children'><Card  post={post} height='250px' width='250px'  /></div>
          }
        })}
        </div> 
       
        {/* <ReactMarkdown
        components={{
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <CodeBlock
                codestring={String(children).replace(/\n$/, '')}
                language={match[1]}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
      }}>
        {mdString}
     
      </ReactMarkdown> */}
        </div>

      )
}
        
