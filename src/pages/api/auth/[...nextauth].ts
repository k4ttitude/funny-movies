import crypto from "crypto";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { trpcClient } from "../../../utils/trpc";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, token }) {
      if (session.user && typeof token.sub === "string") {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials) throw Error("No credentials");

        const { email, password } = credentials;
        const user = await trpcClient.mutation("auth.login", {
          email,
          password,
        });
        if (!user) throw Error("Invalid credentials");

        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
