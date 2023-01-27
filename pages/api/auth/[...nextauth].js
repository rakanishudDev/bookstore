import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { client } from "../../../sanity/client"
import { v4 as uuidv4 } from "uuid"



export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: "74827946088-5vmqcm70irrdln40ccfv6ita3a2dfiir.apps.googleusercontent.com",
            clientSecret: "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"
        }),
        GitHubProvider({
            clientId: "c1e9446fe2f61b80250d",
            clientSecret: "1106f41ae58805763fe536142f6f385665381da8"
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