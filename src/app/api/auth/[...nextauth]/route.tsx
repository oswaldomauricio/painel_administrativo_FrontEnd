import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/", // Página de login personalizada
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        // Autenticação fictícia (substitua por sua lógica real)
        if (credentials.username === "oswaldo" && credentials.password === "123") {
          return {
            id: "1",
            name: "Oswaldo",
            password: "123",
          };
        }

        // Retorna null se as credenciais estiverem incorretas
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Se o usuário existe, associe o token ao usuário
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.password = user.password;
      }
      return token;
    },
    async session({ session, token }) {
      // Inclua informações adicionais no objeto de sessão
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          name: token.name,
          password: token.password,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
