// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      // aquí podrías añadir más campos si lo necesitas
    };
  }

  interface User extends DefaultUser {
    id: string;
  }
}
