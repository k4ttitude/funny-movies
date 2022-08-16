import crypto from "crypto";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { User } from "@prisma/client";

const hashMd5 = (str: string) =>
  crypto.createHash("md5").update(str).digest("hex");

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "john.doe" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) throw Error("No credentials");
        const { username, password } = credentials;
        const hashedPassword = hashMd5(hashMd5(password));
        const user = await prisma.user.findFirst({
          where: { email: username, password: hashedPassword },
        });
        // const { mutateAsync } = trpc.useMutation(["auth.login"]);

        // const user = await mutateAsync({ username, password });
        if (!user) throw Error("Invalid credentials");

        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
