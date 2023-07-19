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


          const new_user = session.user;

          const data_back = await prisma.user.create({
            data : new_user
          })


          return data_back;
      }
  }
  


}


const handler = NextAuth( authOptions  )

export { handler as GET, handler as POST }