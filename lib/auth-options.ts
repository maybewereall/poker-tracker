import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import prismadb from "./prismadb";

export const authOptions: NextAuthOptions = {
    session: {
      strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "bob@email.com"},
                password: { label: "Password", type: "password" }
            },
            async authorize( credentials, req ) {
                const user = await prismadb.user.findFirst({
                    where: {
                        username: credentials?.email
                    }
                });
                if (!user) {
                    return null
                } else {
                    const validPassword = await bcrypt.compare(credentials?.password || "", user.password);
                    if(validPassword) {
                        return {...user, id: user.user_id.toString()};
                    }
                }
                return null;
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
          console.log("Session Callback", { session, token });
          return {
            ...session,
            user: {
              ...session.user,
              id: token.id,
              randomKey: token.randomKey,
            },
          };
        },
        jwt: ({ token, user }) => {
          console.log("JWT Callback", { token, user });
          if (user) {
            const u = user as unknown as any;
            return {
              ...token,
              id: u.id,
              randomKey: u.randomKey,
            };
          }
          return token;
        },
    },
    pages: {
        signIn: "/auth/sign-in",
        newUser: "/auth/sign-up"
    },
};