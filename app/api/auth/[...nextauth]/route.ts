import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord"
import CredentialsProvider from "next-auth/providers/credentials";
import  { PrismaClient, User } from '@prisma/client'
import { Session } from "next-auth";
const prisma = new PrismaClient();


interface SessionCallback {
  session : Session
  user : any 
  token : string 
}


export const authOptions : any  = {
  secret : process.env.NEXT_AUTH_SECRET ,
  providers : [


    CredentialsProvider( {
      name : "Inder Blog",

      credentials: {
        name: { label: "Username", type: "text", placeholder: "jsmith" },
        email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" }
      }, 


      async authorize(credentials, req) {
        
        console.log(credentials)
        
        if (credentials) {
          const user = Object(credentials);
          user.id = 4;
          return user
        } 
        
        else {
          return null
        }
  

    }})
  ,
    GoogleProvider( {
        clientId : process.env.GOOGLE_AUTH_ID || "",
        clientSecret: process.env.GOOGLE_AUTH_SECRET || ""
    })
    ,

    DiscordProvider({
      clientId : process.env.DISCORD_AUTH_ID || "",
      clientSecret : process.env.DISCORD_AUTH_SECRET || ""
    })
    
    
  ]
,
  callbacks : {
      async session( { session , user , token } : SessionCallback ){
        prisma.$connect

        console.log(session)

        try {

          const user = await prisma.user.findFirst( { where : { email : String(session.user?.email) }})
          if ( user?.password === undefined ){
              return session;
          }

          else{
            // user with the same email exist, and has logged in using the simple way 
            return null;
          }


        }

        catch (error ){

          console.log(error)
          return null;
        }
        
      }
  }
  


}



// async function OuthUser( session : Session)  : User | null {
    
//   const user = await getUser( session.user?.name );

//   // new user 
//   if ( !user ) {
//       const newUser: User =   await createUser(session)
//       return newUser;
//   }

//   // alread exist 
//   else{
    
//     // logged in before using outh 
//     if ( !user.password ) return user;


//     // without using oauth 
//     else ( )

//   }
  

// }


// async function simpleLogin(){

// }


// async function getUser(email : string | null | undefined){

//   if ( typeof (email) === null || typeof (email) === undefined) return null;

//   else  return prisma.user.findFirst( { where : { email : email}})
// }


// async function createUser( session : Session){
//    const user =  await prisma.user.create({ data : { username : session.user?.name || "" , email : session.user?.email || "" , isAdmin : false}})
//    return user;
// }


const handler = NextAuth( authOptions  )

export { handler as GET, handler as POST }