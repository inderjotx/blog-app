import { notionClient, n2m } from "../clients/app";

// raw json data from notion
export async function getPosts(){
    const response = await notionClient.databases.query({
      database_id: process.env.DATABASE_ID || "" ,
    });
    
    
    return response.results;
  };


// json data to markdown string
export async function getMarkdownBlock(){
    const jsonPages = await  getPosts();

    const pageMarkDownPromises = jsonPages.map( (page) => n2m.pageToMarkdown(page.id) );

    return new Promise( (res, rej ) => {

        Promise.all(pageMarkDownPromises)
        .then((pagesMd) => {
            
            const mdString = pagesMd.map( (pgMd) => {
                return n2m.toMarkdownString(pgMd)
            }) 

            res(mdString);            

        })
        .catch( e => rej(e))

    })
}







