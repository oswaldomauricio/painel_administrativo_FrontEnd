import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch(`${process.env.AUTH_API_URL}/usuario`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: credentials?.username,
            password: credentials?.password,
          }),
        });

        const data = await response.json();

        if (data.result && response.ok) {
          // console.log(data.result, "vem da api");
          return data.result;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: {token: JWT, user: any}) {
      if (user) {
        // Adiciona todos os dados do usuário ao token
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
        token.password = user.password;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: {token: JWT, session: any}) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          role: token.role,
          password: token.password,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
