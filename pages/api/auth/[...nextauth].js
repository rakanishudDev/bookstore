import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import { client } from "../../../sanity/client"


export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_AUTH_ID,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_AUTH_SECRET
        })
    ],
    secret: "ewujnbfun2n232cn293",
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