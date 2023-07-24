import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord"
import CredentialsProvider from "next-auth/providers/credentials";
import  { PrismaClient, User } from '@prisma/client'
import { Session } from "next-auth";
import { signIn } from 'next-auth/react';
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
      async signIn({ user, account, profile, credentials } : { user : any , account : any , profile : any, credentials : any}){

          prisma.$connect
          console.log(user)
          const email = user.email;
          const is_user = await prisma.user.findFirst(  {where : { email : email }});

          if ( !is_user ){
             // add to the database
             const new_user = await prisma.user.create({ data : { username : user?.name , image : user?.image , email : email }})
             return true;

          }

          if ( (is_user?.password && !user.password )){
            
              return false;
          }

          if (!is_user?.password && user.password ){
            // no passwords
            return false;
          }


          if ( is_user.password != user.password ) return false;
          
          
          return true;
        
      }
      ,


      async session( { session , user , token } : SessionCallback ){
        prisma.$connect
        const user_profile  = await prisma.user.findFirst({ where : { email : session.user?.email || ""}})
        if ( session.user ) {
          session.user.id  = user_profile?.id || ""
        } 
        
        
          return session ;
      }

  }
  


}


const handler = NextAuth( authOptions  )

export { handler as GET, handler as POST }