import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { client } from "../../../sanity/client"
import { v4 as uuidv4 } from "uuid"



export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: "c1e9446fe2f61b80250d",
            clientSecret: "517a7702bc647586b1ee4f43954859098ef8f3f2"
        })
    ],
    callbacks: {
        async jwt({token, account, profile}) {
            if (account) {
                console.log("JWT _>")
                const doc = {
                    _id: profile.id + "",
                    _type: "user",
                    name: profile.login,
                    image: profile.avatar_url
                }
                client.createIfNotExists(doc)
                .then(res => console.log("user successfully created"))
                .catch(err => console.log(err))
                token.id = profile.id
            }
            return token

        },
        async session({session, token, user}) {
            console.log("user")
            session.user.id = token.id + ""
            return session
        }
        
    }
})