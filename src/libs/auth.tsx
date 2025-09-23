import CredentialsProvider from "next-auth/providers/credentials"
import { apiRequest } from "./api"
import { NextAuthOptions } from "next-auth"

export const authOptions : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                data: { label: "Data", type: "text" },
            },
            async authorize(credentials: any) {
                try {
                    const res = await apiRequest({ endpoint: 'auth/login', method: "POST", payload: { email: credentials.email, password: credentials.password } })

                    const data = res.data

                    if (data && data.token) {
                        return {
                            id: data.uuid,
                            name: data.name,
                            email: data.email,
                            token: data.token,
                        }
                    }
                    return null
                } catch (err) {
                    console.log('err', err)
                    return null
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user } : { token: any, user: any }) {
            if (user) {
                token.accessToken = user.token
                token.id = user.id
            }
            return token
        },
        async session({ session, token } : { session: any, token: any }) {
            if (session.user) {
                session.user.name = token.name
            }
            session.accessToken = token.accessToken
            return session
        },
    },
    pages: {
        signIn: "/auth/login",
    },
}
