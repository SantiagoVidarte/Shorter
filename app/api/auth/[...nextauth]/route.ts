export const runtime = 'nodejs';

import NextAuth, { SessionStrategy } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { PrismaClient } from "@prisma/client/edge";

const prisma = new PrismaClient({});


export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID!,       // ← DEBES tener esto en tu .env
        clientSecret: process.env.GITHUB_SECRET!,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID!,       // ← Y esto también
        clientSecret: process.env.GOOGLE_SECRET!,
      }),
    ],
    session: { strategy: 'database' as SessionStrategy },
    secret: process.env.NEXTAUTH_SECRET,       // ← obligatorio en producción
    callbacks: {
      async session({ session, user }: { session: any; user: { id: string } }): Promise<any> {
        // inyecta el user.id en session.user
        if (session.user) session.user.id = user.id;
        return session;
      },
    },
  };
  
  const handler = NextAuth(authOptions);
  export { handler as GET, handler as POST };