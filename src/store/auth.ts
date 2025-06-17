import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import useApiRequest from '@/hooks/api-request/request'; // Removed
import { ApiRequest } from "@/utils/api-request";

// const {
//     Post,
//     requestLoading,
//     errorMessage,
// } = useApiRequest();

export const authOptions: any = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const request = await ApiRequest({
                       endpoint: "auth/login",
                       payload: credentials ,
                       method: 'POST',
                    });
                    if (!request) {
                        return null;
                    }

                    //return credentials;
                    return request;
                } catch { // error removed
                    throw new Error(
                        JSON.stringify({ errors: "Authorize error", status: false })
                    );
                }
              },
        }),
    ],
    pages: {
        signIn: "/admin/auth/login",
    },
    session: { strategy: "jwt" },
    callbacks: {
        async signIn({ account }: { account?: import("next-auth").Account | null }) { // user, profile, email, credentials removed
            if (account?.provider === "credentials") return true;
            return false;
        },
        async redirect({ baseUrl }: { baseUrl: string }) {
            return `${baseUrl}/admin/dashboard`;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (session.user?.name) session.user.name = token.name;
            return session;
          },
        async jwt({ token, user }: { token: any; user?: any }) {
            const newUser = { ...user } as any;
            if (newUser.first_name && newUser.last_name)
                token.name = `${newUser.first_name} ${newUser.last_name}`;
            return token;
          },
    }
};

// export const {auth, signIn} = NextAuth(authOptions);
// export const GET = NextAuth(authOptions);
// export const POST = NextAuth(authOptions);

const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
export { handlers as GET, handlers as POST, auth, signIn, signOut };