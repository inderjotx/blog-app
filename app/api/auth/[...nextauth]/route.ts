import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord"
import CredentialsProvider from "next-auth/providers/credentials";

interface SessionCallback {
  session : any
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
          return session ;
      }
  }
  


}

const handler = NextAuth( authOptions  )

export { handler as GET, handler as POST }