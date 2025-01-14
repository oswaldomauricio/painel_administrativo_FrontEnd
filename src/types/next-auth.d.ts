import NextAuth from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: {
            id: number,
            name: string
            password: string
            role: string
        }
    }
}