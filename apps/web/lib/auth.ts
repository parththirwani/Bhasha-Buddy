import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@repo/db/client";

interface CustomSession {
  id?: number | null | undefined; 
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  username?: string | null | undefined; 
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "name", type: "text", placeholder: "" },
        username: { label: "username", type: "text", placeholder: "" },
        email: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },

      //@ts-ignore
      async authorize(credentials:any) {
        const { username, email, password } = credentials;
        if (!username || !email || !password) {
          return null;
      }
        let user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });
        if (!user) {
          user = await prisma.user.create({
            data: {
              name: credentials.name,
              username: credentials.username,
              email: credentials.email,
              password: credentials.password,
            },
          });
        } else if (user.password !== credentials.password) {
          return null;
        }
        console.log(user);
        return {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user }:any) => {
      const userData = await prisma.user.findFirst({
        where: { id: session.user.id },
      });
      if (session.user) {
        const customSession: CustomSession = {
          username: userData?.username || null,
          id: userData?.id || null, 
          name: userData?.name || null,
          email: userData?.email || null,
          
        };
        session.user = customSession;
      }
      return session;
    },
  },
  // callbacks: {
  //   session: async ({ session, user }:any) => {
  //     if(session.user){
  //       session.user = user;
  //     }
  //     return session;
  //   },
  // },
  
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
 

